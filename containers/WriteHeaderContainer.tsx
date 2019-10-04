import React, { useCallback, useMemo } from 'react';
import WriteHeader from '../components/post/write/WriteHeader/WriteHeader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/redux/RootState';
import { initPostWrite, setCategory, setContent, setTitle } from '../store/reducers/postWriteReducer';
import { ICategory } from '../types/post/ICategory';
import { AxiosResponse } from 'axios';
import { IApiRes } from '../types/IApiRes';
import { IUpsertPostRes } from '../types/post/IUpsertPostRes';
import { upsertPostApi } from '../core/api/blogApi';
import { TEMP_POST_AUTO_SAVE } from '../core/constants';
import { getPosts } from '../store/reducers/postsReducer';
import { showToast, toggleSpinnerLoading } from '../store/reducers/layoutReducer';
import { goPostDetailPage } from '../core/utils/routeUtil';
import { addElement } from '../core/utils/domUtil';
import useImageUpload from '../core/hooks/useImageUpload';

const WriteHeaderContainer = () => {

  const { categories, postWriteReducer: { postNo, title, content, category, contentWriteIndex } } = useSelector((state: RootState) => ({
    postWriteReducer: state.postWriteReducer,
    categories: state.categoryReducer.categories,
  }));

  const [onImageUpload, addImageTag] = useImageUpload();
  const dispatch = useDispatch();

  const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => dispatch(setTitle(e.target.value)), [dispatch]);
  const onChangeCategories = useCallback((selectedCategory: ICategory) => dispatch(setCategory(selectedCategory)), [dispatch]);
  const isEditMode = useMemo(() => postNo !== 0, [postNo]);

  // 글 생성 or 업데이트
  const upsertPost = async () => {

    if (!validateUpsertPost(title, content, category)) {
      return;
    }

    const upsertData = {
      id: postNo,
      title: title,
      contents: content,
      categoryNo: category.value,
    };

    try {
      const res: AxiosResponse<IApiRes<IUpsertPostRes>> = await upsertPostApi(upsertData);
      localStorage.removeItem(TEMP_POST_AUTO_SAVE);
      await dispatch(initPostWrite());
      await dispatch(getPosts(res.data.data.categoryNo));
      await dispatch(showToast(`글 ${isEditMode ? '수정' : '생성'}이 완료되었습니다.`));
      goPostDetailPage(res.data.data.categoryNo, res.data.data.postNo);
    } catch (e) {
      alert(e);
    }
  };

  // 글 작성 유효성 검사
  const validateUpsertPost = (title: string, content: string, category: ICategory) => {

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
  const uploadImage = () => {
    const fileInput = addElement('input');
    fileInput.type = 'file';
    fileInput.onchange = async () => {
      if (!fileInput.files) return;
      dispatch(toggleSpinnerLoading(true));
      const markdownImg = await onImageUpload(fileInput.files[0]);
      addImage(markdownImg, contentWriteIndex);
      dispatch(toggleSpinnerLoading(false));
    };
    fileInput.click();
  };

  const addImage = useCallback((image, addIndex) => {
    dispatch(setContent(addImageTag(image, content, addIndex)));
  }, [content, contentWriteIndex]);

  return (
    <WriteHeader title={title}
                 categories={categories}
                 category={category}
                 upsertPost={upsertPost}
                 onImageUpload={uploadImage}
                 onChangeTitle={onChangeTitle}
                 onChangeCategories={onChangeCategories}
    />
  );
};

export default React.memo(WriteHeaderContainer);