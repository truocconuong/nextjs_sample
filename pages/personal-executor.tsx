import PersonalExecutor from "@layout/PersonalExecutor";
import React from "react";
import AuthHoc from "./AuthHOC";

const PersonalExecutorScreen = () => {
  return <PersonalExecutor />;
};

export default AuthHoc(PersonalExecutorScreen);
