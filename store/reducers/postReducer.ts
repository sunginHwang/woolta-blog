import { createStandardAction } from 'typesafe-actions';

const prefix: string = 'LAYOUT_';

const TOGGLE_SPINNER_LOADING: string = `${prefix}TOGGLE_SPINNER_LOADING`;
const SHOW_MOBILE_HEADER: string = `${prefix}SHOW_MOBILE_HEADER`;
const TOGGLE_SIDE_BAR: string = `${prefix}TOGGLE_SIDE_BAR`;
const TOGGLE_EDIT_MODE: string = `${prefix}TOGGLE_EDIT_MODE`;
const INCREASE_COUNTER: string = `${prefix}INCREASE_COUNTER`;

export const increaseCounter = createStandardAction(INCREASE_COUNTER)<number>();
export const toggleSpinnerLoading = createStandardAction(TOGGLE_SPINNER_LOADING)<string>();
export const showMobileHeader = createStandardAction(SHOW_MOBILE_HEADER)<string>();
export const toggleSideBar = createStandardAction(TOGGLE_SIDE_BAR)<string>();
export const toggleEditMode = createStandardAction(TOGGLE_EDIT_MODE)<string>();

export type Handlers<T> = {
  [type: string]: (state: T, action: any) => T;
};


export function createReducer<S>(handlers: Handlers<S>, initialState: S) {
  return (state: S = initialState, action: any) => {
    const handler = handlers[action.type];
    if (!handler) return state;
    return handler(state, action);
  };
}

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
  [INCREASE_COUNTER]: (state, action) => {
    return { ...state, counter: state.counter + action.payload };
  },
  [SHOW_MOBILE_HEADER]: (state, action) => {
    return { ...state, spinnerLoading: action.payload };
  },
  [TOGGLE_SIDE_BAR]: (state, action) => {
    return { ...state, mobileHeader: action.payload };
  },
  [TOGGLE_EDIT_MODE]: (state, action) => {
    return { ...state, editMode: action.payload };
  },
}, initialState);
;

