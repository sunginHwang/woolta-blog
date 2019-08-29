import { Handlers } from '../../models/redux/Handlers';
import IAsyncAction from '../../models/redux/IAsyncAction';

export function createReducer<S>(handlers: Handlers<S>, initialState: S) {
  return (state: S = initialState, action: any) => {
    const handler = handlers[action.type];
    if (!handler) return state;
    return handler(state, action);
  };
}

export const asyncActionTypeCreator = (actionName: string): IAsyncAction => {
  const asyncTypeAction: string[] = ['_PENDING', '_FULFILLED', '_REJECTED'];

  return {
    'INDEX': actionName,
    'PENDING': actionName + asyncTypeAction[0],
    'FULFILLED': actionName + asyncTypeAction[1],
    'REJECTED': actionName + asyncTypeAction[2],
  };
};