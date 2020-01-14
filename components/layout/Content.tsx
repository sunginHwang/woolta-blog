import React from 'react';
import styled, { css } from 'styled-components';
import colors from '../../style/colors';

type ContentProps = {
  editMode: boolean;
  children: React.ReactNode;
}

function Content({
                   editMode,
                   children,
                 }: ContentProps) {

  return (
    <S.Content editMode={editMode}>
      <div>
        {children}
      </div>
    </S.Content>
  );
};

Content.defaultProps = {
  editMode: false,
} as ContentProps;

export default Content;

const S: any = {};

S.Content = styled.div`
  background-color: ${props => props.theme.colors.whiteColor} !important;
  
  >div{
   min-height: 100%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 100rem;
  padding: 8rem 0;
  
  ${props => props.editMode && css`

    height: calc(100% - 6.2rem);
    min-height: calc(100% - 6.2rem);
    min-width: 100%;
    margin-top: 6rem;
    padding: 0;`}
  }
`;
