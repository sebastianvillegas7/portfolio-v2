import Image from "next/image";

type ProjectDevicePreviewProps = {
  desktopSrc: string;
  mobileSrc: string;
  title: string;
};

export function ProjectDevicePreview({
  desktopSrc,
  mobileSrc,
  title,
}: ProjectDevicePreviewProps) {
  return (
    <div className="project-device-stage">
      <div className="project-device-glow" />

      <div className="project-laptop">
        <div className="project-laptop-camera" />

        <div className="project-laptop-screen">
          <Image
            src={desktopSrc}
            alt={`${title} en desktop`}
            fill
            priority
            sizes="(max-width: 767px) 78vw, 60vw"
            className="project-device-image"
          />
        </div>

        <div className="project-laptop-base" />
      </div>

      <div className="project-phone">
        <div className="project-phone-speaker" />

        <div className="project-phone-screen">
          <Image
            src={mobileSrc}
            alt={`${title} en mobile`}
            fill
            priority
            sizes="(max-width: 767px) 28vw, 18vw"
            className="project-device-image"
          />
        </div>
      </div>
    </div>
  );
}