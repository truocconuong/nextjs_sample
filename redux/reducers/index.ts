import {combineReducers} from "redux";
import progressReducer from "./progress";
import sizeBrowserReducer from "./sizeBrowser";
import startYourWillReducer from "./startYourWill";
import masterdataReducer from "./masterdata";
import categoryReducer from "./category";
import singpassReducer from "./singpass";
import singpasPersonalInformationReducer from "./singpasPersonalInformation";

const appReducers = combineReducers({
  progress: progressReducer,
  sizeBrowser: sizeBrowserReducer,
  startYourWill: startYourWillReducer,
  masterdata: masterdataReducer,
  category: categoryReducer,
  singpass: singpassReducer,
  singpasPersonal: singpasPersonalInformationReducer,
});

const rootReducers = (state, action) => {
  return appReducers(state, action);
};

export default rootReducers;
export type RootState = ReturnType<typeof rootReducers>;
