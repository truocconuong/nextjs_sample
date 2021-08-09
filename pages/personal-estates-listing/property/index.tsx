import PropertyLayout from "@layout/PersonalEstatesListing/Property";
import React from "react";
import AuthHoc from "../../AuthHoc";

function PropertyScreen() {
  return (
    <>
      {localStorage.getItem("accessToken") ? (
        <PropertyLayout isLogin />
      ) : (
        <PropertyLayout isLogin={false} />
      )}
    </>
  );
}

export default AuthHoc(PropertyScreen);
