import IAsyncAction from '../../types/redux/IAsyncAction';
import { AxiosResponse } from 'axios';
import { IApiRes } from '../../types/api/IApiRes';

// saga 도입 변경 고려
export const asyncActionTypeCreator = (actionName: string): IAsyncAction => {
  const asyncTypeAction: string[] = ['_PENDING', '_SUCCESS', '_FAILURE'];

  return {
    'PENDING': actionName + asyncTypeAction[0],
    'SUCCESS': actionName + asyncTypeAction[1],
    'FAILURE': actionName + asyncTypeAction[2],
  };
};

export const apiRequestThunk = (types: IAsyncAction, axiosApiRequest: any) => (params?: any) => async dispatch => {
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
  }
};

/*



import {AsyncActionCreatorBuilder, createAsyncAction} from "typesafe-actions";
import {put, call} from 'redux-saga/effects';

type TAsyncAction = {
  REQUEST: string,
  SUCCESS?: string,
  FAILURE?: string,
}

export const asyncAction = <T, P, J>(asyncAction: TAsyncAction) => {
  return createAsyncAction(asyncAction.REQUEST,
    asyncAction.SUCCESS,
    asyncAction.FAILURE,
  )<T, P, J>();
}



export const asyncActionCreator = (actionName: string): TAsyncAction => {
  const asyncTypeAction: string[] = ['_REQUEST', '_SUCCESS', '_FAILURE'];

  return {
    'REQUEST': actionName + asyncTypeAction[0],
    'SUCCESS': actionName + asyncTypeAction[1],
    'FAILURE': actionName + asyncTypeAction[2],
  };
};

type TPromiseCreatorFunction<P, T> = ((payload: P) => Promise<T>) | (() => Promise<T>);

export default function createAsyncSaga<RequestType, RequestPayload, SuccessType, SuccessPayload, FailureType, FailurePayload>(
  asyncAction: AsyncActionCreatorBuilder<[RequestType, [RequestPayload, undefined]],
    [SuccessType, [SuccessPayload, undefined]],
    [FailureType, [FailurePayload, undefined]]>,
  asyncFunction: TPromiseCreatorFunction<RequestPayload, SuccessPayload>,
  successFunc?: any, failureFunc?: any) {

  return function* saga(action: ReturnType<typeof asyncAction.request>) {
    try {
      const result: SuccessPayload = yield call(asyncFunction, (action as any).payload);
      yield put(asyncAction.success(result));
      if (successFunc) {
        yield call(successFunc, result);
      }
    } catch (e) {
      yield put(asyncAction.failure(e));
      if (failureFunc) {
        yield call(successFunc, e);
      }
    }

  }

}
*/

