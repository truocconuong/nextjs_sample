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
