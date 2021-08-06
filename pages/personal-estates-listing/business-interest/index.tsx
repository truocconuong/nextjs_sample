import BusinessInterestsLayout from "@layout/PersonalEstatesListing/BusinessInterests";
import React from "react";
import AuthHoc from "../../AuthHoc";

function BusinessInterestScreen() {
  return <BusinessInterestsLayout />;
}

export default AuthHoc(BusinessInterestScreen);
