import BankAccountLayout from "@layout/PersonalEstatesListing/BankAccount";
import React from "react";
import AuthHoc from "../../AuthHoc";

function BankAccountScreen() {
  return <BankAccountLayout />;
}

export default AuthHoc(BankAccountScreen);
