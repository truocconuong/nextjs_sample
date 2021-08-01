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
    case PersonalEstatesListingTypes.SET_PERSONAL_INFORMATION: {
      const {data, callback} = action?.payload;
      const {legalName, address, addressLine1, addressLine2, email, passport, unitNumber} = data;
      console.log("Data intergrated", data)
      if (callback) {
        callback(state);
      }
      return {
        ...state,
        email: email,
        full_legal_name: legalName,
        nric: passport,
        postal_code: address,
        address_line_1: addressLine1,
        address_line_2: addressLine2,
        unit_number: unitNumber
      };
    }
    case PersonalEstatesListingTypes.SET_EXECUTOR: {
      const {data, callback} = action?.payload;
      console.log("Data intergrated", data)
      if (callback) {
        callback(state);
      }
      return {
        ...state,
        executors: data
      };
    }
    default: {
      return state;
    }
  }
};

export default globalDataReducer;
