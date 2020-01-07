import React from 'react';

type IcoCloseProps = {
  color?: string;
  width?: number;
  height?: number;
}

function IcoClose({ color, width, height, ...otherProps }: IcoCloseProps) {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 28 28" {...otherProps}>
      <g fill="none" fillRule="evenodd" stroke={color} strokeWidth="2">
        <path d="M4 4l20 20M24 4L4 24"/>
      </g>
    </svg>
  );
};

IcoClose.defaultProps = {
  color: 'red',
  width: 12,
  height: 12,
} as IcoCloseProps;

export default IcoClose;