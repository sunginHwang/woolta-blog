import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../common/code/CodeBlock/CodeBlock';
import * as cn from './MarkDownView.scss';

interface MarkDownViewProps {
  content: string;
  skipHtml: boolean;
  escapeHtml: boolean;
}

const MarkDownView = ({
                        content,
                        skipHtml,
                        escapeHtml,
                      }: MarkDownViewProps) => (
  <div className={cn.markDownView}>
    <ReactMarkdown source={content}
                   skipHtml={skipHtml}
                   escapeHtml={escapeHtml}
                   renderers={{ code: CodeBlock }}/>
  </div>
);

export default React.memo(MarkDownView, ((prevProps, nextProps) => {
  return prevProps.content === nextProps.content;
}));
