export const getElements = selector => document.querySelectorAll(selector);
export const getElement = selector => document.querySelector(selector);
export const addElement = elementType => document.createElement(elementType);
export const addClass = (element, className) => element.classList.add(className);
export const removeClass = (element, className) => element.classList.remove(className);
export const hasClass = (element, className) => element.classList.contains(className);