import { StartYourWill } from "../types";

export const setNameStart = (name: string) => {
  return {
    type: StartYourWill.SET_NAME,
    payload: { name },
  };
};

export const setMakePayment = (makePayment: boolean) => {
  return {
    type: StartYourWill.SET_MAKE_PAYMENT,
    payload: { makePayment },
  };
};

export const setDownloaded = (downloaded: boolean) => {
  return {
    type: StartYourWill.SET_DOWNLOADED,
    payload: { downloaded },
  };
};

export const setUploaded = (uploaded: boolean) => {
  return {
    type: StartYourWill.SET_UPLOADED,
    payload: { uploaded },
  };
};

export const signUpEmail = (data, callback) => {
  return {
    type: StartYourWill.SIGN_UP_EMAIL,
    payload: { data, callback },
  };
};

export const sendOTP = (data, callback) => {
  return {
    type: StartYourWill.SEND_OTP,
    payload: { data, callback },
  };
};

export const verifyOTP = (data, callback) => {
  return {
    type: StartYourWill.VERIFY_OTP,
    payload: { data, callback },
  };
};

export const getPromoCode = (data, callback) => {
  return {
    type: StartYourWill.GET_PROMO_CODE,
    payload: { data, callback },
  };
};

export const subscriptions = (data, callback) => {
  return {
    type: StartYourWill.SUBSCRIPTIONS,
    payload: { data, callback },
  };
};

export const uploadFile = (data, callback) => {
  return {
    type: StartYourWill.UPLOAD_FILE,
    payload: { data, callback },
  };
};

export const removeFileUpload = (callback) => {
  return {
    type: StartYourWill.REMOVE_FILE_UPLOAD,
    payload: { callback },
  };
};

export const generatePDF = (callback) => {
  return {
    type: StartYourWill.GENERATE_PDF,
    payload: { callback },
  };
};

export const setPathDownload = (pathDownload) => {
  return {
    type: StartYourWill.SET_PATH_DOWNLOAD,
    payload: { pathDownload },
  };
};

export const setDoneCreateAcc = (doneCreateAcc) => {
  return {
    type: StartYourWill.SET_DONE_CREATE_ACC,
    payload: { doneCreateAcc },
  };
};
