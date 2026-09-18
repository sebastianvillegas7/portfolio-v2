import Image from "next/image";

type CountryFlagProps = {
  code: string;
  country: string;
};

export function CountryFlag({
  code,
  country,
}: CountryFlagProps) {
  return (
    <Image
      src={`/flags/${code.toLowerCase()}.svg`}
      alt=""
      width={20}
      height={14}
      aria-hidden="true"
      className="project-country-flag"
    />
  );
}