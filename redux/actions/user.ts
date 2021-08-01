import { IExecutor, IPersonalInformation } from "@constant/data.interface";
import { UserTypes } from "../types";

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

export const deleteExecutor = (data: {is_delete: boolean}, id: string,  token: string, callback?: any) => {
  return {
    type: UserTypes.UPDATE_PERSONAL_EXECUTOR,
    payload: { data, id, callback, token },
  };
};
