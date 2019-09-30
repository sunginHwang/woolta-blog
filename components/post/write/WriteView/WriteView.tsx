import React from 'react';
import classNames from 'classnames/bind';

import cn from './WriteView.scss';
import WriteEditorContainer from '../../../../containers/WriteEditorContainer';
import WriteViewContainer from '../../../../containers/WriteViewContainer';
import WriteHeaderContainer from '../../../../containers/WriteHeaderContainer';

const cx = classNames.bind(cn);

interface WriteViewProps {
  isPreview: boolean;
}

const WriteView: React.FC<WriteViewProps> = ({
                                               isPreview,
                                             }) => {

  const renderEditor = !isPreview &&
    <div className={cx(cn.write__content__editor)}>
      <WriteEditorContainer/>
    </div>;

  const renderHeader = !isPreview &&
    <div className={cn.write__header}>
      <WriteHeaderContainer/>
    </div>;

  return (
    <div className={cn.write}>
      {renderHeader}
      <div className={cn.write__content}>
        {renderEditor}
        <div className={cx(cn.write__content__preview, isPreview && cn.fullSize)}>
          <WriteViewContainer/>
        </div>
      </div>
    </div>
  );
};
export default WriteView;


