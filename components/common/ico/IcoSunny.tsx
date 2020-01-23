import React from 'react';

type IcoSunnyProps = {
  color?: string;
  width?: number;
  height?: number;
}

function IcoSunny({ color, width, height, ...otherProps }: IcoSunnyProps) {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 28 28"
         {...otherProps}
         fill={color}>
      <path
        d="M3.55,18.54L4.96,19.95L6.76,18.16L5.34,16.74M11,22.45C11.32,22.45 13,22.45 13,22.45V19.5H11M12,5.5A6,6 0 0,0 6,11.5A6,6 0 0,0 12,17.5A6,6 0 0,0 18,11.5C18,8.18 15.31,5.5 12,5.5M20,12.5H23V10.5H20M17.24,18.16L19.04,19.95L20.45,18.54L18.66,16.74M20.45,4.46L19.04,3.05L17.24,4.84L18.66,6.26M13,0.55H11V3.5H13M4,10.5H1V12.5H4M6.76,4.84L4.96,3.05L3.55,4.46L5.34,6.26L6.76,4.84Z"/>
    </svg>
  );
};

IcoSunny.defaultProps = {
  color: 'currentColor',
  width: 12,
  height: 12,
} as IcoSunnyProps;

export default IcoSunny;

