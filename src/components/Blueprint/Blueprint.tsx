import React from 'react';
import PassengerSvg from '@/assets/svg/van-passenger.svg?react';
import DriverSvg from '@/assets/svg/van-driver.svg?react';
import FrontSvg from '@/assets/svg/van-front.svg?react';
import RearSvg from '@/assets/svg/van-rear.svg?react';

export type BlueprintSide = 'passenger' | 'driver' | 'front' | 'rear';

export interface BlueprintProps {
  side?: BlueprintSide;
  style?: React.CSSProperties;
  className?: string;
  'aria-label'?: string;
}

const sideLabels: Record<BlueprintSide, string> = {
  passenger: 'Van — passenger side',
  driver: 'Van — driver side',
  front: 'Van — front',
  rear: 'Van — rear',
};

const svgMap: Record<BlueprintSide, React.FC<React.SVGProps<SVGSVGElement>>> = {
  passenger: PassengerSvg,
  driver: DriverSvg,
  front: FrontSvg,
  rear: RearSvg,
};

export function Blueprint({
  side = 'driver',
  style,
  className,
  'aria-label': ariaLabel,
}: BlueprintProps) {
  const Svg = svgMap[side];
  return (
    <Svg
      aria-label={ariaLabel ?? sideLabels[side]}
      style={style}
      className={className}
    />
  );
}
