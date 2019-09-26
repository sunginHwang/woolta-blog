import { FC } from 'react';
import cn from './Footer.scss';

interface FooterProps {
  editMode: boolean;
}

const Footer: FC<FooterProps> = ({ editMode }) => {

  if (editMode) return null;

  return (
    <div className={cn.footer}>
      <p className={cn.footer__text}>Copyright © 2018 woolta.com</p>
      <p className={cn.footer__text}>gommpo111@gmail.com</p>
    </div>
  );
};

export default Footer;
