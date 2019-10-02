import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/redux/RootState';
import { toggleOriginPreviewModal } from '../store/reducers/postWriteReducer';
import WriteViewer from '../components/post/write/WriteViewer/WriteViewer';

const WriteViewContainer: React.FC<{}> = ({}) => {

  const dispatch = useDispatch();
  const { postWriteReducer: { content, title, previewModal } } = useSelector((state: RootState) => ({
    postWriteReducer: state.postWriteReducer,
    userInfo: state.authReducer.userInfo,
  }));

  // 프리뷰 클릭
  const onShowOriginPreview = useCallback(() => dispatch(toggleOriginPreviewModal(!previewModal)), [previewModal]);

  return (
    <WriteViewer title={title}
                 content={content}
                 previewMode={previewModal}
                 onShowOriginPreview={onShowOriginPreview}
    />
  );
};

export default React.memo(WriteViewContainer);