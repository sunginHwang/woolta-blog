import React from 'react';
import classNames from 'classnames/bind';
import cn from './WriteView.scss';
import WriteEditorContainer from '../../../../containers/WriteEditorContainer';
import WriteViewContainer from '../../../../containers/WriteViewContainer';

const cx = classNames.bind(cn);


const WriteView: React.FC<{}> = () => {
  return (
    <div className={cn.write}>
      <div className={cx(cn.write__editor)}>
        <WriteEditorContainer/>
      </div>
      <div className={cx(cn.write__preview)}>
        <WriteViewContainer/>
      </div>
    </div>
  );
};
export default WriteView;


