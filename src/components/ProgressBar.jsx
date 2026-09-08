import React, { useEffect, useRef, useState } from 'react';

/**
 * Self-contained top-of-page progress bar — copy this one file into any React project.
 *
 * @param {Object} props
 * @param {'scroll'|'loading'} [props.mode='scroll'] - 'scroll' tracks page scroll; 'loading' sweeps on `isLoading`.
 * @param {string|Element|Object} [props.scrollTarget] - Scroll mode only. Selector, element, or ref; default window.
 * @param {boolean} [props.isLoading=false] - Loading mode only. Toggle true/false to start/complete the sweep.
 * @param {string} [props.color='#2563eb'] - Solid fill color. Ignored when `colors` is set.
 * @param {string[]} [props.colors] - Fill colors for a left-to-right gradient, overrides `color`.
 * @param {number} [props.height=3] - Bar height in pixels.
 * @param {string} [props.trackColor='transparent'] - Background of the unfilled track.
 * @param {number} [props.zIndex=9999] - CSS z-index of the bar.
 * @param {string} [props.className] - Extra class name(s) applied to the outer track element.
 * @param {Object} [props.style] - Extra inline styles merged onto (and overriding) the outer track element.
 * @returns {JSX.Element}
 */
const ProgressBar = ({
    mode = 'scroll',
    scrollTarget,
    isLoading = false,
    color = '#2563eb',
    colors,
    height = 3,
    trackColor = 'transparent',
    zIndex = 9999,
    className,
    style,
}) => {
    const [progress, setProgress] = useState(0);
    const rafRef = useRef(null);

    useEffect(() => {
        if (mode !== 'scroll') return undefined;

        const resolveScrollContainer = () => {
            if (!scrollTarget) return window;
            if (typeof scrollTarget === 'string') return document.querySelector(scrollTarget);
            return scrollTarget.current || scrollTarget;
        };

        const scrollContainer = resolveScrollContainer();
        if (!scrollContainer) return undefined;

        const isWindowTarget = scrollContainer === window;

        const updateScrollProgress = () => {
            const scrollTop = isWindowTarget ? window.scrollY : scrollContainer.scrollTop;
            const scrollable = isWindowTarget
                ? document.documentElement.scrollHeight - window.innerHeight
                : scrollContainer.scrollHeight - scrollContainer.clientHeight;
            const scrollPercent = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
            setProgress(Math.min(100, Math.max(0, scrollPercent)));
        };

        // rAF-gate the scroll handler so a fast scroll doesn't queue a state update per event.
        const handleScroll = () => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null;
                updateScrollProgress();
            });
        };

        updateScrollProgress();
        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [mode, scrollTarget]);

    useEffect(() => {
        if (mode !== 'loading') return undefined;

        if (isLoading) {
            setProgress((currentProgress) => (currentProgress === 0 || currentProgress === 100 ? 8 : currentProgress));
            const advanceLoadingProgress = () => {
                // Eases toward 90% and never completes on its own, so it always reads as "still working".
                setProgress((currentProgress) => (currentProgress < 90 ? currentProgress + (90 - currentProgress) * 0.05 : currentProgress));
                rafRef.current = requestAnimationFrame(advanceLoadingProgress);
            };
            rafRef.current = requestAnimationFrame(advanceLoadingProgress);
            return () => {
                if (rafRef.current) cancelAnimationFrame(rafRef.current);
            };
        }

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        setProgress((currentProgress) => (currentProgress > 0 ? 100 : 0));
        const resetTimeout = setTimeout(() => setProgress(0), 400);
        return () => clearTimeout(resetTimeout);
    }, [mode, isLoading]);

    const isHidden = mode === 'loading' && progress === 0;

    return (
        <div
            className={className}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: `${height}px`,
                backgroundColor: trackColor,
                zIndex,
                pointerEvents: 'none',
                ...style,
            }}
        >
            <div
                style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: colors && colors.length > 0 ? `linear-gradient(90deg, ${colors.join(', ')})` : color,
                    opacity: isHidden ? 0 : 1,
                    transition: mode === 'loading' ? 'width 0.2s ease, opacity 0.3s ease' : 'width 0.1s ease-out',
                }}
            />
        </div>
    );
};

export default ProgressBar;
