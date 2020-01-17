import { keyframes } from 'styled-components';

export default {
  colors: {
    mainThemeColor: 'rgba(255, 255, 255, 0.88)',
    whiteColor: '#1f1f1f',
    customGrayColor: '#3A3E46',
    sideFontGrayColor: '#c2cab9',
    titleFontColor: 'rgba(255, 255, 255, 0.88)',
    customBlackColor: 'rgba(255, 255, 255, 0.88)',
    bottomLineColor: '#53544F',
    SideBarSpaceColor: 'rgba(0,0,0,.3)',
    greyL1: '#888E8C',
    greyL2: '#eee',
    greyL3: '#72766B',
    greyL4: '#e8e8e8',
    cyanL1: '#56b6c2',
    whiteL1: '#c6cbd1',
    whiteL2: '#dfe2e5',
    whiteL3: '#f6f8fa',
    greyL5: '#666',
    greyD1: '#383838',
    greyD2: '#abb2bf',
    markdownCodeColor: '#c2cab9',
    imgOpacity: '.75',
    headerColor: '#282828',
    contentColor: '#aaa',
    loadingAnimationColor1: '#292929',
    loadingAnimationColor2: '#303030',
    loadingAnimationColor3: '#313131',
  },
  animations: {
    loading: keyframes`
      0% {
        background-color: #292929;
      }
      50% {
        background-color: #303030;
      }
      100% {
        background-color: #313131;
      }`,
  },
}
;