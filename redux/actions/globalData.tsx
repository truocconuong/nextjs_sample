import { PersonalEstatesListingTypes } from "../types";

export const setProperty = (data, callback) => {
    return { 
        type: PersonalEstatesListingTypes.SET_PROPERTY,
        payload: {
            data,
            callback
        }
    }
}