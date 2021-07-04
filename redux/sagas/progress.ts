import { takeLatest, call, put } from "redux-saga/effects";
import { ProgressActions } from "../actions";
import { ProgressTypes } from "../types";
import Request from "../../app/api/RestClient";

function* saveProgressExample(action: any) {
  const { data, token, callback } = action?.payload;
  try {
    const res = yield call(() =>
      Request.post(
        `${process.env.NEXT_PUBLIC_API_URL}/progress/save`,
        data,
        token
      )
    );
    callback && callback(res?.data);
    yield put(ProgressActions.savePercent(res?.data));
  } catch (error) {
    callback && callback(error?.response?.data);
    console.log("userLogin._error: ", error?.response?.data);
  }
}

export default function* progressSaga() {
  yield takeLatest(ProgressTypes.SAVE_PROGRESS, saveProgressExample);
}
