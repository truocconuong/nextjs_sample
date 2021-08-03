import {combineReducers} from "redux";
import progressReducer from "./progress";
import sizeBrowserReducer from "./sizeBrowser";
import startYourWillReducer from "./startYourWill";
import masterdataReducer from "./masterdata";
import categoryReducer from "./category";

const appReducers = combineReducers({
  progress: progressReducer,
  sizeBrowser: sizeBrowserReducer,
  startYourWill: startYourWillReducer,
  masterdata: masterdataReducer,
  category: categoryReducer
});

const rootReducers = (state, action) => {
  return appReducers(state, action);
};

export default rootReducers;
export type RootState = ReturnType<typeof rootReducers>;
