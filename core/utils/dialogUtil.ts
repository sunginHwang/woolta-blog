export const alert = message => Promise.resolve(window.alert(message));
export const confirm = message => Promise.resolve(window.confirm(message));
export const prompt = (message, fallback) => Promise.resolve(window.prompt(message, fallback));

export default {
  alert,
  confirm,
  prompt
};
