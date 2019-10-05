import React, { useEffect } from 'react';
import { NextPageCustom } from '../types/next/NextPageCustom';
import { FIVE_MIN, TEMP_POST_AUTO_SAVE } from '../core/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/redux/RootState';
import { toggleEditMode } from '../store/reducers/layoutReducer';
import WriteView from '../components/post/write/WriteView/WriteView';
import useTitle from '../core/hooks/useTitle';
import useToast from '../core/hooks/useToast';


const PostEdit: NextPageCustom<{}> = ({}) => {

  const intervalRef = React.useRef(null);

  const { postNo, title, content, category, previewMode } = useSelector((state: RootState) => state.postWriteReducer);

  const dispatch = useDispatch();
  useTitle('게시글 작성');
  const [, , notifyToast] = useToast();
  useEffect(() => {
    dispatch(toggleEditMode(true));
    isLoadTempPost() && loadTempPost();
    return () => dispatch(toggleEditMode(false));
  }, []);

  useEffect(() => {
    startAutoSave();
    return () => stopAutoSave();
  }, [title, content, category]);

  const startAutoSave = () => {
    if (intervalRef.current) {
      return;
    }

    intervalRef.current = setInterval(() => {
      if (content !== '') {
        const tempPost = { postNo, category, title, content };
        localStorage.setItem(TEMP_POST_AUTO_SAVE, JSON.stringify(tempPost));
        notifyToast('임시저장 되었습니다.');
      }
    }, FIVE_MIN);
  };

  const stopAutoSave = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const isLoadTempPost = () => {
    const tempPost = JSON.parse(localStorage.getItem(TEMP_POST_AUTO_SAVE));
    return postNo === 0 && content === '' && typeof tempPost === 'object' && tempPost !== null && tempPost.content !== '';
  };

  const loadTempPost = () => {
   /* const tempPost = JSON.parse(localStorage.getItem(TEMP_POST_AUTO_SAVE));
    confirm('임시저장된 정보를 불러오시겠습니까?').then(result => result && dispatch(settingPostInfo(tempPost)));*/
  };

  return (
    <WriteView previewMode={previewMode}/>
  );
};

PostEdit.getInitialProps = async ({}) => {
  return {};
};

export default React.memo(PostEdit);
