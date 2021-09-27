import { takeLatest, call } from "redux-saga/effects";
import { UserTypes } from "../types";
import Request from "../../app/api/RestClient";
import { NotificationWarning } from "@generals/notifications";

function* updatePersonalInformation(action: any) {
  const { callback, data, token, id } = action?.payload;
  try {
    const res = yield call(() =>
      Request.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/information/${id}`,
        data,
        token
      )
    );
    callback && callback(res[0]?.data);
  } catch (error) {
    callback && callback(error?.response?.data);
    console.log("user._error: ", error);
  }
}

function* updateInforUser(action: any) {
  const { callback, data, token } = action?.payload;
  try {
    const res = yield call(() =>
      Request.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
        data,
        token
      )
    );
    callback && callback(res[0]?.data);
  } catch (error) {
    callback && callback(error?.response?.data);
    console.log("user._error: ", error?.response?.data);
  }
}

function* updatePersonaExecutor(action: any) {
  const { callback, data, token, id } = action?.payload;
  try {
    const res = yield call(() =>
      Request.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/executor/${id}`,
        data,
        token
      )
    );
    callback && callback(res[0]?.data);
  } catch (error) {
    callback && callback(error?.response?.data);
    console.log("user._error: ", error?.response?.data);
  }
}

function* createPersonaExecutor(action: any) {
  const { callback, data, token } = action?.payload;
  try {
    const res = yield call(() =>
      Request.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/executor`,
        data,
        token
      )
    );
    callback && callback(res[0]?.data);
  } catch (error) {
    callback && callback(error?.response?.data);
    console.log("user._error: ", error?.response?.data);
  }
}

function* updatePersonaBeneficiary(action: any) {
  const { callback, data, token, id } = action?.payload;
  try {
    const res = yield call(() =>
      Request.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/beneficiary/${id}`,
        data,
        token
      )
    );
    callback && callback(res[0]?.data);
  } catch (error) {
    callback && callback(error?.response?.data);
    console.log("user._error: ", error?.response?.data);
  }
}

function* createPersonaBeneficiary(action: any) {
  const { callback, data, token } = action?.payload;
  try {
    const res = yield call(() =>
      Request.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/beneficiary`,
        data,
        token
      )
    );
    callback && callback(res[0]?.data);
  } catch (error) {
    callback && callback(error?.response?.data);
    console.log("user._error: ", error?.response?.data);
  }
}

function* updatePercentBeneficiaries(action: any) {
  const { callback, data, token } = action?.payload;
  try {
    const res = yield call(() =>
      Request.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/beneficiary/percent`,
        data,
        token
      )
    );
    callback && callback(res[0]?.data);
  } catch (error) {
    callback && callback(error?.response?.data);
    console.log("user._error: ", error?.response?.data);
  }
}

function* signIn(action: any) {
  const { callback, data, token } = action?.payload;
  try {
    const res = yield call(() =>
      Request.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/send-otp`,
        data,
        token
      )
    );
    callback && callback(res[0]?.data);
  } catch (error) {
    callback && callback(error?.response?.data);
    console.log("user.error: ", error?.response?.data);
  }
}

function* verifyOtp(action: any) {
  const { callback, data } = action?.payload;
  try {
    const res = yield call(() =>
      Request.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify-otp`,
        data
      )
    );
    callback && callback(res[0]?.data);
  } catch (error) {
    NotificationWarning(error?.message);
    callback && callback(error?.response?.data);
    console.log("user.error: ", error?.response?.data);
  }
}

function* updateLodgeWill(action: any) {
  const { callback, data, token } = action?.payload;
  try {
    const res = yield call(() =>
      Request.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
        data,
        token
      )
    );
    callback && callback(res[0]?.data);
  } catch (error) {
    callback && callback(error && error[1]?.response?.data?.message && error[1]?.response?.data?.message[0]);
    console.log("user.error: ", error);
  }
}

export default function* userSaga() {
  yield takeLatest(UserTypes.UPDATE_PERSONAL_INFORMATION, updatePersonalInformation);
  yield takeLatest(UserTypes.UPDATE_PERSONAL_EXECUTOR, updatePersonaExecutor);
  yield takeLatest(UserTypes.DELETE_PERSONAL_EXECUTOR, updatePersonaExecutor);
  yield takeLatest(UserTypes.CREATE_PERSONAL_EXECUTOR, createPersonaExecutor);
  yield takeLatest(UserTypes.UPDATE_PERSONAL_BENEFICIARY, updatePersonaBeneficiary);
  yield takeLatest(UserTypes.DELETE_PERSONAL_BENEFICIARY, updatePersonaBeneficiary);
  yield takeLatest(UserTypes.CREATE_PERSONAL_BENEFICIARY, createPersonaBeneficiary);
  yield takeLatest(UserTypes.UPDATE_PERCENT_BENEFICIARIES, updatePercentBeneficiaries);
  yield takeLatest(UserTypes.UPDATE_INFOR_USER, updateInforUser);
  yield takeLatest(UserTypes.SIGN_IN, signIn);
  yield takeLatest(UserTypes.VERIFY_USER_OTP, verifyOtp);
  yield takeLatest(UserTypes.UPDATE_LODGE_WILL, updateLodgeWill);

}

