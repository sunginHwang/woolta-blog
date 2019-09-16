import React from 'react';
import classNames from 'classnames/bind';
import cn from './WriteViewContainer.scss';
import MarkDownView from '../../components/view/MarkDownView/MarkDownView';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types/redux/RootState';
import { toggleOriginPreviewModal } from '../../store/reducers/postWriteReducer';
import { ICategory } from '../../types/post/ICategory';
import { upsertPostApi } from '../../core/api/blogApi';
import OriginPreview from '../../components/post/write/OriginPreview/OriginPreview';

const cx = classNames.bind(cn);

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
  const onClickShowOriginPreview = () => dispatch(toggleOriginPreviewModal(!previewModal));

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
  return (
    <>
      <div className={cn.writeView__header}>
        <span className={cn.writeView__header__title}>preview</span>
        <div className={cn.writeView__header__saveButton} onClick={() => upsertPost()}>
          저장하기
        </div>
      </div>
      <div className={cn.writeView__content} onClick={() => onClickShowOriginPreview()}>
        <MarkDownView content={content}
                      skipHtml={false}
                      escapeHtml={false}/>
      </div>
      <OriginPreview
        content={content}
        onToggleView={onClickShowOriginPreview}
        visible={previewModal}/>
    </>
  );
};

export default WriteViewContainer;