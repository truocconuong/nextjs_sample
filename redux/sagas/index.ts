import { all } from "redux-saga/effects";
import masterdataSaga from "./masterdata";
import progressSaga from "./progress";
import categorySaga from "./category";
import personalEstatesListingSaga from "./personalEstatesListing";
import userSaga from "./user";
import starYourWillSaga from "./startYourWill";

export default function* rootSaga() {
  yield all([
    progressSaga(),
    masterdataSaga(),
    categorySaga(),
    personalEstatesListingSaga(),
    userSaga(),
    starYourWillSaga(),
  ]);
}
