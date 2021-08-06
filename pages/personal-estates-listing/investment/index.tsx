import InvestmentsLayout from "@layout/PersonalEstatesListing/Investments";
import React from "react";
import AuthHoc from "../../AuthHoc";

function InvestmentScreen(props) {
  return <InvestmentsLayout />;
}

export default AuthHoc(InvestmentScreen);
