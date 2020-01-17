import React from 'react';
import styled from 'styled-components';
import PlaceHolderBar from '../../common/placeHolder/PlaceHolderBar';
import layouts from '../../../style/layouts';
import animations from '../../../style/animations';

function PostPlaceHolder() {
  return (
    <S.postPlaceHolder>
      <S.postPlaceHolderTitle>
        <PlaceHolderBar width='60%' height='2.75rem'/>
      </S.postPlaceHolderTitle>
      <S.postPlaceHolderSub>
        <S.circlePlaceHolder/>
        <PlaceHolderBar width='30%' height='1.1rem'/>
      </S.postPlaceHolderSub>
      <div>
        <PlaceHolderBar width='100%' height='26rem'/>
      </div>
    </S.postPlaceHolder>
  );
};

export default PostPlaceHolder;

const S: any = {};

S.postPlaceHolder = styled.div`
  margin-top: 2em;

  @media screen and (max-width: ${layouts.phoneWidth}){
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media screen and (max-width: ${layouts.phoneWidth}){
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

S.postPlaceHolderTitle = styled.div`
  margin-bottom: 15px;
`;

S.postPlaceHolderSub = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 45px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme.colors.loadingAnimationColor1};
`;

S.circlePlaceHolder = styled.div`
  animation: ${({ theme }) => theme.animations.loading} 1.3s infinite ease-in-out;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-right: 0.5rem;
`;



