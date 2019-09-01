export const convertToPlainText = (markdown: string): string => {
  if (!markdown) return '';
  return markdown.replace(/\n/g, ' ')
    .replace(/```(.*)```/g, '')
    .replace(/#/g, '')
    .replace(/[*]/g, '')
    .replace(/[![*]/g, ' ')
    .replace(/[(.*)]/g, ' ');
};