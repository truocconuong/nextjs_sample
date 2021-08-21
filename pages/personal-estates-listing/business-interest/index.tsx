import BusinessInterestsLayout from "@layout/PersonalEstatesListing/BusinessInterests";
import React from "react";
import AuthHoc from "../../AuthHoc";

function BusinessInterestScreen() {
  return (
    <>
      {localStorage.getItem("accessToken") ? (
        <BusinessInterestsLayout isLogin />
      ) : (
        <BusinessInterestsLayout isLogin={false} />
      )}
    </>
  );
}

export default AuthHoc(BusinessInterestScreen);
