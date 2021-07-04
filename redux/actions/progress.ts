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
