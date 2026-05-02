'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Props {
    leftImage: string;
    rightImage: string;
    leftLabel?: string;
    rightLabel?: string;
}

export default function ImageCompare({ leftImage, rightImage, leftLabel = 'Before', rightLabel = 'After' }: Props) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percent);
    }, []);

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging) handleMove(e.clientX);
    }, [isDragging, handleMove]);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
    }, [isDragging, handleMove]);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleTouchMove]);

    return (
        <div className="relative w-full overflow-hidden rounded-lg select-none" style={{ aspectRatio: '16/10' }}>
            {/* Оригинал (левый слой) */}
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
                <img
                    src={leftImage}
                    alt={leftLabel}
                    className="absolute inset-0 w-full h-full object-contain bg-gray-100"
                    draggable={false}
                />
                <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
          {leftLabel}
        </span>
            </div>

            {/* Результат (правый слой) */}
            <div className="absolute inset-0">
                <img
                    src={rightImage}
                    alt={rightLabel}
                    className="absolute inset-0 w-full h-full object-contain bg-gray-100"
                    draggable={false}
                />
                <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
          {rightLabel}
        </span>
            </div>

            {/* Ползунок */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-blue-500 flex items-center justify-center">
                    <span className="text-blue-500 text-sm font-bold">⟷</span>
                </div>
            </div>
        </div>
    );
}