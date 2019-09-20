import React from 'react';
import cn from './WriteViewer.scss';
import MarkDownView from '../../../view/MarkDownView/MarkDownView';

interface WriteViewerProps {
  isEditMode: boolean;
  content: string;
  onUpsertPost: () => void;
  onShowOriginPreview: () => void;
}

const WriteViewer: React.FC<WriteViewerProps> = ({
                                                   onShowOriginPreview,
                                                   onUpsertPost,
                                                   isEditMode,
                                                   content,
                                                 }) => {
  return (
    <>
      <div className={cn.writeView__header}>
        <span className={cn.writeView__header__title}>preview</span>
        <div className={cn.writeView__header__saveButton} onClick={onUpsertPost}>
          <span>{isEditMode ? '수정하기' : '작성하기'}</span>
        </div>
      </div>
      <div className={cn.writeView__content} onClick={onShowOriginPreview}>
        <MarkDownView content={content}
                      skipHtml={false}
                      escapeHtml={false}/>
      </div>
    </>
  );
};

export default WriteViewer;