import { IData } from "@constant/data.interface";
import {
  CategoryTypes,
  PersonalEstatesListingTypes,
  PersonalTypes,
} from "../types";

const initState: IData = {
  id: "",
  email: "",
  phone: "",
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
    // property
    case PersonalEstatesListingTypes.CREATE_PROPERTY_GUEST: {
      const { data, callback } = action?.payload;
      if (callback) {
        callback(state);
      }
      return {
        ...state,
        properties: [...state.properties, data],
      };
    }
    case PersonalEstatesListingTypes.UPDATE_PROPERTY_GUEST: {
      const { id, data, callback } = action?.payload;
      const tempProperties = state.properties.map(item => {
        if (id !== "" && item.id === id) return data;
        return item;
      });
      if (callback) {
        callback(tempProperties);
      }
      return {
        ...state,
        properties: tempProperties,
      };
    }
    case PersonalEstatesListingTypes.DELETE_PROPERTY_GUEST: {
      const { id, callback } = action?.payload;
      const tempProperties = state.properties.filter(item => item.id !== id);
      if (callback) {
        callback(tempProperties);
      }
      return {
        ...state,
        properties: tempProperties,
      };
    }
    // bank account
    case PersonalEstatesListingTypes.CREATE_BANK_ACCOUNT_GUEST: {
      const { data, callback } = action?.payload;
      const tempBankAccounts = [...state.bank_accounts, data];
      if (callback) {
        callback(tempBankAccounts);
      }
      return {
        ...state,
        bank_accounts: tempBankAccounts,
      };
    }
    case PersonalEstatesListingTypes.UPDATE_BANK_ACCOUNT_GUEST: {
      const { id, data, callback } = action?.payload;
      const tempBankAccounts = state.bank_accounts.map(item => {
        if (id !== "" && item.id === id) return data;
        return item;
      });
      if (callback) {
        callback(tempBankAccounts);
      }
      return {
        ...state,
        bank_accounts: tempBankAccounts,
      };
    }
    case PersonalEstatesListingTypes.DELETE_BANK_ACCOUNT_GUEST: {
      const { id, callback } = action?.payload;
      const tempBankAccounts = state.bank_accounts.filter(
        item => item.id !== id
      );
      if (callback) {
        callback(tempBankAccounts);
      }
      return {
        ...state,
        bank_accounts: tempBankAccounts,
      };
    }
    // insurance_policies
    case PersonalEstatesListingTypes.CREATE_INSURANCE_POLICY_GUEST: {
      const { data, callback } = action?.payload;
      const tempInsurancePolicies = [...state.insurance_policies, data];
      if (callback) {
        callback(tempInsurancePolicies);
      }
      return {
        ...state,
        insurance_policies: tempInsurancePolicies,
      };
    }
    case PersonalEstatesListingTypes.UPDATE_INSURANCE_POLICY_GUEST: {
      const { id, data, callback } = action?.payload;
      const tempInsurancePolicies = state.insurance_policies.map(item => {
        if (id !== "" && item.id === id) return data;
        return item;
      });
      if (callback) {
        callback(tempInsurancePolicies);
      }
      return {
        ...state,
        insurance_policies: tempInsurancePolicies,
      };
    }
    case PersonalEstatesListingTypes.DELETE_INSURANCE_POLICY_GUEST: {
      const { id, callback } = action?.payload;
      const tempInsurancePolicies = state.insurance_policies.filter(
        item => item.id !== id
      );
      if (callback) {
        callback(tempInsurancePolicies);
      }
      return {
        ...state,
        insurance_policies: tempInsurancePolicies,
      };
    }
    // investment
    case PersonalEstatesListingTypes.CREATE_INVESTMENT_GUEST: {
      const { data, callback } = action?.payload;
      const tempInvestments = [...state.investments, data];
      if (callback) {
        callback(tempInvestments);
      }
      return {
        ...state,
        investments: tempInvestments,
      };
    }
    case PersonalEstatesListingTypes.UPDATE_INVESTMENT_GUEST: {
      const { id, data, callback } = action?.payload;
      const tempInvestments = state.investments.map(item => {
        if (id !== "" && item.id === id) return data;
        return item;
      });
      if (callback) {
        callback(tempInvestments);
      }
      return {
        ...state,
        investments: tempInvestments,
      };
    }
    case PersonalEstatesListingTypes.DELETE_INVESTMENT_GUEST: {
      const { id, callback } = action?.payload;
      const tempInvestments = state.investments.filter(item => item.id !== id);
      if (callback) {
        callback(tempInvestments);
      }
      return {
        ...state,
        investments: tempInvestments,
      };
    }
    // business_interests
    case PersonalEstatesListingTypes.CREATE_BUSINESS_INTEREST_GUEST: {
      const { data, callback } = action?.payload;
      const tempBusinessInterests = [...state.business_interests, data];
      if (callback) {
        callback(tempBusinessInterests);
      }
      return {
        ...state,
        business_interests: tempBusinessInterests,
      };
    }
    case PersonalEstatesListingTypes.UPDATE_BUSINESS_INTEREST_GUEST: {
      const { id, data, callback } = action?.payload;
      const tempBusinessInterests = state.business_interests.map(item => {
        if (id !== "" && item.id === id) return data;
        return item;
      });
      if (callback) {
        callback(tempBusinessInterests);
      }
      return {
        ...state,
        business_interests: tempBusinessInterests,
      };
    }
    case PersonalEstatesListingTypes.DELETE_BUSINESS_INTEREST_GUEST: {
      const { id, callback } = action?.payload;
      const tempBusinessInterests = state.business_interests.filter(
        item => item.id !== id
      );
      if (callback) {
        callback(tempBusinessInterests);
      }
      return {
        ...state,
        business_interests: tempBusinessInterests,
      };
    }
    // valuables
    case PersonalEstatesListingTypes.CREATE_VALUABLE_GUEST: {
      const { data, callback } = action?.payload;
      const tempValuables = [...state.valuables, data];
      if (callback) {
        callback(tempValuables);
      }
      return {
        ...state,
        valuables: tempValuables,
      };
    }
    case PersonalEstatesListingTypes.UPDATE_VALUABLE_GUEST: {
      const { id, data, callback } = action?.payload;
      const tempValuables = state.valuables.map(item => {
        if (id !== "" && item.id === id) return data;
        return item;
      });
      if (callback) {
        callback(tempValuables);
      }
      return {
        ...state,
        valuables: tempValuables,
      };
    }
    case PersonalEstatesListingTypes.DELETE_VALUABLE_GUEST: {
      const { id, callback } = action?.payload;
      const tempValuables = state.valuables.filter(item => item.id !== id);
      if (callback) {
        callback(tempValuables);
      }
      return {
        ...state,
        valuables: tempValuables,
      };
    }
    // personal information
    case PersonalTypes.SET_PERSONAL_INFORMATION: {
      const { data, callback } = action?.payload;
      const {
        legalName,
        address,
        addressLine1,
        addressLine2,
        email,
        passport,
        unitNumber,
      } = data;
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
        unit_number: unitNumber,
      };
    }
    case PersonalTypes.SET_EXECUTOR: {
      const { data, callback } = action?.payload;
      if (callback) {
        callback(state);
      }
      return {
        ...state,
        executors: data,
      };
    }
    case PersonalTypes.SET_BENEFICIARY: {
      const { data, callback } = action?.payload;
      const newState = {
        ...state,
        beneficiaries: data,
      };
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
