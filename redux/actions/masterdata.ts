import { IMasterdata } from "@constant/data.interface";
import { MasterDataTypes } from "../types";

export const getMasterData = (data?: any, callback?: any) => {
  return {
    type: MasterDataTypes.GET_MASTER_DATA,
    payload: { data, callback },
  };
};

export const saveMasterData = (data: IMasterdata[]) => {
    return {
      type: MasterDataTypes.SAVE_MASTER_DATA,
      payload: { data },
    };
  };
