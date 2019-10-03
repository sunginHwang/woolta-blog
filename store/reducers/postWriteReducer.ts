import { produce } from 'immer';
import { createReducer, createStandardAction } from 'typesafe-actions';
import { FluxStandardAction } from 'redux-promise-middleware';
import { ICategory } from '../../types/post/ICategory';

const prefix: string = 'POST_WRITE_';


const SETTING_POST_INFO: string = `${prefix}SETTING_POST_INFO`;
const SET_TITLE: string = `${prefix}SET_TITLE`;
const SET_CONTENT: string = `${prefix}SET_CONTENT`;
const SET_CATEGORY: string = `${prefix}SET_CATEGORY`;
const SET_CONTENT_WRITE_INDEX: string = `${prefix}SET_CONTENT_WRITE_INDEX`;
const TOGGLE_ORIGIN_PREVIEW_MODE: string = `${prefix}TOGGLE_ORIGIN_PREVIEW_MODE`;
const TOGGLE_ERROR: string = `${prefix}TOGGLE_ERROR`;
const INIT_POST_WRITE: string = `${prefix}INIT_POST_WRITE`;

interface settingPostInfoFn {
  postNo: number;
  title: string;
  content: string;
  category: any
}

export const settingPostInfo = createStandardAction(SETTING_POST_INFO)<settingPostInfoFn>();
export const setTitle = createStandardAction(SET_TITLE)<string>();
export const setContentWriteIndex = createStandardAction(SET_CONTENT_WRITE_INDEX)<number>();
export const setContent = createStandardAction(SET_CONTENT)<string>();
export const setCategory = createStandardAction(SET_CATEGORY)<ICategory>();
export const initPostWrite = createStandardAction(INIT_POST_WRITE)<void>();
export const toggleOriginPreviewMode = createStandardAction(TOGGLE_ORIGIN_PREVIEW_MODE)<boolean>();
// 임시 에러 처리 방법
export const toggleError = createStandardAction(TOGGLE_ERROR)<boolean>();

export interface PostWriteInitType {
  postNo: number;
  category: any;
  title: string;
  content: string;
  contentWriteIndex: number;
  error: boolean;
  errorMsg: string;
  previewMode: boolean;
}

const initialState: PostWriteInitType = {
  postNo: 0,
  category: null,
  title: '',
  content: '',
  contentWriteIndex: 0,
  error: false,
  errorMsg: '',
  previewMode: false,
};


export default createReducer(initialState, {
  [SETTING_POST_INFO]: (state, action: FluxStandardAction) =>
    produce<PostWriteInitType>(state, draft => {
      draft.postNo = action.payload.postNo;
      draft.category = action.payload.category;
      draft.title = action.payload.title;
      draft.content = action.payload.content;
    }),
  [INIT_POST_WRITE]: (state, action: FluxStandardAction) =>
    produce<PostWriteInitType>(state, draft => {
      draft.postNo = initialState.postNo;
      draft.category = initialState.category;
      draft.title = initialState.title;
      draft.content = initialState.content;
    }),
  [SET_CATEGORY]: (state, action: FluxStandardAction) =>
    produce<PostWriteInitType>(state, draft => {
      draft.category = action.payload;
    }),
  [SET_TITLE]: (state, action: FluxStandardAction) =>
    produce<PostWriteInitType>(state, draft => {
      draft.title = action.payload;
    }),
  [SET_CONTENT]: (state, action: FluxStandardAction) =>
    produce<PostWriteInitType>(state, draft => {
      draft.content = action.payload;
    }),
  [SET_CONTENT_WRITE_INDEX]: (state, action: FluxStandardAction) =>
    produce<PostWriteInitType>(state, draft => {
      draft.contentWriteIndex = action.payload;
    }),
  [TOGGLE_ERROR]: (state, action: FluxStandardAction) =>
    produce<PostWriteInitType>(state, draft => {
      draft.error = action.payload;
    }),
  [TOGGLE_ORIGIN_PREVIEW_MODE]: (state, action: FluxStandardAction) =>
    produce<PostWriteInitType>(state, draft => {
      draft.previewMode = action.payload;
    }),
});
