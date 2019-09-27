import React from 'react';
import classNames from 'classnames/bind';
import { MdImage, MdSave } from 'react-icons/md';
import Select from 'react-select';

import cn from './WriteView.scss';
import WriteEditorContainer from '../../../../containers/WriteEditorContainer';
import WriteViewContainer from '../../../../containers/WriteViewContainer';

const cx = classNames.bind(cn);


const WriteView: React.FC<{}> = () => {
  return (
    <div className={cn.write}>
      <div className={cn.write__header}>
        <div className={cn.write__header__left}>
          <input type='text'
                 placeholder='제목을 입력해 주세요.' />

        </div>
        <div className={cn.write__header__right}>
          <div className={cn.write__header__right__select}>
            <Select
              value='12'
              options={[]}
            />
          </div>
          <div className={cn.write__header__right__button}>
            <MdImage/>
            <span>업로드</span>
          </div>
          <div className={cn.write__header__right__button}>
            <MdSave/>
            <span>작성하기</span>
          </div>
        </div>
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


