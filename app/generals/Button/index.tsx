import React from "react";
import {Button, ButtonProps} from "antd";

function CustomButton(props: ButtonProps) {
  return (
    <div className="custom-button">
      <Button {...props}>{props.children}</Button>
    </div>
  );
}

export default CustomButton;
