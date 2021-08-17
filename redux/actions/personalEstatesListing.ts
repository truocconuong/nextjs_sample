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
