import React from 'react';
import classNames from 'classnames/bind';

import cn from './WriteView.scss';
import WriteEditorContainer from '../../../../containers/WriteEditorContainer';
import WriteViewContainer from '../../../../containers/WriteViewContainer';
import WriteHeaderContainer from '../../../../containers/WriteHeaderContainer';

const cx = classNames.bind(cn);


const WriteView: React.FC<{}> = () => {

  return (
    <div className={cn.write}>
      <div className={cn.write__header}>
        <WriteHeaderContainer/>
      </div>
      <div className={cn.write__content}>
        <div className={cx(cn.write__content__editor)}>
          <WriteEditorContainer/>
        </div>
        <div className={cx(cn.write__content__preview)}>
          <WriteViewContainer/>
        </div>
      </div>
    </div>
  );
};
export default WriteView;


