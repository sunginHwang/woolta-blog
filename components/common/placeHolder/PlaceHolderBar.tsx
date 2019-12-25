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
};

export default PlaceHolderBar;

const S: any = {};

S.PlaceHolderBar = styled.div`
  width: ${props => props.widows};
  height: ${props => props.height};
  animation: loading-animation 1.3s infinite ease-in-out;
  border-radius: .3rem;
  margin-bottom: .5rem;
  
  @keyframes loading-animation {
    0% {
      background-color: hsl(0,0%,89%);
    }
    50% {
      background-color: hsl(0,0%,85%);
    }
    100% {
      background-color: hsl(0,0%,89%);
    }
  }
  `;

