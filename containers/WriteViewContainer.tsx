import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/redux/RootState';
import { toggleOriginPreviewMode } from '../store/reducers/postWriteReducer';
import WriteViewer from '../components/post/write/WriteViewer/WriteViewer';

const WriteViewContainer = () => {

  const dispatch = useDispatch();
  const { postWriteReducer: { content, title, previewMode } } = useSelector((state: RootState) => ({
    postWriteReducer: state.postWriteReducer,
    userInfo: state.authReducer.userInfo,
  }));

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