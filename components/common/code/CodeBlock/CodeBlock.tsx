import React, { useEffect } from 'react';
import hljs from 'highlight.js';

interface CodeBlockProps {
  value: string;
  language: string;
  codeEl: HTMLElement;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
                                               value,
                                               codeEl,
                                               language,
                                             }) => {

  useEffect(() => highlightCode(), [value, codeEl, language]);

  const setRef = (el: HTMLElement) => codeEl = el;

  const highlightCode = () => hljs.highlightBlock(codeEl);

  return (
    <pre>
          <code ref={setRef} className={`language-${language}`}>
            {value}
          </code>
      </pre>
  );
};

export default CodeBlock;

