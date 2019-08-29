// @ts-ignore
import cn from './PlaceHolderBar.scss';
import React from 'react';

interface PlaceHolderBarProps {
  width?: string
  height?: string
}

const PlaceHolderBar: React.FC<PlaceHolderBarProps> = ({
                                                         width = '20rem',
                                                         height = '2rem',
                                                       }) =>
  <div className={cn.placeHolderBar} style={{ width, height }}/>;

export default PlaceHolderBar;

