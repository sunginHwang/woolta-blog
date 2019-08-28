// @ts-ignore
import cn from './Footer.scss';
import { FC } from 'react';

interface FooterProps {
}

const Footer: FC<FooterProps> = () => {

  return <div className={cn.footer}>
    <p className={cn.text}>Copyright © 2018 woolta.com</p>
    <p className={cn.text}>gommpo111@gmail.com</p>
  </div>;
};
export default Footer;
