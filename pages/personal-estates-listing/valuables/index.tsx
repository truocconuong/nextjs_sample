import ValuablesLayout from "@layout/PersonalEstatesListing/Valuables";
import React from "react";
import AuthHoc from "../../AuthHoc";

function ValuablesScreen() {
  return (
    <>
      {localStorage.getItem("accessToken") ? (
        <ValuablesLayout isLogin />
      ) : (
        <ValuablesLayout isLogin={false} />
      )}
    </>
  );
}

export default AuthHoc(ValuablesScreen);
