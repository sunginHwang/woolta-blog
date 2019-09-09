import React, { useEffect, useState } from 'react';
import { NextPageCustom } from '../types/next/NextPageCustom';
import { TEMP_POST_AUTO_SAVE } from '../core/constants';
import { confirm } from '../core/utils/dialogUtil';
import { useDispatch, useSelector } from 'react-redux';
import { ICategory } from '../types/post/ICategory';
import { addElement } from '../core/utils/domUtil';
import * as FileApi from '../core/api/FileApi';
import { RootState } from '../types/redux/RootState';
import {
  setCategory,
  setContent,
  setTitle,
  toggleError,
  toggleOriginPreviewModal,
} from '../store/reducers/postWriteReducer';
import { upsertPostApi } from '../core/api/blogApi';
import { convertImageToCodeImage } from '../core/utils/imageUtil';
import { toggleEditMode, toggleSpinnerLoading } from '../store/reducers/layoutReducer';
import WriteView from '../components/post/write/WriteView/WriteView';
import OriginPreview from '../components/post/write/OriginPreview/OriginPreview';
import useTitle from '../core/hooks/useTitle';

interface PostEditProps {
}

const PostEdit: NextPageCustom<PostEditProps> = ({}) => {

  const [interval, setttingInterval] = useState(null);

  const { authInfo, postNo, title, content, category, categories, error, errorMsg, previewModal } = useSelector((state: RootState) => ({
    authInfo: state.authReducer.authInfo,
    postNo: state.postWriteReducer.postNo,
    title: state.postWriteReducer.title,
    content: state.postWriteReducer.content,
    category: state.postWriteReducer.category,
    categories: state.categoryReducer.categories,
    error: state.postWriteReducer.error,
    errorMsg: state.postWriteReducer.errorMsg,
    previewModal: state.postWriteReducer.previewModal,
  }));

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

  const startAutoSave = () => {
    const fiveMin = 1000 * 60 * 5;
    setttingInterval(setInterval(autoSaveTempPost, fiveMin));
  };

  const stopAutoSave = () => {
    setttingInterval(clearInterval(interval));
  };

  const isLoadTempPost = () => {
    const tempPost = JSON.parse(localStorage.getItem(TEMP_POST_AUTO_SAVE));
    return postNo === 0 && content === '' && typeof tempPost === 'object' && tempPost !== null && tempPost.content !== '';
  };

  const loadTempPost = () => {
    const tempPost = JSON.parse(localStorage.getItem(TEMP_POST_AUTO_SAVE));
    confirm('임시저장된 정보를 불러오시겠습니까?').then(result => result && this.props.postUpsertAction.settingPostInfo(tempPost));
  };

  const autoSaveTempPost = () => {
    if (content !== '') {
      const tempPost = { postNo, category, title, content };
      localStorage.setItem(TEMP_POST_AUTO_SAVE, JSON.stringify(tempPost));
    }
  };

  // 본문내용 변경 작성
  const onChangeContent = (content) => {
    dispatch(setContent(content));
  };

  // 제목 변경
  const onChangeTitle = (title) => {
    dispatch(setTitle(title));
  };

  // 카테고리 변경 시
  const onChangeCategories = (selectedCategory: ICategory) => {
    dispatch(setCategory(selectedCategory));
  };

  // 글 생성 or 업데이트
  const upsertPost = () => {

    if (validateUpsertPost(title, content, category)) {
      const upsertData = {
        id: postNo,
        title: title,
        contents: content,
        categoryNo: category.value,
      };
      dispatch(upsertPostApi(upsertData));
    }
  };

  // 글 작성 유효성 검사
  const validateUpsertPost = (title: string, content: string, category: ICategory) => {

    if (authInfo.no === 0) {
      alert('로그인이 필요해요 ㅠㅠ.');
      return false;
    }

    if (title.length < 1 || title.length > 100) {
      alert('제목은 1~100글자 사이로 입력하세요.');
      return false;
    }

    if (content === '') {
      alert('게시글 내용을 작성해 주세요.');
      return false;
    }

    if (content.length < 5) {
      alert('게시글 내용이 너무 적습니다.');
      return false;
    }

    if (category === null) {
      alert('카테고리를 선택해주세요.');
      return false;
    }

    if (category.value < 0) {
      alert('카테고리 선택이 잘못되었습니다. 다시 선택해주세요.');
      return false;
    }

    return true;
  };

  /*이미지 버튼 삽입*/
  const onClickUploadImage = async () => {
    const fileInput = addElement('input');
    fileInput.type = 'file';
    fileInput.onchange = () => {
      if (!fileInput.files) return;
      uploadImage(fileInput.files[0]);
    };
    fileInput.click();
  };

  // 이미지 업로드
  const uploadImage = async (file) => {
    dispatch(toggleSpinnerLoading(true));
    const savedImageUrl = await FileApi.saveImageAndGetImageUrl(file);
    dispatch(toggleSpinnerLoading(false));
    return convertImageToCodeImage(savedImageUrl);
  };

  // 프리뷰 클릭
  const onClickShowOriginPreview = () => dispatch(toggleOriginPreviewModal(!previewModal));

  return (
    <div>
      <WriteView
        title={title}
        content={content}
        categories={categories}
        authInfo={authInfo}
        selectedCategory={category}
        upsertPost={upsertPost}
        onClickUploadImage={onClickUploadImage}
        onClickShowOriginPreview={onClickShowOriginPreview}
        onChangeContent={onChangeContent}
        onChangeTitle={onChangeTitle}
        onChangeCategories={onChangeCategories}
        uploadImage={uploadImage}/>
      <OriginPreview
        content={content}
        onToggleView={onClickShowOriginPreview}
        visible={previewModal}/>
    </div>
  );
};

PostEdit.getInitialProps = async ({}) => {
  return {};
};

export default PostEdit;
