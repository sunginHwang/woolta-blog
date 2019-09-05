import IAsyncAction from '../../models/redux/IAsyncAction';

export const asyncActionTypeCreator = (actionName: string): IAsyncAction => {
  const asyncTypeAction: string[] = ['_PENDING', '_FULFILLED', '_REJECTED'];

  return {
    'INDEX': actionName,
    'PENDING': actionName + asyncTypeAction[0],
    'FULFILLED': actionName + asyncTypeAction[1],
    'REJECTED': actionName + asyncTypeAction[2],
  };
};