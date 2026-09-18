import Image from "next/image";

type ProjectDevicePreviewProps = {
  desktopSrc: string;
  mobileSrc: string;
  title: string;
  priority?: boolean;
};

export function ProjectDevicePreview({
  desktopSrc,
  mobileSrc,
  title,
  priority = false,
}: ProjectDevicePreviewProps) {
  return (
    <div className="project-device-stage">
      <div
        className="project-device-glow"
        aria-hidden="true"
      />

      <div className="project-laptop">
        <div
          className="project-laptop-camera"
          aria-hidden="true"
        />

        <div className="project-laptop-screen">
          <Image
            src={desktopSrc}
            alt={`${title} en desktop`}
            fill
            priority={priority}
            sizes="(max-width: 767px) 72vw, 58vw"
            className="project-device-image"
          />
        </div>

        <div
          className="project-laptop-base"
          aria-hidden="true"
        />
      </div>

      <div className="project-phone">
        <div
          className="project-phone-speaker"
          aria-hidden="true"
        />

        <div className="project-phone-screen">
          <Image
            src={mobileSrc}
            alt={`${title} en mobile`}
            fill
            priority={priority}
            sizes="(max-width: 767px) 25vw, 17vw"
            className="project-device-image"
          />
        </div>
      </div>
    </div>
  );
}