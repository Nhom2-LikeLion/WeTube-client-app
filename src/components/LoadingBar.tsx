"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export const LoadingBar: React.FC = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const finishTimerRef = useRef<NodeJS.Timeout | null>(null);
    const isFirstRender = useRef(true);

    const clearTimers = useCallback(() => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
        if (finishTimerRef.current) {
            clearTimeout(finishTimerRef.current);
            finishTimerRef.current = null;
        }
    }, []);

    const finishLoading = useCallback(() => {
        clearTimers();

        // Complete to 100% quickly
        setProgress(100);

        // Hide after brief moment
        setTimeout(() => {
            setLoading(false);
            setProgress(0);
        }, 200);
    }, [clearTimers]);

    const startLoading = useCallback(() => {
        clearTimers();
        setLoading(true);
        setProgress(0);

        let currentProgress = 0;

        progressIntervalRef.current = setInterval(() => {
            setProgress(prev => {
                currentProgress = prev;

                // Fast initial progress (0-40%)
                if (currentProgress < 40) {
                    return Math.min(currentProgress + Math.random() * 12 + 8, 40);
                }
                // Medium progress (40-85%)
                else if (currentProgress < 85) {
                    return Math.min(currentProgress + Math.random() * 4 + 2, 85);
                }
                // Slow down and stop at 85-90%
                else if (currentProgress < 90) {
                    return Math.min(currentProgress + Math.random() * 1 + 0.5, 90);
                }
                // Stop and wait for page to actually load
                else {
                    if (progressIntervalRef.current) {
                        clearInterval(progressIntervalRef.current);
                        progressIntervalRef.current = null;
                    }
                    return currentProgress;
                }
            });
        }, 50); // Faster updates for snappier feel

        // Auto-complete after shorter time to match Next.js speed
        finishTimerRef.current = setTimeout(() => {
            finishLoading();
        }, 800); // Reduced from 2000ms to 800ms
    }, [clearTimers, finishLoading]);

    useEffect(() => {
        // Skip loading bar on first render (initial page load)
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        startLoading();

        return clearTimers;
    }, [pathname, searchParams, startLoading, clearTimers]);

    // Alternative: Listen to document ready state for more accurate timing
    useEffect(() => {
        if (!loading) return;

        const handleLoad = () => {
            // Page is actually loaded, finish the loading bar
            finishLoading();
        };

        // Listen for when page is fully interactive
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            document.addEventListener('readystatechange', () => {
                if (document.readyState === 'complete') {
                    handleLoad();
                }
            });
        }

        return () => {
            document.removeEventListener('readystatechange', handleLoad);
        };
    }, [loading, finishLoading]);

    if (!loading && progress === 0) return null;

    return (
        <>
            {/* YouTube-style loading bar */}
            <div className="fixed top-[64px] left-0 right-0 h-0.5 bg-transparent z-40">
                <div
                    className="h-full bg-red-600 transition-all duration-100 ease-out shadow-sm"
                    style={{
                        width: `${progress}%`,
                        boxShadow: progress > 0 ? '0 0 8px rgba(239, 68, 68, 0.4)' : 'none'
                    }}
                />
            </div>

            {/* Glow effect */}
            <div
                className="fixed top-[64px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent opacity-20 z-40"
                style={{
                    display: progress > 0 ? 'block' : 'none',
                    transform: `translateX(${progress - 100}%)`
                }}
            />
        </>
    );
};