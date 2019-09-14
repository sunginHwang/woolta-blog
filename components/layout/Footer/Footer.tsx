import { FC } from 'react';
import cn from './Footer.scss';

const Footer: FC<{}> = () => (
  <div className={cn.footer}>
    <p className={cn.footer__text}>Copyright © 2018 woolta.com</p>
    <p className={cn.footer__text}>gommpo111@gmail.com</p>
  </div>
);

export default Footer;
