import PersonalBeneficiary from "@layout/PersonalBeneficiary";
import React from "react";
import AuthHoc from "./AuthHOC";

const PersonalBeneficiaryScreen = () => {
  return <PersonalBeneficiary />;
};

export default AuthHoc(PersonalBeneficiaryScreen);
