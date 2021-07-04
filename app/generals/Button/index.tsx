import React from "react";
import {Button} from "antd";
import styles from "./button.module.scss";

function CustomButton(props) {
  return (
    <div className="custom-button">
      <Button {...props}>{props.children}</Button>
    </div>
  );
}

export default CustomButton;
