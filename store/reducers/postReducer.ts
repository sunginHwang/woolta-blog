import { createStandardAction } from 'typesafe-actions';
import { asyncActionTypeCreator, createReducer } from '../../core/util/reduxUtil';
import { FluxStandardAction } from 'redux-promise-middleware';

import { produce } from 'immer';
import IAsyncAction from '../../models/redux/IAsyncAction';
import { AxiosResponse } from 'axios';
import { ICategory } from '../../models/post/ICategory';
import { CATEGORIES } from './categoryReducer';
import IPosts from '../../models/post/IPosts';

const prefix: string = 'LAYOUT_';

const TOGGLE_SPINNER_LOADING: string = `${prefix}TOGGLE_SPINNER_LOADING`;
const SHOW_MOBILE_HEADER: string = `${prefix}SHOW_MOBILE_HEADER`;
const TOGGLE_SIDE_BAR: string = `${prefix}TOGGLE_SIDE_BAR`;
const TOGGLE_EDIT_MODE: string = `${prefix}TOGGLE_EDIT_MODE`;
const INCREASE_COUNTER: string = `${prefix}INCREASE_COUNTER`;
const GET_SOMETHING: string = `${prefix}GET_SOMETHING`;
const GET_SOMETHING_PENDING: string = `${prefix}GET_SOMETHING_PENDING`;
const GET_SOMETHING_FULFILLED: string = `${prefix}GET_SOMETHING_FULFILLED`;
const GET_SOMETHING_REJECTED: string = `${prefix}GET_SOMETHING_REJECTED`;
const RECENT_POSTS: IAsyncAction = asyncActionTypeCreator(`${prefix}GET_RECENT_POSTS`);

export const getRecentPosts = createStandardAction(RECENT_POSTS.INDEX)<Promise<AxiosResponse<IPosts[]>>>();
export const increaseCounter = createStandardAction(INCREASE_COUNTER)<number>();
export const toggleSpinnerLoading = createStandardAction(TOGGLE_SPINNER_LOADING)<string>();
export const showMobileHeader = createStandardAction(SHOW_MOBILE_HEADER)<string>();
export const toggleSideBar = createStandardAction(TOGGLE_SIDE_BAR)<string>();
export const toggleEditMode = createStandardAction(TOGGLE_EDIT_MODE)<string>();
export const getSomething = createStandardAction(GET_SOMETHING)<any>();


export interface initType {
  spinnerLoading: boolean,
  sideBar: boolean,
  mobileHeader: boolean,
  editMode: boolean,
  counter: number;
}

const initialState: initType = {
  spinnerLoading: false,
  sideBar: false,
  mobileHeader: false,
  editMode: false,
  counter: 5,
};

export default createReducer({
  [TOGGLE_SPINNER_LOADING]: (state, action) => {
    return { ...state, sideBar: action.payload };
  },
  [INCREASE_COUNTER]: (state, action) =>
    produce<initType>(state, draft => {
      draft.counter = state.counter + action.payload;
    })
  ,
  [SHOW_MOBILE_HEADER]: (state, action) => {
    return { ...state, spinnerLoading: action.payload };
  },
  [TOGGLE_SIDE_BAR]: (state, action) => {
    return { ...state, mobileHeader: action.payload };
  },
  [TOGGLE_EDIT_MODE]: (state, action) => {
    return { ...state, editMode: action.payload };
  },
  [TOGGLE_SPINNER_LOADING]: (state, action) => {
    return { ...state, sideBar: action.payload };
  },
  [GET_SOMETHING_PENDING]: (state, action) => {
    console.log(action);
    return { ...state, sideBar: action.payload };
  },
  [GET_SOMETHING_FULFILLED]: (state: initType, action: FluxStandardAction) => {
    console.log(action);
    return { ...state, sideBar: action.payload };
  },
  [GET_SOMETHING_REJECTED]: (state, action) => {
    return { ...state, sideBar: action.payload };
  },
}, initialState);
;

