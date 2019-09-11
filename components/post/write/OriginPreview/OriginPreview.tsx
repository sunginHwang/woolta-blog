import React from 'react';

import ModalWrapper from '../../../common/modal/ModalWrapper/ModalWrapper';
import MarkDownView from '../../../view/MarkDownView/MarkDownView';
import cn from './OriginPreview.scss';

interface OriginPreviewProps {
  content: string;
  visible: boolean;
  onToggleView: () => void;
}

const OriginPreview: React.FC<OriginPreviewProps> = ({
                         content,
                         visible,
                         onToggleView,
                       }) => {
  return (
    <ModalWrapper visible={visible} modalClick={() => onToggleView()}>
      <div className={cn.originPreview}>
        <div className={cn.content} onClick={() => onToggleView()}>
          <MarkDownView content={content}
                        skipHtml={false}
                        escapeHtml={false}/>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default OriginPreview;

