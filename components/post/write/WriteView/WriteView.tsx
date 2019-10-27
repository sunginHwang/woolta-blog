import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import cn from './WriteView.scss';
import WriteEditorContainer from '../../../../containers/WriteEditorContainer';
import WriteViewContainer from '../../../../containers/WriteViewContainer';
import WriteHeaderContainer from '../../../../containers/WriteHeaderContainer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../types/redux/RootState';

const cx = classNames.bind(cn);

interface WriteViewProps {
  previewMode: boolean;
}

const WriteView = ({
                     previewMode,
                   }: WriteViewProps) => {

  const ViewerRef = useRef(null);

  const renderEditor = !previewMode &&
    <div className={cx(cn.write__content__editor)}>
      <WriteEditorContainer/>
    </div>;

  const { contentPosition } = useSelector((state: RootState) => state.postWriteReducer);

  useEffect(() => {
    console.log('변경 스크롤');
    console.log(contentPosition);
    console.log(ViewerRef.current.scrollTop);
    if(contentPosition >= 97){
      ViewerRef.current.scrollTop =  ViewerRef.current.scrollHeight;
    }
  }, [contentPosition]);

  const renderHeader = !previewMode &&
    <div className={cn.write__header}>
      <WriteHeaderContainer/>
    </div>;

  return (
    <div className={cn.write}>
      {renderHeader}
      <div className={cn.write__content}>
        {renderEditor}
        <div className={cx(cn.write__content__preview, previewMode && cn.fullSize)} ref={ViewerRef}>
          <WriteViewContainer/>
        </div>
      </div>
    </div>
  );
};
export default WriteView;


