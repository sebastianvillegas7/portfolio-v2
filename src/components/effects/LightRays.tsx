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

  originX?: number;
  originY?: number;

  directionX?: number;
  directionY?: number;

  intensity?: number;

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
  intensity: { value: number };

  pointer: { value: Vec2 };
  pointerInfluence: { value: number };
}

function hexToRgb(hex: string): Vec3 {
  const match =
    /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

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
  uniform float intensity;

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

    vec2 pointerDirection = normalize(
      pointerPosition - source
    );

    vec2 finalDirection = normalize(
      mix(
        referenceDirection,
        pointerDirection,
        pointerInfluence
      )
    );

    float angle = dot(
      direction,
      finalDirection
    );

    float spreadFactor = pow(
      max(angle, 0.0),
      1.0 / max(spread, 0.001)
    );

    float distanceFromSource =
      length(sourceToCoordinate);

    float maximumDistance =
      resolution.x * rayLength;

    float lengthFalloff = clamp(
      (
        maximumDistance -
        distanceFromSource
      ) / maximumDistance,
      0.0,
      1.0
    );

    float slowMovement =
      0.92 +
      0.08 *
      sin(
        time * raySpeed +
        angle * seedA * 0.18 +
        seedB
      );

    return
      slowMovement *
      lengthFalloff *
      spreadFactor;
  }

  void main() {
    vec2 coordinate = vec2(
      gl_FragCoord.x,
      resolution.y - gl_FragCoord.y
    );

    vec4 firstRay =
      vec4(1.0) *
      rayStrength(
        rayPosition,
        rayDirection,
        coordinate,
        36.2214,
        21.11349,
        1.5 * speed
      );

    vec4 secondRay =
      vec4(1.0) *
      rayStrength(
        rayPosition,
        rayDirection,
        coordinate,
        22.3991,
        18.0234,
        1.1 * speed
      );

    vec4 color =
      firstRay * 0.5 +
      secondRay * 0.4;

    float brightness =
      1.0 -
      coordinate.y /
      resolution.y;

    color.r *=
      0.1 +
      brightness * 0.8;

    color.g *=
      0.3 +
      brightness * 0.6;

    color.b *=
      0.5 +
      brightness * 0.5;

    color.rgb *= rayColor;

    color.rgb *= intensity;
    color.a *= intensity;

    color.rgb *=
      1.0 +
      pulse * 0.12;
      pulse * 0.12;

    float sourceDistance =
      distance(
        coordinate,
        rayPosition
      ) / resolution.x;

    float sourceGlow =
      exp(
        -sourceDistance * 5.0
      ) *
      pulse *
      0.14;

    color.rgb +=
      rayColor *
      sourceGlow *
      intensity;

    gl_FragColor = color;
  }
