import React from 'react';
import styled from 'styled-components';
import MarkDownView from '../../view/MarkDownView';
import colors from '../../../style/colors';

type WriteViewerProps = {
  title: string;
  content: string;
  previewMode: boolean;
  onShowOriginPreview: () => void;
}

function WriteViewer({
                       title,
                       content,
                       previewMode,
                       onShowOriginPreview,
                     }: WriteViewerProps) {


  return (
    <S.writeViewer onClick={onShowOriginPreview}>
      {previewMode && <h2>{title}</h2>}
      <div>
        <MarkDownView content={content}
                      skipHtml={false}
                      escapeHtml={false}/>
      </div>
    </S.writeViewer>
  );
};

WriteViewer.defaultProps = {
  title: '',
  content: '',
  previewMode: false,
} as WriteViewerProps;

export default WriteViewer;

const S: any = {};

S.writeViewer = styled.div`
  height: calc(100% - 4rem);
  width: calc(100% - 4rem);
  padding: 2rem;
  
  >h2{
    font-size: 3.2rem;
    font-weight: bold;
    color: ${props => props.theme.colors.mainThemeColor};
    padding-bottom: .5rem;
    border-bottom: .2rem solid ${props => props.theme.colors.customGrayColor};
    margin-bottom: 3rem;
  }
  
  >div{
    width: 100%;
    display: inline-block;
    outline-style: none;
    border: none;
    resize: none;
  }
`;