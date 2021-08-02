import { IData } from "@constant/data.interface";
import { CategoryTypes } from "../types";

const initState: IData = {
    id: "",
    email: "",
    full_legal_name: "",
    nric: "",
    postal_code: "",
    address_line_1: "",
    address_line_2: "",
    unit_number: "",
    executors: [],
    beneficiaries: [],
    properties: [],
    bank_accounts: [],
    insurance_policies: [],
    investments: [],
    business_interests: [],
    valuables: [],
};

const categoryReducer = (state = initState, action: any) => {
  switch (action.type) {
    case CategoryTypes.SAVE_CATEGORY_DATA: {
      const { data, callback } = action?.payload;
      const newState = { ...data };
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

export default categoryReducer;
