import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/redux/RootState';
import { toggleOriginPreviewMode } from '../store/reducers/postWriteReducer';
import WriteViewer from '../components/post/write/WriteViewer';
import useToast from '../core/hooks/useToast';

const WriteViewContainer = () => {

  const dispatch = useDispatch();
  const [showToast, hideToast] = useToast();
  const { postWriteReducer: { content, title, previewMode } } = useSelector((state: RootState) => ({
    postWriteReducer: state.postWriteReducer,
    userInfo: state.authReducer.userInfo,
  }));

  useEffect(() => previewMode ? showToast('프리뷰 보기 모드 입니다.') : hideToast(), [previewMode]);

  // 프리뷰 클릭
  const onShowOriginPreview = useCallback(() => dispatch(toggleOriginPreviewMode(!previewMode)), [previewMode]);

  return (
    <WriteViewer title={title}
                 content={content}
                 previewMode={previewMode}
                 onShowOriginPreview={onShowOriginPreview}
    />
  );
};

export default React.memo(WriteViewContainer);