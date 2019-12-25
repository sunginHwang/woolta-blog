import React from 'react';

import ModalWrapper from '../../../common/modal/ModalWrapper';
import MarkDownView from '../../../view/MarkDownView/MarkDownView';
import cn from './OriginPreview.scss';

interface OriginPreviewProps {
  content: string;
  visible: boolean;
  onToggleView: () => void;
}

const OriginPreview = ({
                         content,
                         visible,
                         onToggleView,
                       }: OriginPreviewProps) => {
  return (
    <ModalWrapper visible={visible} modalClick={() => onToggleView()}>
      <div className={cn.originPreview}>
        <div className={cn.originPreview__content} onClick={() => onToggleView()}>
          <MarkDownView content={content}
                        skipHtml={false}
                        escapeHtml={false}/>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default OriginPreview;

