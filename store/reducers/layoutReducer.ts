import { createReducer, createStandardAction } from 'typesafe-actions';
import { produce } from 'immer';

const prefix: string = 'CATEGORY_';

const TOGGLE_SPINNER_LOADING: string = `${prefix}TOGGLE_SPINNER_LOADING`;
const SHOW_MOBILE_HEADER: string = `${prefix}SHOW_MOBILE_HEADER`;
const TOGGLE_SIDE_BAR: string = `${prefix}TOGGLE_SIDE_BAR`;
const TOGGLE_EDIT_MODE: string = `${prefix}TOGGLE_EDIT_MODE`;


export const toggleSpinnerLoading = createStandardAction(`${prefix}TOGGLE_SPINNER_LOADING`)<boolean>();
export const showMobileHeader = createStandardAction(`${prefix}SHOW_MOBILE_HEADER`)<boolean>();
export const toggleSideBar = createStandardAction(`${prefix}TOGGLE_SIDE_BAR`)<boolean>();
export const toggleEditMode = createStandardAction(`${prefix}TOGGLE_EDIT_MODE`)<boolean>();

export interface layoutInitType {
  spinnerLoading: boolean,
  sideBar: boolean,
  mobileHeader: boolean,
  editMode: boolean,
}

const initialState: layoutInitType = {
  spinnerLoading: false,
  sideBar: false,
  mobileHeader: false,
  editMode: false,
};

export default createReducer(initialState, {
  [TOGGLE_SPINNER_LOADING]: (state, action) =>
    produce<layoutInitType>(state, draft => {
      draft.spinnerLoading = action.payload;
    }),
  [SHOW_MOBILE_HEADER]: (state, action) =>
    produce<layoutInitType>(state, draft => {
      draft.mobileHeader = action.payload;
    }),
  [TOGGLE_SIDE_BAR]: (state, action) =>
    produce<layoutInitType>(state, draft => {
      draft.sideBar = action.payload;
    }),
  [TOGGLE_EDIT_MODE]: (state, action) =>
    produce<layoutInitType>(state, draft => {
      draft.editMode = action.payload;
    }),
});


