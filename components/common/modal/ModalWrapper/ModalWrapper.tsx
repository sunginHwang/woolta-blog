import React from 'react';
import cn from './ModalWrapper.scss';

interface ModalWrapperProps {
  visible: boolean;
  modalClick: () => void;
  children?: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
                                                     visible,
                                                     modalClick,
                                                     children,
                                                   }) => {
  return (
    visible &&
    <div className={cn.modalWrapper} onClick={() => modalClick}>
      {children}
    </div>

  );
};

export default ModalWrapper;

