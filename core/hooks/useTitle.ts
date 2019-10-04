import { useEffect, useState } from 'react';
import { addElement, getElement } from '../utils/domUtil';

const updateTitle = (title: string) => {
  const titleElement = getElement('title');
  if (titleElement) {
    titleElement.innerText = title;
  } else {
    const title = addElement('title');
    title.innerText = title;
    document.head.appendChild(title);
  }

};

export default function useTitle(initTitle?: string) {
  const [title, setTitle] = useState(initTitle);
  useEffect(() => updateTitle(title), [title]);
  return setTitle;
};