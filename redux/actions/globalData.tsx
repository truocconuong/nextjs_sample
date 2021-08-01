import { DataFormInput as  DataPersonal} from "@module/PersonalFormInput";
import { DataFormInput as DataBeneficiary } from "@module/BeneficiaryFormInput";
import { DataFormInput as DataExecutor } from "@module/ExecutorFormInput";
import { PersonalEstatesListingTypes } from "../types";
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
        type: PersonalEstatesListingTypes.SET_PERSONAL_INFORMATION,
        payload: {
            data,
            callback
        }
    }
}

export const setExecutor = (data: IExecutor[], callback) => {
    return { 
        type: PersonalEstatesListingTypes.SET_EXECUTOR,
        payload: {
            data,
            callback
        }
    }
}

export const setBeneficiary = (data: IBeneficiary[], callback) => {
    return { 
        type: PersonalEstatesListingTypes.SET_BENEFICIARY,
        payload: {
            data,
            callback
        }
    }
}