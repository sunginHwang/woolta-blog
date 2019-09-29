import React from 'react';
import cn from './WriteViewer.scss';
import MarkDownView from '../../../view/MarkDownView/MarkDownView';

interface WriteViewerProps {
  title: string;
  content: string;
  onShowOriginPreview: () => void;
}

const WriteViewer: React.FC<WriteViewerProps> = ({
                                                   title,
                                                   content,
                                                   onShowOriginPreview,
                                                 }) => {
  return (
    <>
      <div className={cn.writeViewer} onClick={onShowOriginPreview}>
        <h2 className={cn.writeViewer__title}>
          {title}
        </h2>
        <div className={cn.writeViewer__content}>
          <MarkDownView content={content}
                        skipHtml={false}
                        escapeHtml={false}/>
        </div>
      </div>
    </>
  );
};

export default WriteViewer;