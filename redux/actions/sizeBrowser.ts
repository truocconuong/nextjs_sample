import { SizeBrowser } from "../types";

export const setSizeBrowser = (data: any) => {
  return {
    type: SizeBrowser.SET_SIZE_BROWSER,
    payload: { data },
  };
};
