import * as React from 'react';
import cn from './IntroPage.scss';

const IntroPage: React.FC<{}> = () => (
  <div className={cn.introPage}>
    <p className={cn.introPage__title}>
      방문해주셔서 감사합니다.<br/>
      개발과정을 공유하는 블로그 입니다.<br/><br/>
      feat. 에비츄가 너무나 귀여운 한 고독한 개발자.....
    </p>
  </div>
);

export default IntroPage;