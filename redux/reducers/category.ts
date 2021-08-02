import { CategoryTypes } from "../types";

const initState = {};

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
    default: {
      return state;
    }
  }
};

export default categoryReducer;
