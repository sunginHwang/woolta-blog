import { useEffect, useState } from 'react';
import { getElement } from '../utils/domUtil';

const updateTitle = (title: string) => {
  const titleElement = getElement('title');
  titleElement.innerText = title;
};

export default function useTitle(initTitle?: string) {
  const [title, setTitle] = useState(initTitle);
  useEffect(() => updateTitle(title), [title]);
  return setTitle;
};