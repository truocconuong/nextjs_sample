import BankAccountLayout from "@layout/PersonalEstatesListing/BankAccount";
import React from "react";
import AuthHoc from "../../AuthHoc";

function BankAccountScreen() {
  return (
    <>
      {localStorage.getItem("accessToken") ? (
        <BankAccountLayout isLogin />
      ) : (
        <BankAccountLayout isLogin={false} />
      )}
    </>
  );
}

export default AuthHoc(BankAccountScreen);
