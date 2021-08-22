import { takeLatest, call, put } from "redux-saga/effects";
import { StartYourWill } from "../types";
import Request from "../../app/api/RestClient";
import { NotificationWarning } from "@generals/Notifications";

function* signUpEmail(action: any) {
  const { data, callback } = action?.payload;
  try {
    const res = yield call(() =>
      Request.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/guest`,
        data
      )
    );
    callback && callback({ success: true, data: res?.data });
  } catch (error) {
    callback && callback({ success: false, data: error });
    NotificationWarning(error[2]);
    console.log("userSingUpError: ", error);
  }
}

function* sendOTP(action: any) {
  const { data, callback } = action?.payload;
  try {
    const res = yield call(() =>
      Request.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/send-otp`,
        data
      )
    );
    callback && callback({ success: true, data: res?.data });
  } catch (error) {
    callback && callback({ success: false, data: error });
    console.log("sendOTPError: ", error);
  }
}

function* verifyOTP(action: any) {
  const { data, callback } = action?.payload;
  try {
    const res = yield call(() =>
      Request.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify-otp`,
        data
      )
    );
    callback && callback({ success: true, data: res[0]?.data });
  } catch (error) {
    callback && callback({ success: false, data: error });
    console.log("verifyOTPError: ", error);
  }
}

export default function* startYourWillSaga() {
  yield takeLatest(StartYourWill.SIGN_UP_EMAIL, signUpEmail);
  yield takeLatest(StartYourWill.SEND_OTP, sendOTP);
  yield takeLatest(StartYourWill.VERIFY_OTP, verifyOTP);
}
