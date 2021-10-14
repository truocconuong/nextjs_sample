import { ISingpassGetEnv, ISingpassPersonalData } from './../../app/constants/data.interface';
import { SingpassTypes } from './../types/index';

export const getSingpassEnv = (data?: any, callback?: any) => {
  return {
    type: SingpassTypes.GET_ENV,
    payload: { data, callback },
  };
};

export const saveSingpassData = (data?: ISingpassGetEnv) => {
  return {
    type: SingpassTypes.SAVE_ENV,
    payload: {data}
  };
};

export const getPersonalInformation = (code?: string, callback?: any) => {
  return {
    type: SingpassTypes.GET_INFORMATION,
    payload: { code, callback },
  };
};

export const savePersonalInformation = (data: ISingpassPersonalData) => {
  return {
    type: SingpassTypes.SAVE_INFORMATION,
    payload: { data },
  };
};
