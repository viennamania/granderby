import Image from 'next/image';

export function Live(props: React.SVGAttributes<{}>) {
  return (
    <Image src="/horseRace/live.gif" alt="Live" width="120" height="120" />
  );
}
