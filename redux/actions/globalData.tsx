import { DataFormInput as  DataPersonal} from "@module/PersonalFormInput";
import { PersonalEstatesListingTypes, PersonalTypes } from "../types";
import { IBeneficiary, IExecutor } from "@constant/data.interface";

export const setProperty = (data, callback) => {
    return { 
        type: PersonalEstatesListingTypes.SET_PROPERTY,
        payload: {
            data,
            callback
        }
    }
}

export const setPersonalInformation = (data: DataPersonal, callback) => {
    return { 
        type: PersonalTypes.SET_PERSONAL_INFORMATION,
        payload: {
            data,
            callback
        }
    }
}

export const setExecutor = (data: IExecutor[], callback) => {
    return { 
        type: PersonalTypes.SET_EXECUTOR,
        payload: {
            data,
            callback
        }
    }
}

export const setBeneficiary = (data: IBeneficiary[], callback) => {
    return { 
        type: PersonalTypes.SET_BENEFICIARY,
        payload: {
            data,
            callback
        }
    }
}