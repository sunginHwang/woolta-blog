import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/redux/RootState';
import { toggleOriginPreviewModal } from '../store/reducers/postWriteReducer';
import OriginPreview from '../components/post/write/OriginPreview/OriginPreview';
import WriteViewer from '../components/post/write/WriteViewer/WriteViewer';

const WriteViewContainer: React.FC<{}> = ({}) => {

  const dispatch = useDispatch();
  const { postWriteReducer: { content, previewModal } } = useSelector((state: RootState) => ({
    postWriteReducer: state.postWriteReducer,
    userInfo: state.authReducer.userInfo,
  }));

  // 프리뷰 클릭
  const onShowOriginPreview = useCallback(() => dispatch(toggleOriginPreviewModal(!previewModal)), [previewModal]);

  return (
    <>
      <WriteViewer content={content}
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

export default React.memo(WriteViewContainer);