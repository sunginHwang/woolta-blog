import React from 'react';
import styled from 'styled-components';
import { HashLoader } from 'react-spinners';

type SpinnerLoadingProps = {
  loading: boolean;
}

function SpinnerLoading({ loading }: SpinnerLoadingProps) {

  return (
    <S.SpinnerLoading>
      <div>
        <HashLoader
          color={'#6e827f'}
          loading={loading}/>
      </div>
    </S.SpinnerLoading>
  );
};

export default SpinnerLoading;

const S: any = {};

S.SpinnerLoading = styled.div`
  background-color: #e8e8e8;
  z-index: 1000;
  position: fixed;
  top: 0!important;
  left: 0!important;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  background-color: rgba(0,0,0,.2);
  
    div{
      z-index: 1001;
    
      position: fixed;
      left: 50%;
      top: 50%;
    
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
  `;