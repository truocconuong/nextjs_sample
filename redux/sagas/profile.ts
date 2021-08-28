import { IResponseGetProfile } from "@constant/data.interface";
import { NotificationWarning } from "@generals/notifications";
import { ProfileTypes } from "@redux/types";
import { takeLatest, call } from "redux-saga/effects";
import Request from "../../app/api/RestClient";

interface IResponse {
    statusCode: number;
    data: IResponseGetProfile;
}

function* getProfile(action: any) {
    const { callback } = action?.payload;
    const token = localStorage.getItem("accessToken");
    try {
        const res: IResponse[] = yield call(() =>
            Request.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/profile`, {}, token
            )
        );
        callback && callback({ success: true, data: res[0].data });
        console.log(res)
    } catch (error) {
        callback && callback({ success: false, data: error });
        console.log("getProfile: ", error);
    }
}

function* sendOtpProfile(action: any) {
    const { data, callback } = action?.payload;
    const token = localStorage.getItem("accessToken");

    try {
        const res = yield call(() =>
            Request.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/send-otp-confirm`,
                data,
                token
            )
        );
        callback && callback({ success: true, data: res?.data });
    } catch (error) {
        callback && callback({ success: false, data: error });
        NotificationWarning(error[2]);
        console.log("sendOTPError: ", error);
    }
}

function* verifyOtpProfile(action: any) {
    const { data, callback } = action?.payload;
    const token = localStorage.getItem("accessToken");
    try {
        const res = yield call(() =>
            Request.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify-otp-user-update-email`,
                data, token
            )
        );
        callback && callback({ success: true, data: res[0]?.data });
    } catch (error) {
        callback && callback({ success: false, data: error });
        console.log("verifyOTPError: ", error);
        NotificationWarning(error[2]);
    }
}

export default function* getProfileSaga() {
    yield takeLatest(ProfileTypes.GET_PROFILE, getProfile);
    yield takeLatest(ProfileTypes.SEND_OTP_PROFILE, sendOtpProfile);
    yield takeLatest(ProfileTypes.VERIFY_OTP_PROFILE, verifyOtpProfile);
}

