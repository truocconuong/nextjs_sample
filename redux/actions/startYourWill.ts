import { StartYourWill } from "../types";

export const setNameStart = (name: string) => {
  return {
    type: StartYourWill.SET_NAME,
    payload: { name },
  };
};

export const setMakePayment = (makePayment: boolean) => {
  return {
    type: StartYourWill.SET_MAKE_PAYMENT,
    payload: { makePayment },
  };
};

export const signUpEmail = (data, callback) => {
  return {
    type: StartYourWill.SIGN_UP_EMAIL,
    payload: { data, callback },
  };
};

export const sendOTP = (data, callback) => {
  return {
    type: StartYourWill.SEND_OTP,
    payload: { data, callback },
  };
};

export const verifyOTP = (data, callback) => {
  return {
    type: StartYourWill.VERIFY_OTP,
    payload: { data, callback },
  };
};

export const getPromoCode = (data, callback) => {
  return {
    type: StartYourWill.GET_PROMO_CODE,
    payload: { data, callback },
  };
};

export const subscriptions = (data, callback) => {
  return {
    type: StartYourWill.SUBSCRIPTIONS,
    payload: { data, callback },
  };
};
