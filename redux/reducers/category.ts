import { CategoryTypes } from "../types";

const initState = {};

const categoryReducer = (state = initState, action: any) => {
  console.log("vao reducer", action)
  switch (action.type) {
    case CategoryTypes.SAVE_CATEGORY_DATA: {
      const { data, callback } = action?.payload;
      const newState = {...state, ...data};
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
