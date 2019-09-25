import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/redux/RootState';
import { initPostWrite, toggleOriginPreviewModal } from '../store/reducers/postWriteReducer';
import { ICategory } from '../types/post/ICategory';
import { upsertPostApi } from '../core/api/blogApi';
import OriginPreview from '../components/post/write/OriginPreview/OriginPreview';
import { TEMP_POST_AUTO_SAVE } from '../core/constants';
import { AxiosResponse } from 'axios';
import { IApiRes } from '../types/IApiRes';
import { IUpsertPostRes } from '../types/post/IUpsertPostRes';
import { getPosts } from '../store/reducers/postsReducer';
import { goPostDetailPage } from '../core/utils/routeUtil';
import WriteViewer from '../components/post/write/WriteViewer/WriteViewer';
import { showToast } from '../store/reducers/layoutReducer';

const WriteViewContainer: React.FC<{}> = ({}) => {

  const dispatch = useDispatch();
  const { postWriteReducer: { content, postNo, title, category, previewModal }, userInfo } = useSelector((state: RootState) => ({
    postWriteReducer: state.postWriteReducer,
    userInfo: state.authReducer.userInfo,
  }));

  // 프리뷰 클릭
  const onShowOriginPreview = useCallback(() => dispatch(toggleOriginPreviewModal(!previewModal)), [previewModal]);

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

    if (userInfo.no === 0) {
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

  const isEditMode = useMemo(() => postNo !== 0, [postNo]);

  return (
    <>
      <WriteViewer isEditMode={isEditMode}
                   content={content}
                   onUpsertPost={upsertPost}
                   onShowOriginPreview={onShowOriginPreview}
      />
      <OriginPreview
        content={content}
        onToggleView={onShowOriginPreview}
        visible={previewModal}
      />
    </>
  );
};

export default WriteViewContainer;