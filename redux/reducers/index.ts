import {combineReducers} from "redux";
import progressReducer from "./progress";
import sizeBrowserReducer from "./sizeBrowser";
import startYourWillReducer from "./startYourWill";
import globalDataReducer from "./globalData";

const appReducers = combineReducers({
  progress: progressReducer,
  sizeBrowser: sizeBrowserReducer,
  startYourWill: startYourWillReducer,
  data: globalDataReducer,
});

const rootReducers = (state, action) => {
  return appReducers(state, action);
};

export default rootReducers;
export type RootState = ReturnType<typeof rootReducers>;
