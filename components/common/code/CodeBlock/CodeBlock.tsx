import React, { useEffect } from 'react';
import hljs from 'highlight.js';


interface CodeBlockProps {
  value: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
                                               value,
                                               language,
                                             }) => {

  useEffect(() => {
    highlightCode();
  });

  const setRef = (el: HTMLElement) => this['codeEl'] = el;

  const highlightCode = () => hljs.highlightBlock(this.codeEl);

  return (
    <pre>
          <code ref={setRef} className={`language-${language}`}>
            {value}
          </code>
      </pre>
  );
};

export default CodeBlock;

