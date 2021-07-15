import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import {
  CheckedIcon,
  CheckedMobileIcon,
  UnCheckIcon,
  UnCheckMobileIcon,
} from "../../../public/images";

interface ICustomCheckboxProps {
  checked: boolean;
  onChange: Function;
  disable?: boolean | false;
}

function CustomCheckbox(props: ICustomCheckboxProps) {
  const { checked, onChange, disable } = props;
  const width = useSelector(
    createSelector(
      (state: any) => state?.sizeBrowser,
      (sizeBrowser) => sizeBrowser?.width
    )
  );
  if (checked)
    return (
      <span
        onClick={() => (disable ? {} : onChange(!checked))}
        style={{ cursor: disable ? "not-allowed" : "pointer" }}
      >
        {width > 768 ? <CheckedIcon /> : <CheckedMobileIcon />}
      </span>
    );
  return (
    <span
      onClick={() => (disable ? {} : onChange(!checked))}
      style={{ cursor: disable ? "not-allowed" : "pointer" }}
    >
      {width > 768 ? <UnCheckIcon /> : <UnCheckMobileIcon />}
    </span>
  );
}

export default CustomCheckbox;
