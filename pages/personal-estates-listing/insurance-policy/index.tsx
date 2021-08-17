import InsurancePolicyLayout from "@layout/PersonalEstatesListing/InsurancePolicies";
import React from "react";
import AuthHoc from "../../AuthHoc";

function InsurancePolicyScreen() {
  return (
    <>
      {localStorage.getItem("accessToken") ? (
        <InsurancePolicyLayout isLogin />
      ) : (
        <InsurancePolicyLayout isLogin={false} />
      )}
    </>
  );
}

export default AuthHoc(InsurancePolicyScreen);
