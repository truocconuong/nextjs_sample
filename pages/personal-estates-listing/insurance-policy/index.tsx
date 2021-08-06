import InsurancePolicyLayout from "@layout/PersonalEstatesListing/InsurancePolicies";
import React from "react";
import AuthHoc from "../../AuthHoc";

function InsurancePolicyScreen() {
  return <InsurancePolicyLayout />;
}

export default AuthHoc(InsurancePolicyScreen);
