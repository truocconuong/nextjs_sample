import ValuablesLayout from "@layout/PersonalEstatesListing/Valuables";
import React from "react";
import AuthHoc from "../../AuthHoc";

function ValuablesScreen() {
  return <ValuablesLayout />;
}

export default AuthHoc(ValuablesScreen);
