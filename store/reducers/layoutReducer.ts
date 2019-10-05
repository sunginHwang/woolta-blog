import { createReducer, createStandardAction } from 'typesafe-actions';
import { produce } from 'immer';

const prefix: string = 'CATEGORY_';

const TOGGLE_SPINNER_LOADING: string = `${prefix}TOGGLE_SPINNER_LOADING`;
const SHOW_MOBILE_HEADER: string = `${prefix}SHOW_MOBILE_HEADER`;
const TOGGLE_EDIT_MODE: string = `${prefix}TOGGLE_EDIT_MODE`;
const OPEN_TOAST: string = `${prefix}OPEN_TOAST`;
const CLOSE_TOAST: string = `${prefix}CLOSE_TOAST`;


export const toggleSpinnerLoading = createStandardAction(`${prefix}TOGGLE_SPINNER_LOADING`)<boolean>();
export const showMobileHeader = createStandardAction(`${prefix}SHOW_MOBILE_HEADER`)<boolean>();
export const toggleEditMode = createStandardAction(`${prefix}TOGGLE_EDIT_MODE`)<boolean>();
export const openToast = createStandardAction(OPEN_TOAST)<string>();
export const closeToast = createStandardAction(CLOSE_TOAST)();

export interface layoutInitType {
  spinnerLoading: boolean,
  mobileHeader: boolean,
  editMode: boolean,
  toast: {
    message: string;
    isShow: boolean;
  }
}

const initialState: layoutInitType = {
  spinnerLoading: false,
  mobileHeader: false,
  editMode: false,
  toast: {
    message: '',
    isShow: false,
  },
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
  [TOGGLE_EDIT_MODE]: (state, action) =>
    produce<layoutInitType>(state, draft => {
      draft.editMode = action.payload;
    }),
  [OPEN_TOAST]: (state, action) =>
    produce<layoutInitType>(state, draft => {
      draft.toast.message = action.payload;
      draft.toast.isShow = true;
    }),
  [CLOSE_TOAST]: state =>
    produce<layoutInitType>(state, draft => {
      draft.toast = initialState.toast;
    }),
});


