import React from 'react';
import styled from 'styled-components';

type ModalWrapperProps = {
  visible: boolean;
  modalClick: () => void;
  children: React.ReactNode;
}

function ModalWrapper({
                        visible,
                        modalClick,
                        children,
                      }: ModalWrapperProps) {

  if (!visible) return null;

  return (
    <S.ModalWrapper onClick={() => modalClick}>
      {children}
    </S.ModalWrapper>
  );
};

export default ModalWrapper;

const S: any = {};

S.ModalWrapper = styled.div`
  position: fixed;
  top: 0!important;
  left: 0!important;
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: middle;
  background-color: rgba(0,0,0,.85);
  z-index: 400;
  `;

