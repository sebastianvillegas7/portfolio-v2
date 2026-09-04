"use client";

/* Adapted from React Bits: https://www.reactbits.dev/backgrounds/light-rays */

import { useEffect, useRef } from "react";

import { useReducedMotion } from "motion/react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

interface LightRaysProps {
  color?: string;
  speed?: number;
  spread?: number;
  length?: number;
  pulseSignal?: number;
  followPointer?: boolean;
  pointerInfluence?: number;
  className?: string;
}

type Vec2 = [number, number];
type Vec3 = [number, number, number];

interface Uniforms {
  time: { value: number };
  resolution: { value: Vec2 };
  rayPosition: { value: Vec2 };
  rayDirection: { value: Vec2 };
  rayColor: { value: Vec3 };
  speed: { value: number };
  spread: { value: number };
  rayLength: { value: number };
  pulse: { value: number };
  pointer: { value: Vec2 };
  pointerInfluence: { value: number };
}

function hexToRgb(hex: string): Vec3 {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return match
    ? [
        Number.parseInt(match[1], 16) / 255,
        Number.parseInt(match[2], 16) / 255,
        Number.parseInt(match[3], 16) / 255,
      ]
    : [1, 1, 1];
}

const vertexShader = `
  attribute vec2 position;

  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float time;
  uniform vec2 resolution;
  uniform vec2 rayPosition;
  uniform vec2 rayDirection;
  uniform vec3 rayColor;
  uniform float speed;
  uniform float spread;
  uniform float rayLength;
  uniform float pulse;
  uniform vec2 pointer;
  uniform float pointerInfluence;

  float rayStrength(
    vec2 source,
    vec2 referenceDirection,
    vec2 coordinate,
    float seedA,
    float seedB,
    float raySpeed
  ) {
    vec2 sourceToCoordinate = coordinate - source;
    vec2 direction = normalize(sourceToCoordinate);

    vec2 pointerPosition = pointer * resolution;
    vec2 pointerDirection = normalize(pointerPosition - source);

    vec2 finalDirection = normalize(
      mix(referenceDirection, pointerDirection, pointerInfluence)
    );

    float angle = dot(direction, finalDirection);

    float spreadFactor = pow(
      max(angle, 0.0),
      1.0 / max(spread, 0.001)
    );

    float distanceFromSource = length(sourceToCoordinate);
    float maximumDistance = resolution.x * rayLength;

    float lengthFalloff = clamp(
      (maximumDistance - distanceFromSource) / maximumDistance,
      0.0,
      1.0
    );

    float slowMovement =
      0.92 +
      0.08 * sin(
        time * raySpeed +
        angle * seedA * 0.18 +
        seedB
      );

    return slowMovement * lengthFalloff * spreadFactor;
  }

  void main() {
    vec2 coordinate = vec2(
      gl_FragCoord.x,
      resolution.y - gl_FragCoord.y
    );

    vec4 firstRay = vec4(1.0) * rayStrength(
      rayPosition,
      rayDirection,
      coordinate,
      36.2214,
      21.11349,
      1.5 * speed
    );

    vec4 secondRay = vec4(1.0) * rayStrength(
      rayPosition,
      rayDirection,
      coordinate,
      22.3991,
      18.0234,
      1.1 * speed
    );

    vec4 color = firstRay * 0.5 + secondRay * 0.4;

    float brightness = 1.0 - coordinate.y / resolution.y;

    color.r *= 0.1 + brightness * 0.8;
    color.g *= 0.3 + brightness * 0.6;
    color.b *= 0.5 + brightness * 0.5;

    color.rgb *= rayColor;

    color.rgb *= 1.0 + pulse * 0.12;

    float sourceDistance =
      distance(coordinate, rayPosition) / resolution.x;

    float sourceGlow =
      exp(-sourceDistance * 5.0) * pulse * 0.14;

    color.rgb += rayColor * sourceGlow;

    gl_FragColor = color;
  }
`;

export function LightRays({
  color = "#ffffff",
  speed = 0.6,
  spread = 0.9,
  length = 1.8,
  pulseSignal = 0,
  followPointer = true,
  pointerInfluence = 0.08,
  className = "",
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const pointerRef = useRef({
    x: 0.5,
    y: 0.5,
  });

  const smoothPointerRef = useRef({
    x: 0.5,
    y: 0.5,
  });

  const pulseStartRef = useRef<number | null>(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (pulseSignal === 0 || prefersReducedMotion) return;

    pulseStartRef.current = performance.now();
  }, [pulseSignal, prefersReducedMotion]);

  useEffect(() => {
    const element = containerRef.current;

    if (element === null) return;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 1.5),
      alpha: true,
    });

    const gl = renderer.gl;

    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";

    element.appendChild(gl.canvas);

    const uniforms: Uniforms = {
      time: {
        value: 0,
      },

      resolution: {
        value: [1, 1],
      },

      rayPosition: {
        value: [1, 0],
      },

      rayDirection: {
        value: [-0.55, 0.84],
      },

      rayColor: {
        value: hexToRgb(color),
      },

      speed: {
        value: prefersReducedMotion ? 0 : speed,
      },

      spread: {
        value: spread,
      },

      rayLength: {
        value: length,
      },

      pulse: {
        value: 0,
      },

      pointer: {
        value: [0.5, 0.5],
      },

      pointerInfluence: {
        value:
          followPointer && !prefersReducedMotion
            ? pointerInfluence
            : 0,
      },
    };

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms,
      transparent: true,
    });

    const mesh = new Mesh(gl, {
      geometry,
      program,
    });

    const resize = () => {
      const width = element.clientWidth;
      const height = element.clientHeight;

      renderer.setSize(width, height);

      uniforms.resolution.value = [
        width * renderer.dpr,
        height * renderer.dpr,
      ];

      uniforms.rayPosition.value = [
        width * renderer.dpr * 1.08,
        -height * renderer.dpr * 0.12,
      ];
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();

      pointerRef.current = {
        x: (event.clientX - bounds.left) / bounds.width,
        y: (event.clientY - bounds.top) / bounds.height,
      };
    };

    let animationFrame = 0;
    let visible = true;

    const render = (time: number) => {
      if (visible) {
        smoothPointerRef.current.x +=
          (pointerRef.current.x - smoothPointerRef.current.x) * 0.06;

        smoothPointerRef.current.y +=
          (pointerRef.current.y - smoothPointerRef.current.y) * 0.06;

        uniforms.pointer.value = [
          smoothPointerRef.current.x,
          smoothPointerRef.current.y,
        ];

        uniforms.time.value = time * 0.001;

        if (pulseStartRef.current !== null) {
          const elapsed = time - pulseStartRef.current;
          const duration = 900;

          const progress = Math.min(elapsed / duration, 1);

          uniforms.pulse.value =
            Math.sin(progress * Math.PI) ** 2;

          if (progress >= 1) {
            pulseStartRef.current = null;
            uniforms.pulse.value = 0;
          }
        } else {
          uniforms.pulse.value = 0;
        }

        renderer.render({
          scene: mesh,
        });
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });

    resizeObserver.observe(element);
    visibilityObserver.observe(element);

    if (followPointer && !prefersReducedMotion) {
      window.addEventListener("pointermove", handlePointerMove);
    }

    resize();

    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);

      resizeObserver.disconnect();
      visibilityObserver.disconnect();

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      if (gl.canvas.parentNode === element) {
        element.removeChild(gl.canvas);
      }

      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [
    color,
    speed,
    spread,
    length,
    followPointer,
    pointerInfluence,
    prefersReducedMotion,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden ${className}`.trim()}
    />
  );
}