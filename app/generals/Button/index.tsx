import React from "react";
import {Button, ButtonProps} from "antd";
import {useState} from "react";
import {useEffect} from "react";

interface IProps extends ButtonProps {
  borderLarge?: boolean;
  fontWeightLarge?: boolean;
  width?: string;
}

function CustomButton(props: IProps) {
  const [classes, setClasses] = useState("");

  useEffect(() => {
    let tempClasses = "";
    if (props.borderLarge) {
      tempClasses += "border-large";
    }
    if (props.fontWeightLarge) {
      tempClasses += " font-weight-large";
    }
    setClasses(tempClasses);
  }, []);

  return (
    <div className="custom-button" style={{ width: `${props?.width}` }}>
      <Button className={classes} {...props} style={{ width: `${props?.width}` }}>
        {props.children}
      </Button>
    </div>
  );
}

export default CustomButton;
