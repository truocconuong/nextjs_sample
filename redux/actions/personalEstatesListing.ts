import {PersonalEstatesListingTypes} from "../types";

export const createPropertyGuest = (data, callback) => {
  return {
    type: PersonalEstatesListingTypes.SET_PROPERTY,
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
