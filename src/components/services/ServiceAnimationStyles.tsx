export function ServiceAnimationStyles() {
  return (
    <style>{`
      .service-main-sheen {
        position: absolute;
        top: 0;
        bottom: 0;
        left: -70%;
        z-index: 1;
        width: 70%;
        pointer-events: none;

        background:
          linear-gradient(
            115deg,
            transparent 34%,
            rgba(255,255,255,0.025) 43%,
            rgba(255,255,255,0.06) 50%,
            rgba(255,255,255,0.025) 57%,
            transparent 66%
          );

        opacity: 0;
        transform: translate3d(0, 0, 0);
        will-change: transform, opacity;
      }

      .service-main-sheen.is-active {
        animation: service-main-sheen 12s linear infinite;
      }

      @keyframes service-main-sheen {
        0% {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        58.3% {
          opacity: 1;
          transform: translate3d(245%, 0, 0);
        }

        58.4%,
        100% {
          opacity: 0;
          transform: translate3d(245%, 0, 0);
        }
      }

      .service-capability-dot {
        opacity: 0;
        transform: translate3d(-50%, 0, 0);
        will-change: transform, opacity;
      }

      .service-capability-dot.is-active {
        animation: service-capability-dot 2.6s linear infinite;
      }

      @keyframes service-capability-dot {
        0% {
          opacity: 0;
          transform: translate3d(-50%, 0, 0);
        }

        45% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          transform: translate3d(-50%, 18px, 0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .service-main-sheen.is-active,
        .service-capability-dot.is-active {
          animation: none;
        }
      }
    `}</style>
  );
}
