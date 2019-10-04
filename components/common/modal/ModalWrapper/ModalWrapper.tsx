import React from 'react';
import cn from './ModalWrapper.scss';

interface ModalWrapperProps {
  visible: boolean;
  modalClick: () => void;
  children: React.ReactNode;
}

const ModalWrapper = ({
                        visible,
                        modalClick,
                        children,
                      }: ModalWrapperProps) => {
  return (
    visible &&
    <div className={cn.modalWrapper} onClick={() => modalClick}>
      {children}
    </div>

  );
};

export default ModalWrapper;

