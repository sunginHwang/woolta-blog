import React from 'react';
import styled from 'styled-components';
import PlaceHolderBar from '../../common/placeHolder/PlaceHolderBar';
import colors from '../../../style/colors';
import layouts from '../../../style/layouts';

function PostItemPlaceHolder() {
  return (
    <S.PostItemPlaceHolder>
      <S.PostItemPlaceHolderItem>
        <PlaceHolderBar width='65%' height='2.88rem'/>
      </S.PostItemPlaceHolderItem>
      <S.PostItemPlaceHolderItem>
        <PlaceHolderBar width='60%' height='1.7rem'/>
        <PlaceHolderBar width='80%' height='1.7rem'/>
        <PlaceHolderBar width='40%' height='1.7rem'/>
      </S.PostItemPlaceHolderItem>
      <S.PostItemPlaceHolderItem>
        <PlaceHolderBar width='15%' height='1.28rem'/>
      </S.PostItemPlaceHolderItem>
    </S.PostItemPlaceHolder>
  );
};

export default PostItemPlaceHolder;

const S: any = {};

S.PostItemPlaceHolder = styled.div`
  text-align: left;
  padding-bottom: 1em;
  padding-top: 1.7em;
  border-bottom: 2px solid ${props => props.theme.colors.bottomLineColor};

  @media screen and (max-width: ${layouts.phoneWidth}){
    padding-bottom: 0.5em;
    padding-top: 1.2em;
  }
`;

S.PostItemPlaceHolderItem = styled.div`
  margin-bottom: 1.5rem;
`;