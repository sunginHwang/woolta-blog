import IAsyncAction from '../../types/redux/IAsyncAction';
import { AxiosResponse } from 'axios';
import { IApiRes } from '../../types/IApiRes';

export const asyncActionTypeCreator = (actionName: string): IAsyncAction => {
  const asyncTypeAction: string[] = ['_PENDING', '_FULFILLED', '_REJECTED'];

  return {
    'INDEX': actionName,
    'PENDING': actionName + asyncTypeAction[0],
    'FULFILLED': actionName + asyncTypeAction[1],
    'REJECTED': actionName + asyncTypeAction[2],
  };
};

export const asyncActionTypeCreator2 = (actionName: string): IAsyncAction => {
  const asyncTypeAction: string[] = ['_PENDING', '_SUCCESS', '_FAILURE'];

  return {
    'PENDING': actionName + asyncTypeAction[0],
    'SUCCESS': actionName + asyncTypeAction[1],
    'FAILURE': actionName + asyncTypeAction[2],
  };
};


export const apiRequestThunk = (types: IAsyncAction, axiosApiRequest: any) => params => async dispatch => {
  dispatch({ type: types.PENDING });

  try {
    const res: AxiosResponse<IApiRes> = await axiosApiRequest(params);
    dispatch({
      type: types.SUCCESS,
      payload: res.data.data,
    });
  } catch (e) {
    dispatch({
      type: types.FAILURE,
      payload: e,
    });
    throw e;
  }
};
