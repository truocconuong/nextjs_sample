import { SizeBrowser } from "../types";

function getWindowDimensions() {
  if (typeof window !== "undefined" && window) {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
}

const initState = getWindowDimensions()?.width
  ? getWindowDimensions()
  : { width: 1920, height: 1080 };

const sizeBrowserReducer = (state = initState, action) => {
  switch (action.type) {
    case SizeBrowser.SET_SIZE_BROWSER: {
      const { data } = action?.payload;
      const newState = { ...state, ...data };
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default sizeBrowserReducer;
