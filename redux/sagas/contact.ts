import { takeLatest, call, put } from "redux-saga/effects";
import { ContactTypes } from "../types";
import Request from "../../app/api/RestClient";

function* postContactForm(action: any) {
    const { callback, data } = action?.payload;
    const token = localStorage.getItem("accessToken");
    try {
        const res = yield call(() =>
            Request.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/contacts`, data.data, token)
        );
        callback && callback(res[0]?.data);
    } catch (error) {
        callback && callback(error[1]?.response?.data?.message?.[0]);
        console.log("postContact._error: ", error[1]?.response?.data?.message);
    }
}

export default function* postContactFormSaga() {
    yield takeLatest(ContactTypes.POST_CONTACT_FORM, postContactForm);
}