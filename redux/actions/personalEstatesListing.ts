import {PersonalEstatesListingTypes} from "../types";

// property

export const createPropertyGuest = (data, callback) => {
  return {
    type: PersonalEstatesListingTypes.CREATE_PROPERTY_GUEST,
    payload: {
      data,
      callback,
    },
  };
};

export const updatePropertyGuest = (id, data, callback) => {
  return {
    type: PersonalEstatesListingTypes.UPDATE_PROPERTY_GUEST,
    payload: {
      id,
      data,
      callback,
    },
  };
};

export const deletePropertyGuest = (id, callback) => {
  return {
    type: PersonalEstatesListingTypes.DELETE_PROPERTY_GUEST,
    payload: {
      id,
      callback,
    },
  };
};

export const createProperty = (data, callback) => {
  return {
    type: PersonalEstatesListingTypes.CREATE_PROPERTY,
    payload: {
      data,
      callback,
    },
  };
};

export const updateProperty = (id, data, callback) => {
  return {
    type: PersonalEstatesListingTypes.UPDATE_PROPERTY,
    payload: {
      id,
      data,
      callback,
    },
  };
};

// bank account

export const createBankAccountGuest = (data, callback) => {
  return {
    type: PersonalEstatesListingTypes.CREATE_BANK_ACCOUNT_GUEST,
    payload: {
      data,
      callback,
    },
  };
};

export const updateBankAccountGuest = (id, data, callback) => {
  return {
    type: PersonalEstatesListingTypes.UPDATE_BANK_ACCOUNT_GUEST,
    payload: {
      id,
      data,
      callback,
    },
  };
};

export const deleteBankAccountGuest = (id, callback) => {
  return {
    type: PersonalEstatesListingTypes.DELETE_BANK_ACCOUNT_GUEST,
    payload: {
      id,
      callback,
    },
  };
};

export const createBankAccount = (data, callback) => {
  return {
    type: PersonalEstatesListingTypes.CREATE_BANK_ACCOUNT,
    payload: {
      data,
      callback,
    },
  };
};

export const updateBankAccount = (id, data, callback) => {
  return {
    type: PersonalEstatesListingTypes.UPDATE_BANK_ACCOUNT,
    payload: {
      id,
      data,
      callback,
    },
  };
};

// insurance policies

export const createInsurancePolicyGuest = (data, callback) => {
  return {
    type: PersonalEstatesListingTypes.CREATE_INSURANCE_POLICY_GUEST,
    payload: {
      data,
      callback,
    },
  };
};

export const updateInsurancePolicyGuest = (id, data, callback) => {
  return {
    type: PersonalEstatesListingTypes.UPDATE_INSURANCE_POLICY_GUEST,
    payload: {
      id,
      data,
      callback,
    },
  };
};

export const deleteInsurancePolicyGuest = (id, callback) => {
  return {
    type: PersonalEstatesListingTypes.DELETE_INSURANCE_POLICY_GUEST,
    payload: {
      id,
      callback,
    },
  };
};

export const createInsurancePolicy = (data, callback) => {
  return {
    type: PersonalEstatesListingTypes.CREATE_INSURANCE_POLICY,
    payload: {
      data,
      callback,
    },
  };
};

export const updateInsurancePolicy = (id, data, callback) => {
  return {
    type: PersonalEstatesListingTypes.UPDATE_INSURANCE_POLICY,
    payload: {
      id,
      data,
      callback,
    },
  };
};

// investment

export const createInvestmentGuest = (data, callback) => {
  return {
    type: PersonalEstatesListingTypes.CREATE_INVESTMENT_GUEST,
    payload: {
      data,
      callback,
    },
  };
};

export const updateInvestmentGuest = (id, data, callback) => {
  return {
    type: PersonalEstatesListingTypes.UPDATE_INVESTMENT_GUEST,
    payload: {
      id,
      data,
      callback,
    },
  };
};

export const deleteInvestmentGuest = (id, callback) => {
  return {
    type: PersonalEstatesListingTypes.DELETE_INVESTMENT_GUEST,
    payload: {
      id,
      callback,
    },
  };
};

export const createInvestment = (data, callback) => {
  return {
    type: PersonalEstatesListingTypes.CREATE_INVESTMENT,
    payload: {
      data,
      callback,
    },
  };
};

export const updateInvestment = (id, data, callback) => {
  return {
    type: PersonalEstatesListingTypes.UPDATE_INVESTMENT,
    payload: {
      id,
      data,
      callback,
    },
  };
};

// business interest

export const createBusinessInterestGuest = (data, callback) => {
  return {
    type: PersonalEstatesListingTypes.CREATE_BUSINESS_INTEREST_GUEST,
    payload: {
      data,
      callback,
    },
  };
};

export const updateBusinessInterestGuest = (id, data, callback) => {
  return {
    type: PersonalEstatesListingTypes.UPDATE_BUSINESS_INTEREST_GUEST,
    payload: {
      id,
      data,
      callback,
    },
  };
};

export const deleteBusinessInterestGuest = (id, callback) => {
  return {
    type: PersonalEstatesListingTypes.DELETE_BUSINESS_INTEREST_GUEST,
    payload: {
      id,
      callback,
    },
  };
};

export const createBusinessInterest = (data, callback) => {
  return {
    type: PersonalEstatesListingTypes.CREATE_BUSINESS_INTEREST,
    payload: {
      data,
      callback,
    },
  };
};

export const updateBusinessInterest = (id, data, callback) => {
  return {
    type: PersonalEstatesListingTypes.UPDATE_BUSINESS_INTEREST,
    payload: {
      id,
      data,
      callback,
    },
  };
};
