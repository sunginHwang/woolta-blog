import React, { useCallback, useMemo } from 'react';
import cn from './WriteViewContainer.scss';
import MarkDownView from '../../components/view/MarkDownView/MarkDownView';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types/redux/RootState';
import { initPostWrite, toggleOriginPreviewModal } from '../../store/reducers/postWriteReducer';
import { ICategory } from '../../types/post/ICategory';
import { fetchPosts, upsertPostApi } from '../../core/api/blogApi';
import OriginPreview from '../../components/post/write/OriginPreview/OriginPreview';
import { TEMP_POST_AUTO_SAVE } from '../../core/constants';
import { AxiosResponse } from 'axios';
import { IApiRes } from '../../types/IApiRes';
import { IUpsertPostRes } from '../../types/post/IUpsertPostRes';
import { getPosts } from '../../store/reducers/postsReducer';
import { goPostDetailPage } from '../../core/utils/routeUtil';

const WriteViewContainer: React.FC<{}> = ({}) => {

  const dispatch = useDispatch();
  const { content, postNo, title, category, authInfo, previewModal } = useSelector((state: RootState) => ({
    content: state.postWriteReducer.content,
    title: state.postWriteReducer.title,
    category: state.postWriteReducer.category,
    postNo: state.postWriteReducer.postNo,
    previewModal: state.postWriteReducer.previewModal,
    authInfo: state.authReducer.authInfo,
  }));

  // 프리뷰 클릭
  const onShowOriginPreview = () => useCallback(() => dispatch(toggleOriginPreviewModal(!previewModal)), [previewModal]);

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
      await dispatch(getPosts(fetchPosts(res.data.data.categoryNo)));
      goPostDetailPage(res.data.data.categoryNo, res.data.data.postNo);
    } catch (e) {
      alert(e);
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

  const isEditMode = useMemo(()=> postNo !== 0 ,[postNo]);

  return (
    <>
      <div className={cn.writeView__header}>
        <span className={cn.writeView__header__title}>preview</span>
        <div className={cn.writeView__header__saveButton} onClick={upsertPost}>
          <span>{isEditMode ? '수정하기' : '작성하기'}</span>
        </div>
      </div>
      <div className={cn.writeView__content} onClick={onShowOriginPreview}>
        <MarkDownView content={content}
                      skipHtml={false}
                      escapeHtml={false}/>
      </div>
      <OriginPreview
        content={content}
        onToggleView={onShowOriginPreview}
        visible={previewModal}/>
    </>
  );
};

export default WriteViewContainer;