import { useEffect, useState } from 'react';
import { addElement, getElement } from '../utils/domUtil';

const updateTitle = (title: string) => {
  const titleElement = getElement('title');

  if (titleElement) {
    titleElement.innerText = title;
  } else {
    const newTitleElement = addElement('title');
    newTitleElement.innerText = title;
    document.head.appendChild(newTitleElement);
  }

};

export default function useTitle(initTitle?: string) {

  const [title, setTitle] = useState(initTitle ? initTitle : 'woolta blog');
  useEffect(() => updateTitle(title), [title]);
  return setTitle;
};