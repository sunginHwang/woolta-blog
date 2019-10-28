import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import cn from './WriteView.scss';
import WriteEditorContainer from '../../../../containers/WriteEditorContainer';
import WriteViewContainer from '../../../../containers/WriteViewContainer';
import WriteHeaderContainer from '../../../../containers/WriteHeaderContainer';

const cx = classNames.bind(cn);

interface WriteViewProps {
  previewMode: boolean;
  contentPosition: number;
}

const WriteView = ({
                     previewMode,
                     contentPosition,
                   }: WriteViewProps) => {

  const ViewerRef = useRef(null);

  useEffect(() => {
    const isLastScrollArea = contentPosition >= 97;
    if (isLastScrollArea) {
      ViewerRef.current.scrollTop = ViewerRef.current.scrollHeight;
    }
  }, [contentPosition]);

  const renderEditor = !previewMode &&
    <div className={cx(cn.write__content__editor)}>
      <WriteEditorContainer/>
    </div>;

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


