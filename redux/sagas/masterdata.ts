import { takeLatest, call, put } from "redux-saga/effects";
import { MasterDataActions } from "../actions";
import { MasterDataTypes } from "../types";
import Request from "../../app/api/RestClient";

function* getMasterData(action: any) {
  const { callback } = action?.payload;
  try {
    const res = yield call(() =>
      Request.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/masterdata`)
    );
    callback && callback(res[0]?.data);
    yield put(MasterDataActions.saveMasterData(res[0]?.data));
  } catch (error) {
    callback && callback(error?.response?.data);
    console.log("getMasterdata._error: ", error?.response?.data);
  }
}

export default function* masterdataSaga() {
  yield takeLatest(MasterDataTypes.GET_MASTER_DATA, getMasterData);
}
