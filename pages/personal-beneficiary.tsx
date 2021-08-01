import PersonalBeneficiary from "@layout/PersonalBeneficiary";
import React from "react";
import AuthHoc from "./AuthHoc";

const PersonalBeneficiaryScreen = () => {
  return <PersonalBeneficiary />;
};

export default AuthHoc(PersonalBeneficiaryScreen);
