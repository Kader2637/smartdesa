"use client";

import { useEffect, useRef } from 'react';

export default function Cursor() {
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;

        const onMouseMove = (e) => {
            requestAnimationFrame(() => {
                if (cursor && cursorDot) {
                    cursor.style.left = e.clientX + 'px';
                    cursor.style.top = e.clientY + 'px';
                    cursorDot.style.left = e.clientX + 'px';
                    cursorDot.style.top = e.clientY + 'px';
                }
            });
        };

        const onMouseOver = (e) => {
            if (e.target.closest('a, button, .hover-target')) {
                document.body.classList.add('hover-active');
            }
        };

        const onMouseOut = (e) => {
            if (e.target.closest('a, button, .hover-target')) {
                document.body.classList.remove('hover-active');
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', onMouseOver);
        window.addEventListener('mouseout', onMouseOut);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            window.removeEventListener('mouseout', onMouseOut);
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="custom-cursor hidden md:block"></div>
            <div ref={cursorDotRef} className="custom-cursor-dot hidden md:block"></div>
        </>
    );
}
