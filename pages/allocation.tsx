import Allocation from "@layout/Allocation";
import React from "react";
import AuthHoc from "./AuthHoc";

const AllocationScreen = () => {
  return <Allocation />;
};

export default AuthHoc(AllocationScreen);
