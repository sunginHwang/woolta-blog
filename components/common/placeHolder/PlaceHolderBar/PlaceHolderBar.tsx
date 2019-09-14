import React from 'react';
import cn from './PlaceHolderBar.scss';

interface PlaceHolderBarProps {
  width?: string
  height?: string
}

const PlaceHolderBar: React.FC<PlaceHolderBarProps> = ({
                                                         width = '20rem',
                                                         height = '3.2rem',
                                                       }) =>
  <div className={cn.placeHolderBar} style={{ width, height }}/>;

export default PlaceHolderBar;

