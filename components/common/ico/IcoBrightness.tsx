import React from 'react';

type IcoBrightnessProps = {
  color?: string;
  width?: number;
  height?: number;
}

function IcoBrightness({ color, width, height, ...otherProps }: IcoBrightnessProps) {

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 28 28" {...otherProps} fill={color}>
        <path fillRule="evenodd"
          d="M10,2C8.18,2 6.47,2.5 5,3.35C8,5.08 10,8.3 10,12C10,15.7 8,18.92 5,20.65C6.47,21.5 8.18,22 10,22A10,10 0 0,0 20,12A10,10 0 0,0 10,2Z"/>
      </svg>
    </>

  );
};

IcoBrightness.defaultProps = {
  color: 'currentColor',
  width: 12,
  height: 12,
} as IcoBrightnessProps;

export default IcoBrightness;