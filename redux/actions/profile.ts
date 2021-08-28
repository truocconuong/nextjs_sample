import { ProfileTypes } from "@redux/types";

export const getProfile = (callback) => {
    return {
        type: ProfileTypes.GET_PROFILE,
        payload: { callback },
    };
};

export const sendOtpProfile = (data, callback) => {
    return {
        type: ProfileTypes.SEND_OTP_PROFILE,
        payload: { data, callback },
    };
};

export const verifyOtpProfile = (data, callback) => {
    return {
        type: ProfileTypes.VERIFY_OTP_PROFILE,
        payload: { data, callback },
    };
};