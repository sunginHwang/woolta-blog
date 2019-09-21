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

export const LOAD_USER_INFO: IAsyncAction = asyncActionTypeCreator(`${prefix}LOAD_USER_INFO`);
export const loaduserInfo = createStandardAction(LOAD_USER_INFO.INDEX)<Promise<AxiosResponse<IUserInfo>>>();



export interface authInitType {
  userInfo: IUserInfo
}

const initialState: authInitType = {
  userInfo: {
    no: 0,
    userId: '',
    imageUrl: '',
    authToken: '',
  },
};

export default createReducer(initialState, {
  [LOGIN.FULFILLED]: (state, action: FluxStandardAction) =>
    produce<authInitType>(state, draft => {
      draft.userInfo = action.payload.data.data;
    }),
  [LOGIN.REJECTED]: (state) =>
    produce<authInitType>(state, draft => {
      draft.userInfo = initialState.userInfo;
    }),
  [LOGOUT]: (state) =>
    produce<authInitType>(state, draft => {
      draft.userInfo = initialState.userInfo;
    }),
  [LOAD_USER_INFO.FULFILLED]: (state, action: FluxStandardAction) =>
    produce<authInitType>(state, draft => {
      draft.userInfo = action.payload.data.data;
    }),
  [LOAD_USER_INFO.REJECTED]: (state) =>
    produce<authInitType>(state, draft => {
      draft.userInfo = initialState.userInfo;
    }),
});


