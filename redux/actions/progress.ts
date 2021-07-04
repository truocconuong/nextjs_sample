import { ProgressTypes } from "../types";

export const saveProgress = (data: any, callback?: any) => {
  return {
    type: ProgressTypes.SAVE_PROGRESS,
    payload: { data, callback },
  };
};

export const savePercent = (data: any, callback?: any) => {
  return {
    type: ProgressTypes.SAVE_PERCENT,
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