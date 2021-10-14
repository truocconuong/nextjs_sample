import { ISingpassPersonalData } from "@constant/data.interface";
import { SingpassTypes } from "../types";

const initState: ISingpassPersonalData = {
  residentialstatus: null,
  name: null,
  sex: null,
  nationality: null,
  uinfin: null,
  dob: null,
  hdbownership: [],
  childrenbirthrecords: [],
  sponsoredchildrenrecords: [],
}

const singpassPersonalInformationReducer = (state = initState, action: any) => {
  switch (action.type) {
    case SingpassTypes.SAVE_INFORMATION: {
      const { data } = action?.payload;
      return data;
    }
    default: {
      return state;
    }
  }
};

export default singpassPersonalInformationReducer;
