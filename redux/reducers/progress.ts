import { ProgressTypes } from "../types";

const initState = {
  percent: 0,
  disabled: true,
  isShowProgressBar: true,
};

const progressReducer = (state = initState, action) => {
  switch (action.type) {
    case ProgressTypes.SAVE_PROGRESS: {
      const data = action?.payload?.data;
      return { ...state, ...data };
    }
    case ProgressTypes.SAVE_PERCENT: {
      const data = action?.payload?.data;
      return { ...state, ...data };
    }
    case ProgressTypes.SET_DISABLED: {
      const data = action?.payload?.data;
      return { ...state, ...data };
    }
    case ProgressTypes.SET_IS_SHOW_PROGRESS_BAR: {
      const data = action?.payload?.data;
      return { ...state, ...data };
    }
    default: {
      return state;
    }
  }
};


export default progressReducer;
