import React from 'react';
import { ThemeProvider } from 'styled-components';
import { cleanup, render } from '@testing-library/react';
import NotificationBar from './NotificationBar';
import whiteTheme from '../../../style/colors';

afterEach(cleanup);

const shallowWithTheme = component => {
  return render(<ThemeProvider theme={whiteTheme} >{component}</ThemeProvider>)
}


describe('<NotificationBar />', () => {
  it('matches snapshot', () => {
    const utils = shallowWithTheme(<NotificationBar isShow={true} message='message'/>);
    expect(utils.container).toMatchSnapshot();
  });
});

