import { ProgressTypes } from "../types";

export const setPercent = (data: any, callback?: any) => {
  return {
    type: ProgressTypes.SET_PERCENT,
    payload: { data, callback },
  };
};

export const setDisabled = (data: any, callback?: any) => {
  return {
    type: ProgressTypes.SET_DISABLED,
    payload: { data, callback },
  };
};

export const setIsShowProgressBar = (data: any, callback?: any) => {
  return {
    type: ProgressTypes.SET_IS_SHOW_PROGRESS_BAR,
    payload: { data, callback },
  };
};

export const setTextButtonProgress = (data: any, callback?: any) => {
  return {
    type: ProgressTypes.SET_TEXT_BUTTON_PROGRESS,
    payload: { data, callback },
  };
};

export const setAmountPercentIncreament = (data: any, callback?: any) => {
  return {
    type: ProgressTypes.SET_AMOUNT_PERCENT_INCREAMENT,
    payload: { data, callback },
  };
};
