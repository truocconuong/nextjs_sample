import { IBeneficiary, IExecutor, IPersonalInformation, ISetPercent } from "@constant/data.interface";
import { PersonalTypes, UserTypes } from "../types";

export const updatePersonalInformation = (data: IPersonalInformation, id: string,  token: string, callback?: any) => {
  return {
    type: UserTypes.UPDATE_PERSONAL_INFORMATION,
    payload: { data, id, callback, token },
  };
};

export const updateExecutor = (data: IExecutor, id: string,  token: string, callback?: any) => {
  return {
    type: UserTypes.UPDATE_PERSONAL_EXECUTOR,
    payload: { data, id, callback, token },
  };
};

export const createExecutor = (data: IExecutor, token: string, callback?: any) => {
  return {
    type: UserTypes.CREATE_PERSONAL_EXECUTOR,
    payload: { data, callback, token },
  };
};

export const deleteExecutor = (data: {is_delete: boolean}, id: string,  token: string, callback?: any) => {
  return {
    type: UserTypes.UPDATE_PERSONAL_EXECUTOR,
    payload: { data, id, callback, token },
  };
};

export const updateBeneficiary = (data: IBeneficiary, id: string,  token: string, callback?: any) => {
  return {
    type: UserTypes.UPDATE_PERSONAL_BENEFICIARY,
    payload: { data, id, callback, token },
  };
};

export const createBeneficiary = (data: IExecutor, token: string, callback?: any) => {
  return {
    type: UserTypes.CREATE_PERSONAL_BENEFICIARY,
    payload: { data, callback, token },
  };
};

export const deleteBeneficiary = (data: {is_delete: boolean}, id: string,  token: string, callback?: any) => {
  return {
    type: UserTypes.UPDATE_PERSONAL_BENEFICIARY,
    payload: { data, id, callback, token },
  };
};

export const setPercents = (data: ISetPercent[], token: string, callback) => {
  return {
    type: UserTypes.UPDATE_PERCENT_BENEFICIARIES,
    payload: {
      data,
      token,
      callback,
    },
  };
};
