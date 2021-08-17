import {CategoryActions} from "@redux/actions";
import {takeLatest, call, put} from "redux-saga/effects";
import Request from "../../app/api/RestClient";
import {PersonalEstatesListingTypes} from "../types";

function* createProperty(action: any) {
  const {data, callback} = action?.payload;
  const token = localStorage.getItem("accessToken");
  try {
    const res = yield call(() =>
      Request.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/property`,
        {...data},
        token
      )
    );
    if (res[0]?.data) {
      yield put(CategoryActions.getCategoriesData(token));
    }
  } catch (error) {
    callback && callback(error?.response?.data);
    console.log("createProperty._error: ", error?.response?.data);
  }
}

function* updateProperty(action: any) {
  const {id, data, callback} = action?.payload;
  const token = localStorage.getItem("accessToken");
  try {
    const res = yield call(() =>
      Request.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/property/${id}`,
        {...data},
        token
      )
    );
    if (res[0]?.data) {
      yield put(CategoryActions.getCategoriesData(token));
    }
  } catch (error) {
    callback && callback(error?.response?.data);
    console.log("updateProperty._error: ", error?.response?.data);
  }
}

function* createBankAccount(action: any) {
  const {data, callback} = action?.payload;
  const token = localStorage.getItem("accessToken");
  try {
    const res = yield call(() =>
      Request.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/bank-account`,
        {...data},
        token
      )
    );
    if (res[0]?.data) {
      yield put(CategoryActions.getCategoriesData(token));
    }
  } catch (error) {
    callback && callback(error?.response?.data);
    console.log("createBankAccount._error: ", error?.response?.data);
  }
}

function* updateBankAccount(action: any) {
  const {id, data, callback} = action?.payload;
  const token = localStorage.getItem("accessToken");
  try {
    const res = yield call(() =>
      Request.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/bank-account/${id}`,
        {...data},
        token
      )
    );
    if (res[0]?.data) {
      yield put(CategoryActions.getCategoriesData(token));
    }
  } catch (error) {
    callback && callback(error?.response?.data);
    console.log("updateBankAccount._error: ", error?.response?.data);
  }
}

function* createInsurancePolicy(action: any) {
  const {data, callback} = action?.payload;
  const token = localStorage.getItem("accessToken");
  try {
    const res = yield call(() =>
      Request.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/insurance-policy`,
        {...data},
        token
      )
    );
    if (res[0]?.data) {
      yield put(CategoryActions.getCategoriesData(token));
    }
  } catch (error) {
    callback && callback(error?.response?.data);
    console.log("createInsurancePolicy._error: ", error?.response?.data);
  }
}

function* updateInsurancePolicy(action: any) {
  const {id, data, callback} = action?.payload;
  const token = localStorage.getItem("accessToken");
  try {
    const res = yield call(() =>
      Request.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/insurance-policy/${id}`,
        {...data},
        token
      )
    );
    if (res[0]?.data) {
      yield put(CategoryActions.getCategoriesData(token));
    }
  } catch (error) {
    callback && callback(error?.response?.data);
    console.log("updateInsurancePolicy._error: ", error?.response?.data);
  }
}

export default function* personalEstatesListingSaga() {
  yield takeLatest(PersonalEstatesListingTypes.CREATE_PROPERTY, createProperty);
  yield takeLatest(PersonalEstatesListingTypes.UPDATE_PROPERTY, updateProperty);
  yield takeLatest(
    PersonalEstatesListingTypes.CREATE_BANK_ACCOUNT,
    createBankAccount
  );
  yield takeLatest(
    PersonalEstatesListingTypes.UPDATE_BANK_ACCOUNT,
    updateBankAccount
  );
  yield takeLatest(
    PersonalEstatesListingTypes.CREATE_INSURANCE_POLICY,
    createInsurancePolicy
  );
  yield takeLatest(
    PersonalEstatesListingTypes.UPDATE_INSURANCE_POLICY,
    updateInsurancePolicy
  );
}
