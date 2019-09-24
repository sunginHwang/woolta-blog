import React from 'react';
import { MdNotificationsActive } from 'react-icons/md';
import cn from './NotificationBar.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(cn);

interface NotificationBarProps {
  message: string;
  isShow: boolean;
}

const NotificationBar: React.FC<NotificationBarProps> = ({ message, isShow }) => {

  if(!isShow) return null;

  return (
    <div className={cx(cn.notificationBar, isShow && cn.show)}>
      <MdNotificationsActive/>
      <p className={cn.notificationBar__title}>{message}</p>
    </div>
  );
};

export default NotificationBar;