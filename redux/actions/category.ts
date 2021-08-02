import { IData } from "@constant/data.interface";
import { CategoryTypes } from "../types";

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
