import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import AtomOneDark from './AtomOneDark';

interface CodeBlockProps {
  value: string;
  language: string;
  codeEl?: HTMLElement;
}

const CodeBlock = ({
                     value,
                     language,
                   }: CodeBlockProps) => {

  return (
    <SyntaxHighlighter language={language} style={AtomOneDark}>
      {value === undefined ? '' : value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;

