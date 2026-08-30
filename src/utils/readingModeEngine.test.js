import { describe, it, expect } from 'vitest';
import { buildSegments, isSegmentPlayable, speakableTextForCode } from './readingModeEngine.js';

function buildContainer(html) {
    const container = document.createElement('div');
    container.innerHTML = html;
    return container;
}

describe('buildSegments', () => {
    it('walks headings, paragraphs, and code blocks in document order', () => {
        const container = buildContainer(`
            <h2>Intro</h2>
            <p>Some prose.</p>
            <pre>const x = 1;</pre>
        `);

        const segments = buildSegments(container);

        expect(segments.map((s) => s.type)).toEqual(['heading', 'text', 'code']);
        expect(segments[0].text).toBe('Intro');
        expect(segments[1].text).toBe('Some prose.');
        expect(segments[2].text).toBe('const x = 1;');
    });

    it('emits a marker segment for Question/Answer blocks, then their nested content', () => {
        const container = buildContainer(`
            <div data-tts-role="question">
                <p>What logs?</p>
                <pre>console.log(1);</pre>
            </div>
            <details data-tts-role="answer">
                <summary>Answer</summary>
                <div><p>It logs 1.</p></div>
            </details>
        `);

        const segments = buildSegments(container);

        expect(segments.map((s) => s.type)).toEqual([
            'question',
            'text',
            'code',
            'answer',
            'text',
        ]);
        expect(segments[1].text).toBe('What logs?');
        expect(segments[4].text).toBe('It logs 1.');
    });

    it('skips empty or whitespace-only elements', () => {
        const container = buildContainer('<p>   </p><p>Real content.</p>');

        const segments = buildSegments(container);

        expect(segments).toHaveLength(1);
        expect(segments[0].text).toBe('Real content.');
    });

    it('returns an empty array for a missing container', () => {
        expect(buildSegments(null)).toEqual([]);
    });
});

describe('isSegmentPlayable', () => {
    it('rejects code segments when readCodeBlocks is false', () => {
        expect(isSegmentPlayable({ type: 'code' }, { readCodeBlocks: false })).toBe(false);
    });

    it('accepts code segments when readCodeBlocks is true', () => {
        expect(isSegmentPlayable({ type: 'code' }, { readCodeBlocks: true })).toBe(true);
    });

    it('accepts non-code segments regardless of readCodeBlocks', () => {
        expect(isSegmentPlayable({ type: 'text' }, { readCodeBlocks: false })).toBe(true);
        expect(isSegmentPlayable({ type: 'question' }, { readCodeBlocks: false })).toBe(true);
    });
});

describe('speakableTextForCode', () => {
    it('rewords an output-style comment as "Comment,"', () => {
        const result = speakableTextForCode('console.log(x); // undefined, not ReferenceError');

        expect(result).toBe('console.log(x); Comment, undefined, not ReferenceError');
    });

    it('rewords a descriptive comment the same way', () => {
        const result = speakableTextForCode('x.score += 5; // mutates the original object');

        expect(result).toBe('x.score += 5; Comment, mutates the original object');
    });

    it('does not treat a URL inside a string as a comment', () => {
        const result = speakableTextForCode("fetch('https://api.com/data');");

        expect(result).toBe("fetch('https://api.com/data');");
    });

    it('still detects a real comment on a line containing a URL string', () => {
        const result = speakableTextForCode(
            "fetch('https://api.com/data'); // sends cookies cross-origin",
        );

        expect(result).toBe("fetch('https://api.com/data'); Comment, sends cookies cross-origin");
    });

    it('drops blank lines', () => {
        const result = speakableTextForCode('const x = 1;\n\nconsole.log(x);');

        expect(result).toBe('const x = 1;. console.log(x);');
    });

    it('handles a comment-only line', () => {
        const result = speakableTextForCode('// no dependency array');

        expect(result).toBe('Comment, no dependency array');
    });
});
