import React, { useEffect } from 'react';
import Nano from 'nanobar';
import cn from './NanoBarLoading.scss';

const NanoBarLoading = () => {

  useEffect(() => {
    const loadingBar = new Nano({
      classname: cn.nanoBarLoading,
      id: cn.nanoBarLoading,
    });

    window['nanoBarLoading'] = loadingBar;

    return () => window['nanoBarLoading'] = null;
  }, []);

  return null;
};

export default NanoBarLoading;


