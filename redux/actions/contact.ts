import { ContactTypes } from "../types";

export const postContactForm = (data: any, callback?: any) => {
  return {
    type: ContactTypes.POST_CONTACT_FORM,
    payload: { data, callback },
  };
};
