"use client";

import { useEffect, useRef } from "react";
import { menuStateEvent } from "@/motion/tokens";

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let columns = 56;
    let rows = 30;
    let frame: number | null = null;

    function resizeCanvas() {
      if (!canvas || !context) return;
      const ratio = Math.min(2, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * ratio);
      canvas.height = Math.round(rect.height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      columns = rect.width < 720 ? 22 : 56;
    }

    function roundedSquare(x: number, y: number, size: number) {
      if (!context) return;
      const radius = size * 0.1875;
      context.beginPath();
      context.roundRect(x, y, size, size, radius);
      context.fill();
    }

    function draw(time: number) {
      if (!canvas || !context) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const gap = 3;
      const cell = (width - gap * (columns - 1)) / columns;
      rows = Math.ceil(height / (cell + gap));

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#050505";
      context.fillRect(0, 0, width, height);

      const t = time * 0.001;
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const nx = column / columns;
          const ny = row / Math.max(1, rows - 1);
          const waveOne =
            0.48 + 0.15 * Math.sin(nx * 4.2 - t * 0.72) + 0.05 * Math.sin(nx * 8 + t * 0.3);
          const waveTwo = 0.54 - 0.12 * Math.sin(nx * 3.4 - t * 0.52 + 1.1);
          const distance = Math.min(Math.abs(ny - waveOne), Math.abs(ny - waveTwo));
          const strength = Math.max(0, 1 - distance / 0.105);
          const opacity = 0.10 + Math.pow(strength, 1.0) * 0.95;

          context.fillStyle = "rgba(255, 50, 90, " + opacity.toFixed(3) + ")";
          roundedSquare(column * (cell + gap), row * (cell + gap), cell);
        }
      }

      if (!reduceMotion) frame = requestAnimationFrame(draw);
    }

    let menuOpen = false;

    function stop() {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    }

    function start() {
      if (!frame && !reduceMotion && !document.hidden && !menuOpen) {
        frame = requestAnimationFrame(draw);
      }
    }

    function onVisibilityChange() {
      if (document.hidden) stop();
      else start();
    }

    function onMenuState(event: Event) {
      menuOpen = Boolean((event as CustomEvent<{ open: boolean }>).detail?.open);
      if (menuOpen) stop();
      else start();
    }

    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener(menuStateEvent, onMenuState);
    document.addEventListener("visibilitychange", onVisibilityChange);
    resizeCanvas();
    frame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener(menuStateEvent, onMenuState);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      stop();
    };
  }, []);

  return <canvas id="hero-canvas" ref={canvasRef} aria-hidden="true" />;
}
