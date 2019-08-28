import React, { useEffect } from 'react';
import Nano from 'nanobar';

// @ts-ignore
import cn from './NanoBarLoading.scss';

const NanoBarLoading: React.FC<any> = ({}) => {

  useEffect(() => {
    const loadingBar = new Nano({
      classname: cn.nanoBarLoading,
      id: cn.nanoBarLoading,
    });

    window['nanoBarLoading'] = loadingBar;

    return () => {
      window['nanoBarLoading'] = null;
    };
  }, []);

  return null;
};

export default NanoBarLoading;


