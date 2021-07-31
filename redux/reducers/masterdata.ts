import { IMasterdata } from "@constant/data.interface";
import { MasterDataTypes } from "../types";

const initState: IMasterdata[] = [];

const masterdataReducer = (state = initState, action: any) => {
  switch (action.type) {
    case MasterDataTypes.SAVE_MASTER_DATA: {
      const { data, callback } = action?.payload;
      const newState = [...data];
      if (callback) {
        callback(newState);
      }
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default masterdataReducer;
