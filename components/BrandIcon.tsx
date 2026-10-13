import Image from "next/image";

export default function BrandIcon({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/images/komorebi-logo.png"
      alt=""
      width={size}
      height={size}
      className={`brand-icon ${className}`}
    />
  );
}
