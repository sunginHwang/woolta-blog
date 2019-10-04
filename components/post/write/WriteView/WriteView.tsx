import React from 'react';
import classNames from 'classnames/bind';

import cn from './WriteView.scss';
import WriteEditorContainer from '../../../../containers/WriteEditorContainer';
import WriteViewContainer from '../../../../containers/WriteViewContainer';
import WriteHeaderContainer from '../../../../containers/WriteHeaderContainer';

const cx = classNames.bind(cn);

interface WriteViewProps {
  previewMode: boolean;
}

const WriteView = ({
                     previewMode,
                   }: WriteViewProps) => {

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
        <div className={cx(cn.write__content__preview, previewMode && cn.fullSize)}>
          <WriteViewContainer/>
        </div>
      </div>
    </div>
  );
};
export default WriteView;


