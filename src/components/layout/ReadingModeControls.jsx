import React, { useState, useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon, StopIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';
import useStore from '../../store/useStore';
import { buildSegments, createReadingController } from '../../utils/readingModeEngine';

/**
 * ReadingModeControls — Header sub-component (rendered inside the Header
 * island, so no separate client: directive needed).
 *
 * Reads the current page's `.mdx-content-wrapper` aloud via the browser's
 * native `speechSynthesis`. Hides itself entirely on pages with no readable
 * content (e.g. the homepage). Voice/rate/pitch/code-reading preferences are
 * shared + persisted through the Zustand store; playback state stays local
 * since speech doesn't survive a reload anyway.
 */
const ReadingModeControls = () => {
    const { readingMode, setReadingVoice, setReadingRate, setReadingPitch, setReadCodeBlocks } =
        useStore();

    const [hasReadableContent, setHasReadableContent] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [voices, setVoices] = useState([]);
    const [playbackState, setPlaybackState] = useState('idle'); // 'idle' | 'playing' | 'paused'
    const controllerRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        setHasReadableContent(!!document.querySelector('.mdx-content-wrapper'));
    }, []);

    useEffect(() => {
        function loadVoices() {
            setVoices(window.speechSynthesis.getVoices());
        }
        loadVoices();
        window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
        return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    }, []);

    // Stop any in-flight speech if this component ever unmounts mid-read.
    useEffect(() => () => window.speechSynthesis.cancel(), []);

    useEffect(() => {
        if (!isPanelOpen) return undefined;

        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsPanelOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isPanelOpen]);

    if (!hasReadableContent) return null;

    const selectedVoice = voices.find((voice) => voice.voiceURI === readingMode.voiceURI) ?? null;

    const handlePlay = () => {
        const container = document.querySelector('.mdx-content-wrapper');
        if (!container) return;

        controllerRef.current = createReadingController({
            segments: buildSegments(container),
            voice: selectedVoice,
            rate: readingMode.rate,
            pitch: readingMode.pitch,
            readCodeBlocks: readingMode.readCodeBlocks,
            onEnd: () => setPlaybackState('idle'),
        });
        controllerRef.current.play();
        setPlaybackState('playing');
    };

    const handlePause = () => {
        controllerRef.current?.pause();
        setPlaybackState('paused');
    };

    const handleResume = () => {
        controllerRef.current?.resume();
        setPlaybackState('playing');
    };

    const handleStop = () => {
        controllerRef.current?.stop();
        setPlaybackState('idle');
    };

    const handleTogglePlayback = () => {
        if (playbackState === 'idle') handlePlay();
        else if (playbackState === 'playing') handlePause();
        else handleResume();
    };

    const handleVoiceChange = (e) => {
        const voiceURI = e.target.value || null;
        setReadingVoice(voiceURI);
        const voice = voices.find((v) => v.voiceURI === voiceURI) ?? null;
        controllerRef.current?.updateSettings({ voice });
    };

    // onChange fires on every tick of a drag (React's range-input onChange
    // is bound to the native "input" event). Only the live label/store value
    // updates here; the disruptive speech restart is deferred to the native
    // commit signal (mouse-up/touch-end/key-up) below.
    const handleRateChange = (e) => {
        setReadingRate(Number(e.target.value));
    };

    const handlePitchChange = (e) => {
        setReadingPitch(Number(e.target.value));
    };

    const commitRate = (e) => {
        controllerRef.current?.updateSettings({ rate: Number(e.target.value) });
    };

    const commitPitch = (e) => {
        controllerRef.current?.updateSettings({ pitch: Number(e.target.value) });
    };

    const handleReadCodeBlocksChange = (e) => {
        const readCodeBlocks = e.target.checked;
        setReadCodeBlocks(readCodeBlocks);
        controllerRef.current?.updateSettings({ readCodeBlocks });
    };

    return (
        <div className="reading-mode-container" ref={containerRef}>
            <button
                onClick={() => setIsPanelOpen((open) => !open)}
                className="reading-mode-trigger"
                aria-label="Reading mode settings"
                aria-expanded={isPanelOpen}
            >
                <SpeakerWaveIcon width={18} height={18} />
            </button>

            {isPanelOpen && (
                <div className="reading-mode-panel" role="dialog" aria-label="Reading mode settings">
                    <div className="reading-mode-transport">
                        <button
                            onClick={handleTogglePlayback}
                            aria-label={playbackState === 'playing' ? 'Pause' : 'Play'}
                        >
                            {playbackState === 'playing' ? (
                                <PauseIcon width={18} height={18} />
                            ) : (
                                <PlayIcon width={18} height={18} />
                            )}
                        </button>
                        <button
                            onClick={handleStop}
                            disabled={playbackState === 'idle'}
                            aria-label="Stop"
                        >
                            <StopIcon width={18} height={18} />
                        </button>
                    </div>

                    <label className="reading-mode-field">
                        <span>Voice</span>
                        <select value={readingMode.voiceURI ?? ''} onChange={handleVoiceChange}>
                            <option value="">Browser default</option>
                            {voices.map((voice) => (
                                <option key={voice.voiceURI} value={voice.voiceURI}>
                                    {voice.name} ({voice.lang})
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="reading-mode-field">
                        <span>Speed: {readingMode.rate.toFixed(1)}x</span>
                        <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={readingMode.rate}
                            onChange={handleRateChange}
                            onMouseUp={commitRate}
                            onTouchEnd={commitRate}
                            onKeyUp={commitRate}
                        />
                    </label>

                    <label className="reading-mode-field">
                        <span>Pitch: {readingMode.pitch.toFixed(1)}</span>
                        <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            value={readingMode.pitch}
                            onChange={handlePitchChange}
                            onMouseUp={commitPitch}
                            onTouchEnd={commitPitch}
                            onKeyUp={commitPitch}
                        />
                    </label>

                    <label className="reading-mode-field reading-mode-checkbox">
                        <input
                            type="checkbox"
                            checked={readingMode.readCodeBlocks}
                            onChange={handleReadCodeBlocksChange}
                        />
                        <span>Read code blocks aloud</span>
                    </label>
                    <p className="reading-mode-note">
                        Code often doesn't read well as speech — off by default. Some browsers
                        use online voices, so page text may reach your browser vendor's own
                        speech service.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ReadingModeControls;
