import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../common/code/CodeBlock/CodeBlock';
import * as cn from './MarkDownView.scss';

interface MarkDownViewProps {
  content: string;
  skipHtml: boolean;
  escapeHtml: boolean;
}

const MarkDownView: React.FC<MarkDownViewProps> = React.memo(({
                                                                content,
                                                                skipHtml,
                                                                escapeHtml,
                                                              }) =>  (
  <div className={cn.markDownView}>
    <ReactMarkdown source={content}
                   skipHtml={skipHtml}
                   escapeHtml={escapeHtml}
                   renderers={{ code: CodeBlock }}/>
  </div>
), ((prevProps, nextProps) => {
  return prevProps.content === nextProps.content;
}));

export default MarkDownView;
