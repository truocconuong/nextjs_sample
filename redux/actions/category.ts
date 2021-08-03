import { IBeneficiary, IData, IExecutor, ISetPercent } from "@constant/data.interface";
import {
  CategoryTypes,
  PersonalEstatesListingTypes,
  PersonalTypes,
} from "../types";
import { DataFormInput as DataPersonal } from "@module/PersonalFormInput";
export const getCategoriesData = (token: string) => {
  return {
    type: CategoryTypes.GET_CATEGORY_DATA,
    payload: { token },
  };
};

export const saveCategoriesData = (data: IData) => {
  return {
    type: CategoryTypes.SAVE_CATEGORY_DATA,
    payload: { data },
  };
};

export const setProperty = (data, callback) => {
  return {
    type: PersonalEstatesListingTypes.SET_PROPERTY,
    payload: {
      data,
      callback,
    },
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
