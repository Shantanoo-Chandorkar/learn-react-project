/**
 * Reading-mode engine: walks rendered MDX content into speech segments and
 * drives browser-native `speechSynthesis` playback over them.
 */

const READABLE_TAGS = ['P', 'LI', 'BLOCKQUOTE', 'TD', 'TH'];

/**
 * Walks a rendered content container into an ordered list of speech segments.
 *
 * @param {Element} containerEl Root element to walk (e.g. `.mdx-content-wrapper`).
 * @returns {Array<{type: 'heading'|'text'|'code'|'question'|'answer', text: string, el: Element}>}
 *   Ordered segments. `question`/`answer` segments carry an empty `text` - they
 *   mark where reading mode should announce the role, then the block's own
 *   nested paragraphs/code are emitted as their own segments right after, so
 *   settings like the code-reading toggle still apply inside Q&A content.
 */
export function buildSegments(containerEl) {
    const segments = [];
    if (!containerEl) return segments;

    function visit(el) {
        const role = el.dataset ? el.dataset.ttsRole : undefined;

        if (role === 'question' || role === 'answer') {
            segments.push({ type: role, text: '', el });
            for (const child of el.children) visit(child);
            return;
        }

        if (el.tagName === 'PRE') {
            const text = el.textContent.trim();
            if (text) segments.push({ type: 'code', text, el });
            return;
        }

        if (/^H[1-6]$/.test(el.tagName)) {
            const text = el.textContent.trim();
            if (text) segments.push({ type: 'heading', text, el });
            return;
        }

        if (READABLE_TAGS.includes(el.tagName)) {
            const text = el.textContent.trim();
            if (text) segments.push({ type: 'text', text, el });
            return;
        }

        for (const child of el.children) visit(child);
    }

    visit(containerEl);
    return segments;
}

/**
 * Whether a segment should be spoken given the current settings.
 *
 * @param {{type: string}} segment Segment from `buildSegments`.
 * @param {{readCodeBlocks: boolean}} settings Whether code segments are kept.
 * @returns {boolean} True if the segment should be queued for speech.
 */
export function isSegmentPlayable(segment, { readCodeBlocks }) {
    return segment.type !== 'code' || readCodeBlocks;
}

/**
 * Splits one line of code into its spoken code part and, if present, its
 * trailing `//` comment. Tracks string-literal state so a `//` inside a
 * string (or right after a `:` as in `https://...`) isn't mistaken for a
 * comment start.
 *
 * @param {string} line One line of code.
 * @returns {{code: string, comment: string|null}} Code text with the
 *   comment marker removed, and the comment text if one was found.
 */
function splitLineForSpeech(line) {
    let stringDelimiter = null;

    for (let i = 0; i < line.length; i += 1) {
        const char = line[i];
        const previousChar = line[i - 1];

        if (stringDelimiter) {
            if (char === stringDelimiter && previousChar !== '\\') stringDelimiter = null;
            continue;
        }

        if (char === '"' || char === "'" || char === '`') {
            stringDelimiter = char;
            continue;
        }

        if (char === '/' && line[i + 1] === '/' && previousChar !== ':') {
            return { code: line.slice(0, i).trim(), comment: line.slice(i + 2).trim() };
        }
    }

    return { code: line.trim(), comment: null };
}

/**
 * Rewrites code text so `//` comments read as "Comment," instead of being
 * spoken literally as "slash slash". Block comments are out of scope.
 *
 * @param {string} codeText Raw code block text.
 * @returns {string} Speakable text with comments reworded, blank lines dropped.
 */
export function speakableTextForCode(codeText) {
    return codeText
        .split('\n')
        .map((line) => {
            const { code, comment } = splitLineForSpeech(line);
            if (comment === null) return code;
            return code ? `${code} Comment, ${comment}` : `Comment, ${comment}`;
        })
        .filter((line) => line.length > 0)
        .join('. ');
}

/**
 * Builds the words spoken for one segment. Kept separate from
 * `buildSegments` so segment data itself stays raw and testable.
 *
 * @param {{type: string, text: string}} segment Segment to phrase.
 * @returns {string} Text passed to `SpeechSynthesisUtterance`.
 */
