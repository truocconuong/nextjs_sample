import { IResponseGetProfile } from "@constant/data.interface";
import { ProfileTypes } from "@redux/types";
import { url } from "inspector";
import { takeLatest, call, put } from "redux-saga/effects";
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

export default function* getProfileSaga() {
    yield takeLatest(ProfileTypes.GET_PROFILE, getProfile);
}