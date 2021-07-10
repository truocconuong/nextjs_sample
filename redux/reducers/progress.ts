import { ProgressTypes } from "../types";

const initState = {
  percent: 0,
  disabled: true,
  isShowProgressBar: true,
  textButtonProgress: "Continue",
  amountPercentIncreament: 10,
};

const progressReducer = (state = initState, action) => {
  switch (action.type) {
    case ProgressTypes.SET_PERCENT: {
      const {data, callback} = action?.payload;
      const newState = { ...state, ...data };
      if(callback){
        callback(newState)
      }
      return newState;
    }
    case ProgressTypes.SET_DISABLED: {
      const data = action?.payload?.data;
      return { ...state, ...data };
    }
    case ProgressTypes.SET_IS_SHOW_PROGRESS_BAR: {
      const data = action?.payload?.data;
      return { ...state, ...data };
    }
    case ProgressTypes.SET_TEXT_BUTTON_PROGRESS: {
      const data = action?.payload?.data;
      return { ...state, ...data };
    }
    case ProgressTypes.SET_AMOUNT_PERCENT_INCREAMENT: {
      const {data, callback} = action?.payload;
      const newState = { ...state, ...data };
      if(callback){
        callback(newState);
      }
      return newState;
    }
    default: {
      return state;
    }
  }
};


export default progressReducer;
