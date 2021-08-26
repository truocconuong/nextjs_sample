import { ProfileTypes } from "@redux/types";

export const getProfile = (callback) => {
    return {
        type: ProfileTypes.GET_PROFILE,
        payload: { callback },
    };
};