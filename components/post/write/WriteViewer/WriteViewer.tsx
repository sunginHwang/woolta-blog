import React from 'react';
import cn from './WriteViewer.scss';
import MarkDownView from '../../../view/MarkDownView/MarkDownView';

interface WriteViewerProps {
  content: string;
  onShowOriginPreview: () => void;
}

const WriteViewer: React.FC<WriteViewerProps> = ({
                                                   onShowOriginPreview,
                                                   content,
                                                 }) => {
  return (
    <>
      <div className={cn.writeView__content} onClick={onShowOriginPreview}>
        <MarkDownView content={content}
                      skipHtml={false}
                      escapeHtml={false}/>
      </div>
    </>
  );
};

export default WriteViewer;