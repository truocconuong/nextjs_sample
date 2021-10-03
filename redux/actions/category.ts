import {IBeneficiary, IData, IExecutor} from "@constant/data.interface";
import {CategoryTypes, PersonalTypes} from "../types";
import {DataFormInput as DataPersonal} from "@module/PersonalFormInput";
export const getCategoriesData = (token: string, callback?: any) => {
  return {
    type: CategoryTypes.GET_CATEGORY_DATA,
    payload: {token, callback},
  };
};

export const saveCategoriesData = (data: IData) => {
  return {
    type: CategoryTypes.SAVE_CATEGORY_DATA,
    payload: {data},
  };
};

export const setPersonalInformation = (data: DataPersonal, callback) => {
  return {
    type: PersonalTypes.SET_PERSONAL_INFORMATION,
    payload: {
      data,
      callback,
    },
  };
};

export const setExecutor = (data: IExecutor[], callback) => {
  return {
    type: PersonalTypes.SET_EXECUTOR,
    payload: {
      data,
      callback,
    },
  };
};

export const setBeneficiary = (data: IBeneficiary[], callback) => {
  return {
    type: PersonalTypes.SET_BENEFICIARY,
    payload: {
      data,
      callback,
    },
  };
};


export const resetCategoryData = () => {
  return {
    type: PersonalTypes.RESET_CATEGORY_DATA,
    payload: {
    },
  };
};
