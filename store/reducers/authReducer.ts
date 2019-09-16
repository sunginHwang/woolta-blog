import { createReducer, createStandardAction } from 'typesafe-actions';
import { produce } from 'immer';
import { IUserInfo } from '../../types/user/IUserInfo';
import IAsyncAction from '../../types/redux/IAsyncAction';
import { asyncActionTypeCreator } from '../../core/utils/reduxUtil';
import { AxiosResponse } from 'axios';
import { FluxStandardAction } from 'redux-promise-middleware';

const prefix: string = 'AUTH_';

// 로그인
export const LOGIN: IAsyncAction = asyncActionTypeCreator(`${prefix}LOGIN`);
export const login = createStandardAction(LOGIN.INDEX)<Promise<AxiosResponse<any>>>();

// 로그아웃
export const LOGOUT = `${prefix}LOGOUT`;
export const logout = createStandardAction(LOGOUT)<void>();

export const LOAD_AUTH_INFO: IAsyncAction = asyncActionTypeCreator(`${prefix}LOAD_AUTH_INFO`);
export const loadAuthInfo = createStandardAction(LOAD_AUTH_INFO.INDEX)<Promise<AxiosResponse<IUserInfo>>>();



export interface authInitType {
  authInfo: IUserInfo
}

const initialState: authInitType = {
  authInfo: {
    no: 0,
    userId: '',
    imageUrl: '',
    authToken: '',
  },
};

export default createReducer(initialState, {
  [LOGIN.FULFILLED]: (state, action: FluxStandardAction) =>
    produce<authInitType>(state, draft => {
      draft.authInfo = action.payload.data.data;
    }),
  [LOGIN.REJECTED]: (state) =>
    produce<authInitType>(state, draft => {
      draft.authInfo = initialState.authInfo;
    }),
  [LOGOUT]: (state) =>
    produce<authInitType>(state, draft => {
      draft.authInfo = initialState.authInfo;
    }),
  [LOAD_AUTH_INFO.FULFILLED]: (state, action: FluxStandardAction) =>
    produce<authInitType>(state, draft => {
      draft.authInfo = action.payload.data.data;
    }),
  [LOAD_AUTH_INFO.REJECTED]: (state) =>
    produce<authInitType>(state, draft => {
      draft.authInfo = initialState.authInfo;
    }),
});


