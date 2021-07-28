import {IData} from "@constant/data.interface";
import {PersonalEstatesListingTypes} from "../types";

const initialState: IData = {
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

const globalDataReducer = (state = initialState, action): IData => {
  switch (action.type) {
    case PersonalEstatesListingTypes.SET_PROPERTY: {
      const {data, callback} = action?.payload;
      if (callback) {
        callback(state);
      }
      return {
        ...state,
        properties: data,
      };
    }
    default: {
      return state;
    }
  }
};

export default globalDataReducer;
