import React from 'react';
import PlaceHolderBar from '../../../common/placeHolder/PlaceHolderBar/PlaceHolderBar';
import cn from './PostItemPlaceHolder.scss';

const PostItemPlaceHolder = () => (
  <div className={cn.postItemPlaceHolder}>
    <div className={cn.postItemPlaceHolder__title}>
      <PlaceHolderBar width='65%' height='2.88rem'/>
    </div>
    <div className={cn.postItemPlaceHolder__content}>
      <PlaceHolderBar width='60%' height='1.7rem'/>
      <PlaceHolderBar width='80%' height='1.7rem'/>
      <PlaceHolderBar width='40%' height='1.7rem'/>
    </div>
    <div className={cn.postItemPlaceHolder__category}>
      <PlaceHolderBar width='15%' height='1.28rem'/>
    </div>
  </div>
);

export default PostItemPlaceHolder;