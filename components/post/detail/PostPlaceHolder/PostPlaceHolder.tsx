import React from 'react';
import PlaceHolderBar from '../../../common/placeHolder/PlaceHolderBar';
import cn from './PostPlaceHolder.scss';

const PostPlaceHolder = () => (
  <div className={cn.postPlaceHolder}>
    <div className={cn.title}>
      <PlaceHolderBar width='60%' height='2.75rem'/>
    </div>
    <div className={cn.sub}>
      <div className={cn.circlePlaceHolder}/>
      <PlaceHolderBar width='30%' height='1.1rem'/>
    </div>
    <div>
      <PlaceHolderBar width='100%' height='26rem'/>
    </div>
  </div>
);

export default PostPlaceHolder;