`;

export function LightRays({
  color = "#ffffff",

  speed = 0.6,
  spread = 0.9,
  length = 1.8,

  originX = 1.08,
  originY = -0.12,

  directionX = -0.55,
  directionY = 0.84,

  intensity = 1,

  pulseSignal = 0,

  followPointer = true,
  pointerInfluence = 0.08,

  className = "",
}: LightRaysProps) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  /*
   * Pointer
   */
  const pointerRef = useRef({
    x: 0.5,
    y: 0.5,
  });

  const smoothPointerRef = useRef({
    x: 0.5,
    y: 0.5,
  });

  /*
   * Dynamic light values.
   *
   * These refs allow React props to change without
   * destroying/recreating the WebGL canvas.
   */
  const targetRef = useRef({
    originX,
    originY,

    directionX,
    directionY,

    intensity,

    speed,
    spread,
    length,

    pointerInfluence,
  });

  const currentRef = useRef({
    originX,
    originY,

    directionX,
    directionY,

    intensity,

    speed,
    spread,
    length,

    pointerInfluence,
  });

  const pulseStartRef =
    useRef<number | null>(null);

  const prefersReducedMotion =
    useReducedMotion();

  /*
   * Update targets only.
   * The canvas remains alive.
   */
  useEffect(() => {
    targetRef.current = {
      originX,
      originY,

      directionX,
      directionY,

      intensity,

      speed,
      spread,
      length,

      pointerInfluence:
        followPointer &&
        !prefersReducedMotion
          ? pointerInfluence
          : 0,
    };
  }, [
    originX,
    originY,
    directionX,
    directionY,
    intensity,
    speed,
    spread,
    length,
    pointerInfluence,
    followPointer,
    prefersReducedMotion,
  ]);

  /*
   * Pulse trigger.
   */
  useEffect(() => {
    if (
      pulseSignal === 0 ||
      prefersReducedMotion
    ) {
      return;
    }

    pulseStartRef.current =
      performance.now();
  }, [
    pulseSignal,
    prefersReducedMotion,
  ]);

  useEffect(() => {
    const element =
      containerRef.current;

    if (element === null) {
      return;
    }

    const renderer =
      new Renderer({
        dpr: Math.min(
          window.devicePixelRatio,
          1.5,
        ),
        alpha: true,
      });

    const gl = renderer.gl;

    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";

    element.appendChild(gl.canvas);

    const width =
      element.clientWidth;

    const height =
      element.clientHeight;

    const initial =
      currentRef.current;

    const uniforms: Uniforms = {
      time: {
        value: 0,
      },

      resolution: {
        value: [1, 1],
      },

      rayPosition: {
        value: [
          width *
            renderer.dpr *
            initial.originX,

          height *
            renderer.dpr *
            initial.originY,
        ],
      },

      rayDirection: {
        value: [
          initial.directionX,
          initial.directionY,
        ],
      },

      rayColor: {
        value: hexToRgb(color),
      },

      speed: {
        value:
          prefersReducedMotion
            ? 0
            : initial.speed,
      },

      spread: {
        value: initial.spread,
      },

      rayLength: {
        value: initial.length,
      },

      pulse: {
        value: 0,
      },

      intensity: {
        value:
          initial.intensity,
      },

      pointer: {
        value: [0.5, 0.5],
      },

      pointerInfluence: {
        value:
          initial.pointerInfluence,
      },
    };

    const geometry =
      new Triangle(gl);

    const program =
      new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms,
        transparent: true,
      });

    const mesh =
      new Mesh(gl, {
        geometry,
        program,
      });

    const resize = () => {
      const nextWidth =
        element.clientWidth;

      const nextHeight =
        element.clientHeight;

      renderer.setSize(
        nextWidth,
        nextHeight,
      );

      uniforms.resolution.value = [
        nextWidth * renderer.dpr,
        nextHeight * renderer.dpr,
      ];
    };

    const handlePointerMove = (
      event: PointerEvent,
    ) => {
      const bounds =
        element.getBoundingClientRect();

      pointerRef.current = {
        x:
          (event.clientX -
            bounds.left) /
          bounds.width,

        y:
          (event.clientY -
            bounds.top) /
          bounds.height,
      };
    };

    let animationFrame = 0;
    let visible = true;

    const smoothValue = (
      current: number,
      target: number,
      factor: number,
    ) =>
      current +
      (target - current) *
        factor;

    const render = (
      time: number,
    ) => {
      if (visible) {
        const target =
          targetRef.current;

        const current =
          currentRef.current;

        /*
         * Slow interpolation.
         * This is what will let us move the light
         * smoothly between sections later.
         */
        const movementSmooth =
          prefersReducedMotion
            ? 1
            : 0.025;

        const propertySmooth =
          prefersReducedMotion
            ? 1
            : 0.035;

        current.originX =
          smoothValue(
            current.originX,
            target.originX,
            movementSmooth,
          );

        current.originY =
          smoothValue(
            current.originY,
            target.originY,
            movementSmooth,
          );

        current.directionX =
          smoothValue(
            current.directionX,
            target.directionX,
            movementSmooth,
          );

        current.directionY =
          smoothValue(
            current.directionY,
            target.directionY,
            movementSmooth,
          );

        current.intensity =
          smoothValue(
            current.intensity,
            target.intensity,
            propertySmooth,
          );

        current.speed =
          smoothValue(
            current.speed,
            target.speed,
            propertySmooth,
          );

        current.spread =
          smoothValue(
            current.spread,
            target.spread,
            propertySmooth,
          );

        current.length =
          smoothValue(
            current.length,
            target.length,
            propertySmooth,
          );

        current.pointerInfluence =
          smoothValue(
            current.pointerInfluence,
            target.pointerInfluence,
            propertySmooth,
          );

        /*
         * Update WebGL uniforms.
         */
        uniforms.rayPosition.value = [
          uniforms.resolution.value[0] *
            current.originX,

          uniforms.resolution.value[1] *
            current.originY,
        ];

        uniforms.rayDirection.value = [
          current.directionX,
          current.directionY,
        ];

        uniforms.intensity.value =
          current.intensity;

        uniforms.speed.value =
          prefersReducedMotion
            ? 0
            : current.speed;

        uniforms.spread.value =
          current.spread;

        uniforms.rayLength.value =
          current.length;

        uniforms.pointerInfluence.value =
          current.pointerInfluence;

        /*
         * Pointer smoothing.
         */
        smoothPointerRef.current.x +=
          (
            pointerRef.current.x -
            smoothPointerRef.current.x
          ) * 0.06;

        smoothPointerRef.current.y +=
          (
            pointerRef.current.y -
            smoothPointerRef.current.y
          ) * 0.06;

        uniforms.pointer.value = [
          smoothPointerRef.current.x,
          smoothPointerRef.current.y,
        ];

        uniforms.time.value =
          time * 0.001;

        /*
         * Pulse.
         */
        if (
          pulseStartRef.current !==
          null
        ) {
          const elapsed =
            time -
            pulseStartRef.current;

          const duration = 1200;

          const progress =
            Math.min(
              elapsed / duration,
              1,
            );

          uniforms.pulse.value =
            Math.sin(
              progress * Math.PI,
            ) ** 2;

          if (progress >= 1) {
            pulseStartRef.current =
              null;

            uniforms.pulse.value = 0;
          }
        } else {
          uniforms.pulse.value = 0;
        }

        renderer.render({
          scene: mesh,
        });
      }

      animationFrame =
        window.requestAnimationFrame(
          render,
        );
    };

    const resizeObserver =
      new ResizeObserver(resize);

    const visibilityObserver =
      new IntersectionObserver(
        ([entry]) => {
          visible =
            entry.isIntersecting;
        },
      );

    resizeObserver.observe(element);

    visibilityObserver.observe(
      element,
    );

    window.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    resize();

    animationFrame =
      window.requestAnimationFrame(
        render,
      );

    return () => {
      window.cancelAnimationFrame(
        animationFrame,
      );

      resizeObserver.disconnect();

      visibilityObserver.disconnect();

      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      if (
        gl.canvas.parentNode ===
        element
      ) {
        element.removeChild(
          gl.canvas,
        );
      }

      gl
        .getExtension(
          "WEBGL_lose_context",
        )
        ?.loseContext();
    };
  }, [
    color,
    prefersReducedMotion,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden ${className}`.trim()}
    />
  );
}