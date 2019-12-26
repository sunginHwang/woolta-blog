import React from 'react';
import styled from 'styled-components';
import layouts from '../../style/layouts';
import colors from '../../style/colors';

type IntroPageProps = {};

function IntroPage({}: IntroPageProps) {
  return (
    <S.IntroPage>
      <p>
        방문해주셔서 감사합니다.<br/>
        개발과정을 공유하는 블로그 입니다.<br/><br/>
        feat. 에비츄가 너무나 귀여운 한 고독한 개발자.....
      </p>
    </S.IntroPage>
  );
};

export default IntroPage;

const S: any = {};

S.IntroPage = styled.div`
  max-width: ${layouts.contentMaxWidth};
  margin: 0 auto;

  @media screen and (max-width: ${layouts.mobileWidth}) {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  p {
    font-size: 2.08rem;
    width: 100%;
    color: ${colors.whiteColor};
    background-color: ${colors.mainThemeColor};
    line-height: 3.12rem;
    font-weight: bold;
    text-align: left;
    border: 1px solid #6e827f;
    padding: 2.7rem;
    border-radius: .8rem;
    margin-bottom: 4.16rem;

    @media screen and (max-width: ${layouts.mobileWidth}) {
      display: none;
    }
  }
`;