import InvestmentsLayout from "@layout/PersonalEstatesListing/Investments";
import React from "react";
import AuthHoc from "../../AuthHoc";

function InvestmentScreen() {
  return (
    <>
      {localStorage.getItem("accessToken") ? (
        <InvestmentsLayout isLogin />
      ) : (
        <InvestmentsLayout isLogin={false} />
      )}
    </>
  );
}

export default AuthHoc(InvestmentScreen);
