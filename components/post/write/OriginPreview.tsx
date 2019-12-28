import React from 'react';
import styled from 'styled-components';
import ModalWrapper from '../../common/modal/ModalWrapper';
import MarkDownView from '../../view/MarkDownView';
import layouts from '../../../style/layouts';

type OriginPreviewProps = {
  content: string;
  visible: boolean;
  onToggleView: () => void;
}

function OriginPreview({
                         content,
                         visible,
                         onToggleView,
                       }: OriginPreviewProps) {
  return (
    <ModalWrapper visible={visible} modalClick={() => onToggleView()}>
      <S.OriginPreview>
        <S.Contnet onClick={() => onToggleView()}>
          <MarkDownView content={content}
                        skipHtml={false}
                        escapeHtml={false}/>
        </S.Contnet>
      </S.OriginPreview>
    </ModalWrapper>
  );
};

OriginPreview.defaultProps = {
  content: '',
  visible: false,
};

export default OriginPreview;

const S: any = {};

S.OriginPreview = styled.div`
  position: fixed;
  word-break: break-all;
  top: 10%;
  width: 100%;
  max-height: 80%;
  cursor: pointer;
  z-index: 500;
  box-shadow: 1px 3px 10px 2px rgba(0,0,0,.2);
`;

S.Contnet = styled.div`
  width: ${layouts.contentMaxWidth};
  margin-left: auto;
  margin-right: auto;
  border-radius: 1.2rem;
  overflow-y: scroll;
  max-height: 70rem;
  padding: 1.6rem;
  text-align: left;
  background: #fff;
`;
