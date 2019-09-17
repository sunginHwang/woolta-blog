import React, { useEffect, useState } from 'react';
import { NextPageCustom } from '../types/next/NextPageCustom';
import { FIVE_MIN, TEMP_POST_AUTO_SAVE } from '../core/constants';
import { confirm } from '../core/utils/dialogUtil';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/redux/RootState';
import { settingPostInfo, toggleError } from '../store/reducers/postWriteReducer';
import { toggleEditMode } from '../store/reducers/layoutReducer';
import WriteView from '../components/post/write/WriteView/WriteView';
import useTitle from '../core/hooks/useTitle';

interface PostEditProps {
}

const PostEdit: NextPageCustom<PostEditProps> = ({}) => {

  const [interval, settingInterval] = useState(null);

  const { postNo, title, content, category, error, errorMsg } = useSelector((state: RootState) => state.postWriteReducer);

  const dispatch = useDispatch();
  useTitle('게시글 작성');

  useEffect(() => {
    dispatch(toggleEditMode(true));
    startAutoSave();

    isLoadTempPost() && loadTempPost();
    error && onDetectError();

    return () => {
      dispatch(toggleEditMode(false));
      stopAutoSave();
    };
  }, [error]);


  const onDetectError = () => {
    if (error) {
      alert(errorMsg);
      dispatch(toggleError(false));
    }
  };

  const startAutoSave = () => settingInterval(setInterval(autoSaveTempPost, FIVE_MIN));
  const stopAutoSave = () => settingInterval(clearInterval(interval));

  const isLoadTempPost = () => {
    const tempPost = JSON.parse(localStorage.getItem(TEMP_POST_AUTO_SAVE));
    return postNo === 0 && content === '' && typeof tempPost === 'object' && tempPost !== null && tempPost.content !== '';
  };

  const loadTempPost = () => {
    const tempPost = JSON.parse(localStorage.getItem(TEMP_POST_AUTO_SAVE));
    confirm('임시저장된 정보를 불러오시겠습니까?').then(result => result && dispatch(settingPostInfo(tempPost)));
  };

  const autoSaveTempPost = () => {
    if (content !== '') {
      const tempPost = { postNo, category, title, content };
      localStorage.setItem(TEMP_POST_AUTO_SAVE, JSON.stringify(tempPost));
    }
  };


  return (
    <WriteView/>
  );
};

PostEdit.getInitialProps = async ({}) => {
  return {};
};

export default PostEdit;
