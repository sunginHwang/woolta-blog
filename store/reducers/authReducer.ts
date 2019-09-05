import { createReducer, createStandardAction } from 'typesafe-actions';
import { produce } from 'immer';
import { IUserInfo } from '../../models/user/IUserInfo';
import IAsyncAction from '../../models/redux/IAsyncAction';
import { asyncActionTypeCreator } from '../../core/util/reduxUtil';
import { AxiosResponse } from 'axios';
import { FluxStandardAction } from 'redux-promise-middleware';
import { settingAccessHeaderToken } from '../../core/util/apiCall';
import { ACCESS_TOKEN } from '../../core/constants';

const prefix: string = 'AUTH_';

// 로그인
export const LOGIN: IAsyncAction = asyncActionTypeCreator(`${prefix}LOGIN`);
export const login = createStandardAction(LOGIN.INDEX)<Promise<AxiosResponse<any>>>();

// 로그아웃
export const LOGOUT = `${prefix}LOGOUT`;
export const logout = createStandardAction(LOGOUT)<void>();

export const CHANGE_LOGIN_INPUT = `${prefix}CHANGE_LOGIN_INPUT`;
export const changeLoginInput = createStandardAction(CHANGE_LOGIN_INPUT)<any>();


export interface authInitType {
  id: string,
  password: string,
  authInfo: IUserInfo
}

const initialState: authInitType = {
  id: '',
  password: '',
  authInfo: {
    no: 0,
    userId: '',
    imageUrl: '',
    authToken: '',
  },
};

export default createReducer(initialState, {
  [CHANGE_LOGIN_INPUT]: (state, action) =>
    produce<authInitType>(state, draft => {
      const { type, value } = action.payload;

      if (type === 'id') {
        draft.id = value;
      }

      if (type === 'password') {
        draft.password = value;
      }
    }),

  [LOGIN.FULFILLED]: (state, action: FluxStandardAction) =>
    produce<authInitType>(state, draft => {
      draft.authInfo = action.payload.data.data;
      localStorage.setItem(ACCESS_TOKEN, draft.authInfo.authToken);
      settingAccessHeaderToken(draft.authInfo.authToken);
    }),
  [LOGIN.REJECTED]: (state) =>
    produce<authInitType>(state, draft => {
      draft.authInfo = initialState.authInfo;
    }),
  [LOGOUT]: (state) =>
    produce<authInitType>(state, draft => {
      draft.authInfo = initialState.authInfo;
    }),
});


