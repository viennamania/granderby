import Image from 'next/image';

export function GrdIcon(props: React.SVGAttributes<{}>) {
  return (
    <Image src="/horseRace/grd-logo.png" alt="GRD" width={24} height={24} />
  );
}
