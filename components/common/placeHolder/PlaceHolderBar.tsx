import React from 'react';
import styled from 'styled-components';

type PlaceHolderBarProps = {
  width?: string
  height?: string
}

function PlaceHolderBar({ width, height }: PlaceHolderBarProps) {

  return (
    <S.PlaceHolderBar width={width} height={height}/>
  );
};

PlaceHolderBar.defaultProps = {
  width: '20rem',
  height: '3.2rem',
} as PlaceHolderBarProps;

export default PlaceHolderBar;

const S: any = {};

S.PlaceHolderBar = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  animation: ${({ theme }) => theme.animations.loading} 1.3s infinite ease-in-out;
  border-radius: .3rem;
  margin-bottom: .5rem;
`;

