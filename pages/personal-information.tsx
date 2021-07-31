import PersonalInformation from "@layout/PersonalInformation";
import React from "react";
import AuthHoc from "./AuthHoc";

const PersonalInformationScreen = () => {
  return <PersonalInformation />;
};

export default AuthHoc(PersonalInformationScreen);
