import { createReducer, createStandardAction } from 'typesafe-actions';
import { produce } from 'immer';
import { IUserInfo } from '../../types/user/IUserInfo';
import IAsyncAction from '../../types/redux/IAsyncAction';
import { apiRequestThunk, asyncActionTypeCreator } from '../../core/utils/reduxUtil';
import { FluxStandardAction } from 'redux-promise-middleware';
import { fetchUserInfo, userLogin } from '../../core/api/AuthApi';

const prefix: string = 'AUTH_';

// 로그인
export const LOGIN: IAsyncAction = asyncActionTypeCreator(`${prefix}LOGIN`);
export const login = apiRequestThunk(LOGIN, userLogin);

// 로그아웃
export const LOGOUT = `${prefix}LOGOUT`;
export const logout = createStandardAction(LOGOUT)<void>();

export const LOAD_USER_INFO: IAsyncAction = asyncActionTypeCreator(`${prefix}LOAD_USER_INFO`);
export const loadUserInfo = apiRequestThunk(LOAD_USER_INFO, fetchUserInfo);



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
  [LOGIN.SUCCESS]: (state, action: FluxStandardAction) =>
    produce<authInitType>(state, draft => {
      draft.userInfo = action.payload;
    }),
  [LOGIN.FAILURE]: (state) =>
    produce<authInitType>(state, draft => {
      draft.userInfo = initialState.userInfo;
    }),
  [LOGOUT]: (state) =>
    produce<authInitType>(state, draft => {
      draft.userInfo = initialState.userInfo;
    }),
  [LOAD_USER_INFO.SUCCESS]: (state, action: FluxStandardAction) =>
    produce<authInitType>(state, draft => {
      draft.userInfo = action.payload;
    }),
  [LOAD_USER_INFO.FAILURE]: (state) =>
    produce<authInitType>(state, draft => {
      draft.userInfo = initialState.userInfo;
    }),
});


