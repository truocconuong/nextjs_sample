import { takeLatest, call, put } from "redux-saga/effects";
import { CategoryActions } from "../actions";
import { CategoryTypes, MasterDataTypes } from "../types";
import Request from "../../app/api/RestClient";

function* getCategoryData(action: any) {
  const { callback, token } = action?.payload;
  try {
    const res = yield call(() =>
      Request.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/detail/categories`,
        null,
        token
      )
    );
    callback && callback(res[0]?.data);
    yield put(CategoryActions.saveCategoriesData(res[0]?.data));
  } catch (error) {
    callback && callback(error);
    console.log("getCategoryData._error: ", error?.response?.data);
  }
}

export default function* categorySaga() {
  yield takeLatest(CategoryTypes.GET_CATEGORY_DATA, getCategoryData);
}
