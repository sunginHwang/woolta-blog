import React from 'react';
import PlaceHolderBar from '../../../common/placeHolder/PlaceHolderBar/PlaceHolderBar';
import cn from './PostItemPlaceHolder.scss';

const PostItemPlaceHolder: React.FC<{}> = () => (
  <div className={cn.postItemPlaceHolder}>
    <div className={cn.title}>
      <PlaceHolderBar width='65%' height='1.8rem'/>
    </div>
    <div className={cn.content}>
      <PlaceHolderBar width='60%' height='1.1rem'/>
      <PlaceHolderBar width='80%' height='1.1rem'/>
      <PlaceHolderBar width='40%' height='1.1rem'/>
    </div>
    <div className={cn.category}>
      <PlaceHolderBar width='15%' height='.8rem'/>
    </div>
  </div>
);

export default PostItemPlaceHolder;