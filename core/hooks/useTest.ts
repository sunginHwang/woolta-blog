import { useState } from 'react';


export default function useTitle(initTitle?: string) {

  const [title, setTitle] = useState(initTitle ? initTitle : 'woolta blog');
  return [title, setTitle] as [string, typeof setTitle];
};