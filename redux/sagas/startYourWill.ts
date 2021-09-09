import { takeLatest, call, put } from "redux-saga/effects";
import { StartYourWill } from "../types";
import Request from "../../app/api/RestClient";
import { NotificationWarning } from "@generals/notifications";
import {
  setDoneCreateAcc,
  setPathDownload,
} from "@redux/actions/startYourWill";

function* signUpEmail(action: any) {
  const { data, callback } = action?.payload;
  try {
    const res = yield call(() =>
      Request.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/guest`,
        data
      )
    );
    yield put(setDoneCreateAcc(true));
    callback && callback({ success: true, data: res[0]?.data });
  } catch (error) {
    callback && callback({ success: false, data: error });
    NotificationWarning(error?.message || "bad request");
    console.log("userSingUpError: ", error);
  }
}

function* sendOTP(action: any) {
  const { data, callback } = action?.payload;
  try {
    const res = yield call(() =>
      Request.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/send-otp`, {
        ...data,
        type: "SIGNUP",
      })
    );
    callback && callback({ success: true, data: res?.data });
  } catch (error) {
    const { message } = error;
    callback && callback({ success: false, data: error });
    NotificationWarning(message || "bad request");
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
    NotificationWarning(error?.message || "bad request");
  }
}

function* getPromoCode(action: any) {
  const { data, callback } = action?.payload;
  try {
    const res = yield call(() =>
      Request.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/promocodes?name=${data.promoCode}`
      )
    );
    callback && callback({ success: true, data: res[0]?.data });
  } catch (error) {
    callback && callback({ success: false, data: error });
    console.log("getPromo: ", error);
    NotificationWarning(error?.message || "bad request");
  }
}

function* subscriptions(action: any) {
  const { data, callback } = action?.payload;
  const token = localStorage.getItem("accessToken");
  try {
    const res = yield call(() =>
      Request.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/subscriptions`,
        data,
        token
      )
    );
    callback && callback({ success: true, data: res[0]?.data });
  } catch (error) {
    callback && callback({ success: false, data: error });
    console.log("subscriptionsError: ", error);
    NotificationWarning(error?.message || "bad request");
  }
}

function* uploadFile(action: any) {
  const { data, callback } = action?.payload;
  const token = localStorage.getItem("accessToken");
  try {
    const res = yield call(() =>
      Request.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/upload-pdf`,
        data,
        token
      )
    );
    callback && callback({ success: true, data: res[0]?.data });
  } catch (error) {
    callback && callback({ success: false, data: error });
    console.log("uploadFileError: ", error);
    NotificationWarning(error?.message || "bad request");
  }
}

function* removeFileUpload(action: any) {
  const { callback } = action?.payload;
  const token = localStorage.getItem("accessToken");
  try {
    const res = yield call(() =>
      Request.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
        { pdf_upload_url: null },
        token
      )
    );
    callback && callback({ success: true });
  } catch (error) {
    callback && callback({ success: false });
    console.log("uploadFileUploadError: ", error);
    NotificationWarning(error?.message || "bad request");
  }
}

function* generatePDF(action: any) {
  const { callback } = action?.payload;
  const token = localStorage.getItem("accessToken");
  try {
    const res = yield call(() =>
      Request.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/generate-pdf`,
        null,
        token
      )
    );
    if (res[0]?.data) {
      yield put(setPathDownload(res[0]?.data));
    }
    callback && callback({ success: true, data: res[0]?.data });
  } catch (error) {
    callback && callback({ success: false, data: error });
    console.log("generateERROR: ", error);
    NotificationWarning(error?.message || "bad request");
  }
}

export default function* startYourWillSaga() {
  yield takeLatest(StartYourWill.SIGN_UP_EMAIL, signUpEmail);
  yield takeLatest(StartYourWill.SEND_OTP, sendOTP);
  yield takeLatest(StartYourWill.VERIFY_OTP, verifyOTP);
  yield takeLatest(StartYourWill.GET_PROMO_CODE, getPromoCode);
  yield takeLatest(StartYourWill.SUBSCRIPTIONS, subscriptions);
  yield takeLatest(StartYourWill.UPLOAD_FILE, uploadFile);
  yield takeLatest(StartYourWill.REMOVE_FILE_UPLOAD, removeFileUpload);
  yield takeLatest(StartYourWill.GENERATE_PDF, generatePDF);
}
