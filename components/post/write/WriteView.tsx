import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

import WriteEditorContainer from '../../../containers/WriteEditorContainer';
import WriteViewContainer from '../../../containers/WriteViewContainer';
import WriteHeaderContainer from '../../../containers/WriteHeaderContainer';
import mixins from '../../../style/mixins';
import colors from '../../../style/colors';
import layouts from '../../../style/layouts';

type WriteViewProps = {
  previewMode: boolean;
  contentPosition: number;
}

function WriteView({
                     previewMode,
                     contentPosition,
                   }: WriteViewProps) {

  const ViewerRef = useRef(null);

  useEffect(() => {
    const isLastScrollArea = contentPosition >= 97;
    if (isLastScrollArea) {
      ViewerRef.current.scrollTop = ViewerRef.current.scrollHeight;
    }
  }, [contentPosition]);

  const renderEditor = !previewMode &&
    <S.WriteViewEditor>
      <WriteEditorContainer/>
    </S.WriteViewEditor>;

  const renderHeader = !previewMode &&
    <S.WriteViewHeader>
      <WriteHeaderContainer/>
    </S.WriteViewHeader>;

  return (
    <S.WriteView>
      {renderHeader}
      <S.WriteViewContent>
        {renderEditor}
        <S.WriteViewPreview isPreviewMode={previewMode} ref={ViewerRef}>
          <WriteViewContainer/>
        </S.WriteViewPreview>
      </S.WriteViewContent>
    </S.WriteView>
  );
};

WriteView.defaultProps = {
  previewMode: false,
  contentPosition: 0,
} as WriteViewProps;

export default WriteView;

const S: any = {};

S.WriteView = styled.div`
  display: flex;
  height:100%;
  flex-direction: column;
`;

S.WriteViewHeader = styled.div`
  width: 100%;
  height: ${layouts.mainHeaderHeight};
  border-bottom: .2rem solid ${colors.customGrayColor};
  display: flex;
  justify-content: space-between;
`;

S.WriteViewContent = styled.div`
  display: flex;
  height: calc(100% - 6rem);
`;

S.WriteViewEditor = styled.div`
  ${mixins.viewer};
  border-right: .1rem solid ${colors.customGrayColor};
`;

S.WriteViewPreview = styled.div`
  ${mixins.viewer};
  cursor: pointer;
  text-align: left;
  
  ${({isPreviewMode}) => isPreviewMode && css`
    display: flex;
    justify-content: center;
    width: 100rem;
    min-width: 100rem;
    margin-left: auto;
    margin-right: auto;
  `}
 
`;


