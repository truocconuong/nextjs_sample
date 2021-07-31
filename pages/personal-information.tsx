import PersonalInformation from "@layout/PersonalInformation";
import React from "react";
import AuthHoc from "./AuthHOC";

const PersonalInformationScreen = () => {
  return <PersonalInformation />;
};

export default AuthHoc(PersonalInformationScreen);
