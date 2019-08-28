import { createStandardAction } from 'typesafe-actions';
import { createReducer } from '../../core/util/reduxUtil';

import { produce } from 'immer';
import { IUserInfo } from '../../models/user/IUserInfo';

const prefix: string = 'AUTH_';

// 로그아웃
export const LOGOUT = `${prefix}LOGOUT`;
export const logout = createStandardAction(LOGOUT)<void>();


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

export default createReducer({
  [LOGOUT]: (state) =>
    produce<authInitType>(state, draft => {
      draft.authInfo = initialState.authInfo;
    }),
}, initialState);


