import { IBeneficiary, IExecutor, IPersonalInformation, ISetPercent, IUserInformation } from "@constant/data.interface";
import { PersonalTypes, UserTypes } from "../types";

export const updatePersonalInformation = (data: IPersonalInformation, id: string, token: string, callback?: any) => {
  return {
    type: UserTypes.UPDATE_PERSONAL_INFORMATION,
    payload: { data, id, callback, token },
  };
};

export const updateInforUser = (data: IUserInformation, token: string, callback?: any) => {
  return {
    type: UserTypes.UPDATE_INFOR_USER,
    payload: { data, callback, token },
  };
};

export const updateExecutor = (data: IExecutor, id: string, token: string, callback?: any) => {
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

export const deleteExecutor = (data: { is_delete: boolean }, id: string, token: string, callback?: any) => {
  return {
    type: UserTypes.UPDATE_PERSONAL_EXECUTOR,
    payload: { data, id, callback, token },
  };
};

export const updateBeneficiary = (data: IBeneficiary, id: string, token: string, callback?: any) => {
  return {
    type: UserTypes.UPDATE_PERSONAL_BENEFICIARY,
    payload: { data, id, callback, token },
  };
};

export const createBeneficiary = (data: IBeneficiary, token: string, callback?: any) => {
  return {
    type: UserTypes.CREATE_PERSONAL_BENEFICIARY,
    payload: { data, callback, token },
  };
};

export const deleteBeneficiary = (data: { is_delete: boolean }, id: string, token: string, callback?: any) => {
  return {
    type: UserTypes.UPDATE_PERSONAL_BENEFICIARY,
    payload: { data, id, callback, token },
  };
};

export const signIn = (data: { email: string }, callback?: any) => {
  return {
    type: UserTypes.SIGN_IN,
    payload: { data, callback },
  };
};

export const validateOtp = (data: { email: string, otp: string }, callback?: any) => {
  return {
    type: UserTypes.VERIFY_USER_OTP,
    payload: { data, callback },
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

export const updateLodgeWill = (data: { will_registry: string}, token: string, callback?: any) => {
  return {
    type: UserTypes.UPDATE_LODGE_WILL,
    payload: { data, token, callback },
  };
};
