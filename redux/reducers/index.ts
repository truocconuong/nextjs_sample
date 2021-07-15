import { combineReducers } from "redux";
import progressReducer from "./progress";
import sizeBrowserReducer from "./sizeBrowser";
import startYourWillReducer from "./startYourWill";

const appReducers = combineReducers({
  progress: progressReducer,
  sizeBrowser: sizeBrowserReducer,
  startYourWill: startYourWillReducer,
});

const rootReducers = (state, action) => {
  return appReducers(state, action);
};

export default rootReducers;
