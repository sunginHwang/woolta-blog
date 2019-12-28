import React from 'react';
import styled from 'styled-components';
import PostItemPlaceHolder from './PostItemPlaceHolder';
import layouts from '../../../style/layouts';

function PostsPlaceHolder(){
  return (
    <S.PostItemPlaceHolder>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index => <PostItemPlaceHolder key={index}/>)}
    </S.PostItemPlaceHolder>
  );
}

export default PostsPlaceHolder;

const S: any = {};

S.PostItemPlaceHolder = styled.div`
  margin-top: 2em;
  max-width: ${layouts.contentMaxWidth};
  margin: 0 auto;

  @media screen and (max-width: ${layouts.mobileWidth}){
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media screen and (max-width: ${layouts.phoneWidth}){
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;