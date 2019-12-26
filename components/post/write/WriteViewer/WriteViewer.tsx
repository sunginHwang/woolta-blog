import React from 'react';
import cn from './WriteViewer.scss';
import MarkDownView from '../../../view/MarkDownView';

interface WriteViewerProps {
  title: string;
  content: string;
  previewMode: boolean;
  onShowOriginPreview: () => void;
}

const WriteViewer = ({
                       title,
                       content,
                       previewMode,
                       onShowOriginPreview,
                     }: WriteViewerProps) => {

  const renderPreviewTitle = previewMode &&
    <h2 className={cn.writeViewer__title}>
      {title}
    </h2>;

  return (
    <div className={cn.writeViewer} onClick={onShowOriginPreview}>
      {renderPreviewTitle}
      <div className={cn.writeViewer__content}>
        <MarkDownView content={content}
                      skipHtml={false}
                      escapeHtml={false}/>
      </div>
    </div>
  );
};

export default WriteViewer;