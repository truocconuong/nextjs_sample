import { combineReducers } from "redux";
import progressReducer from "./progress";

const appReducers = combineReducers({
  progress: progressReducer,
});

const rootReducers = (state, action) => {
  return appReducers(state, action);
};

export default rootReducers;
