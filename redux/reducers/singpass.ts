import { IMasterdata, ISingpassGetEnv } from "@constant/data.interface";
import { SingpassTypes } from "../types";

const initState: ISingpassGetEnv = {
  _attributes: "",
  _authApiUrl: "",
  _authLevel: "",
  _clientId: "",
  _clientSecret: "",
  _personApiUrl: "",
  _privateKeyContent: "",
  _publicCertContent: "",
  _redirectUrl: "",
  _tokenApiUrl: "",
}

const singpassReducer = (state = initState, action: any) => {
  switch (action.type) {
    case SingpassTypes.SAVE_ENV: {
      const { data } = action?.payload;
      return data;
    }
    default: {
      return state;
    }
  }
};

export default singpassReducer;
