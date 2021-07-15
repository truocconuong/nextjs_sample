import { StartYourWill } from "../types";

const initState = {
  name: "",
  makePayment: false,
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
    default: {
      return state;
    }
  }
};

export default startYourWillReducer;
