import { StartYourWill } from "../types";

const initState = {
  name: "",
  makePayment: false,
  downloaded: false,
  uploaded: false,
  pathDownload: "",
};

const startYourWillReducer = (state = initState, action) => {
  switch (action.type) {
    case StartYourWill.SET_NAME: {
      const { name } = action?.payload;
      const newState = { ...state, name };
      return newState;
    }
    case StartYourWill.SET_MAKE_PAYMENT: {
      const { makePayment } = action?.payload;
      const newState = { ...state, makePayment };
      return newState;
    }
    case StartYourWill.SET_DOWNLOADED: {
      const { downloaded } = action?.payload;
      const newState = { ...state, downloaded };
      return newState;
    }
    case StartYourWill.SET_UPLOADED: {
      const { uploaded } = action?.payload;
      const newState = { ...state, uploaded };
      return newState;
    }
    case StartYourWill.SET_PATH_DOWNLOAD: {
      const { pathDownload } = action?.payload;
      const newState = { ...state, pathDownload };
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default startYourWillReducer;
