import { SingpassTypes } from './../types/index';
import { takeLatest, call, put } from "redux-saga/effects";
import Request from "../../app/api/RestClient";
import { SingpassActions } from '@redux/actions';

function* getSingpassEnv(action: any) {
  const { callback } = action?.payload;
  try {
    const res = yield call(() =>
      Request.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/singpass/getEnv`)
    );
    callback && callback(res[0]);
    yield put(SingpassActions.saveSingpassData(res[0]));
  } catch (error) {
    callback && callback(error?.response?.data);
    console.log("getSingpassEnv._error: ", error?.response?.data);
  }
}

function* getSingpassPersonalInformation(action: any) {
  const { callback, code } = action?.payload;
  try {
    const res = yield call(() =>
      Request.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/singpass/getPersonData?code=${code}`)
    );

    callback && callback(res[0]);
    yield put(SingpassActions.savePersonalInformation(res[0]?.text));
  } catch (error) {
    callback && callback(error?.response?.data);
    console.log("getSingpassPersonalInformation._error: ", error?.response?.data);
  }
}

export default function* singpassSaga() {
  yield takeLatest(SingpassTypes.GET_ENV, getSingpassEnv);
  yield takeLatest(SingpassTypes.GET_INFORMATION, getSingpassPersonalInformation);
}
