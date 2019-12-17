import React from 'react';
import styled, { css } from 'styled-components';
import { MdNotificationsActive } from 'react-icons/md';

type NotificationBarProps = {
  message: string;
  isShow: boolean;
}

function NotificationBar({ message, isShow }: NotificationBarProps) {

  if (!isShow) return null;

  return (
    <S.NotificationBar isShow>
      <MdNotificationsActive/>
      <S.NotificationBarTitle>{message}</S.NotificationBarTitle>
    </S.NotificationBar>
  );
};

NotificationBar.defaultProps = {
  message: '',
  isShow: false,
};

export default NotificationBar;


const S: any = {};

S.NotificationBar = styled.div`
  position: fixed;
  bottom: .5rem;
  right: .5rem;
  color:#fff;
  background-color: #6e827f;
  padding: .5rem 1rem;
  border-radius: .8rem;
  font-size: 1.8rem;
  opacity:.95;
  min-height: 10rem;
  min-width: 30rem;
  display: flex;
  align-items: center;
  
  @keyframes slide-in-from-right {
  from {
    transform: translateX(100%);

  }
  to {
    transform: translateX(0);

  }
}

  ${props =>
  props.isShow && css`
    animation: slide-in-from-right .5s forwards;
  `
  }
  `;

S.NotificationBarTitle = styled.p`
  margin-left: 1rem;
  font-weight:bold;
  `;