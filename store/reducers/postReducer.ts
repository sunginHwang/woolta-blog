import { createReducer, createStandardAction } from 'typesafe-actions';
import { apiRequestThunk, asyncActionTypeCreator } from '../../core/utils/reduxUtil';
import { FluxStandardAction } from 'redux-promise-middleware';

import { produce } from 'immer';
import IAsyncAction from '../../types/redux/IAsyncAction';
import { IPost } from '../../types/post/IPost';
import { delPost, fetchPostInfo } from '../../core/api/blogApi';

const prefix: string = 'POST_';

const GET_POST: IAsyncAction = asyncActionTypeCreator(`${prefix}GET_POST`);
const DELETE_POST: IAsyncAction = asyncActionTypeCreator(`${prefix}DELETE_POST`);
const POST_INFO_INITIALIZE: string = `${prefix}POST_INFO_INITIALIZE`;
const MODIFY_POST: string = `${prefix}MODIFY_POST`;

export const modifyPost = createStandardAction(MODIFY_POST)<void>();
export const postInfoInitialize = createStandardAction(POST_INFO_INITIALIZE)<void>();
export const getPost = apiRequestThunk(GET_POST, fetchPostInfo);
export const deletePost = apiRequestThunk(DELETE_POST, delPost);


export interface postInitType {
  post: IPost;
  loading: boolean
}

const initialState: postInitType = {
  post: {
    postNo: 0,
    title: '',
    content: '',
    writer: {
      no: 0,
      nickName: '',
      imageUrl: '',
    },
    authorNo: '',
    categoryLabel: '',
    createdAt: '',
  },
  loading: false,
};

export default createReducer(initialState, {
  [GET_POST.PENDING]: (state) =>
    produce<postInitType>(state, draft => {
      draft.loading = true;
    }),
  [GET_POST.SUCCESS]: (state, action: FluxStandardAction) =>
    produce<postInitType>(state, draft => {
      draft.loading = false;
      draft.post = action.payload;
    }),
  [GET_POST.FAILURE]: (state) =>
    produce<postInitType>(state, draft => {
      draft.loading = false;
      draft.post = initialState.post;
    }),
  [DELETE_POST.PENDING]: (state) =>
    produce<postInitType>(state, draft => {
      draft.loading = true;
    }),
  [DELETE_POST.SUCCESS]: (state) =>
    produce<postInitType>(state, draft => {
      draft.loading = false;
      draft.post = initialState.post;
    }),
  [DELETE_POST.FAILURE]: (state) =>
    produce<postInitType>(state, draft => {
      draft.loading = false;
    }),
  [POST_INFO_INITIALIZE]: (state) =>
    produce<postInitType>(state, draft => {
      draft.post = initialState.post;
    }),
});