function utteranceTextFor(segment) {
    switch (segment.type) {
        case 'question':
            return 'Question.';
        case 'answer':
            return 'Answer.';
        case 'code':
            return `Code block. ${speakableTextForCode(segment.text)}`;
        default:
            return segment.text;
    }
}

/**
 * Creates a play/pause/stop controller that reads segments aloud with
 * `speechSynthesis`. Playback position is tracked as an index into the
 * original (unfiltered) segment list, so toggling `readCodeBlocks`
 * mid-read never misaligns "where we are" - segments are (re)checked for
 * playability at the moment playback reaches them, not filtered up front.
 *
 * @param {object} config
 * @param {Array<object>} config.segments Segments from `buildSegments`.
 * @param {SpeechSynthesisVoice} [config.voice] Voice to speak with.
 * @param {number} [config.rate] Speech rate (`speechSynthesis` accepts 0.1-10).
 * @param {number} [config.pitch] Speech pitch (`speechSynthesis` accepts 0-2).
 * @param {boolean} [config.readCodeBlocks] Whether to speak code segments.
 * @param {(segment: object) => void} [config.onSegmentStart] Fired when a
 *   segment starts speaking, e.g. to open its `<details>` or highlight it.
 * @param {() => void} [config.onEnd] Fired after the last segment finishes.
 * @returns {{play: () => void, pause: () => void, resume: () => void,
 *   stop: () => void, updateSettings: (partial: object) => void}}
 */
export function createReadingController({
    segments,
    voice,
    rate = 1,
    pitch = 1,
    readCodeBlocks = false,
    onSegmentStart,
    onEnd,
}) {
    const synth = window.speechSynthesis;
    let settings = { voice, rate, pitch, readCodeBlocks };
    let currentIndex = -1;
    let isPaused = false;
    let settingsChangedSincePause = false;
    // speechSynthesis.cancel() fires `onend` on the cancelled utterance in
    // some browsers and `onerror` in others. This token lets a stale
    // utterance's callback recognize it's been superseded by a newer
    // speakSegment() call and no-op, instead of double-advancing the queue.
    let playToken = 0;

    function nextPlayableIndex(fromIndex) {
        let index = fromIndex;
        while (index < segments.length && !isSegmentPlayable(segments[index], settings)) {
            index += 1;
        }
        return index;
    }

    function speakSegment(fromIndex) {
        const token = (playToken += 1);
        synth.cancel();

        const index = nextPlayableIndex(fromIndex);
        currentIndex = index;
        if (index >= segments.length) {
            onEnd?.();
            return;
        }

        const segment = segments[index];
        const utterance = new SpeechSynthesisUtterance(utteranceTextFor(segment));
        if (settings.voice) utterance.voice = settings.voice;
        utterance.rate = settings.rate;
        utterance.pitch = settings.pitch;
        utterance.onstart = () => {
            if (segment.type === 'answer' && segment.el) segment.el.open = true;
            onSegmentStart?.(segment);
        };
        utterance.onend = () => {
            if (token !== playToken) return;
            if (!isPaused) speakSegment(index + 1);
        };
        synth.speak(utterance);
    }

    function play() {
        isPaused = false;
        settingsChangedSincePause = false;
        speakSegment(0);
    }

    function pause() {
        isPaused = true;
        synth.pause();
    }

    function resume() {
        isPaused = false;
        if (settingsChangedSincePause) {
            settingsChangedSincePause = false;
            speakSegment(currentIndex);
            return;
        }
        synth.resume();
    }

    function stop() {
        isPaused = false;
        settingsChangedSincePause = false;
        currentIndex = -1;
        synth.cancel();
    }

    function updateSettings(partial) {
        settings = { ...settings, ...partial };
        if (currentIndex < 0) return;

        if (isPaused) {
            settingsChangedSincePause = true;
            return;
        }
        speakSegment(currentIndex);
    }

    return { play, pause, resume, stop, updateSettings };
}
