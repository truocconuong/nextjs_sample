import React from "react";
import {Switch} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";

function CustomToggle(props) {
  const {onChangeSwitch} = props;

  return (
    <div className="custom-toggle">
      <div className="show-details">
        <span className="show-details_text">
          Do you want to include more details?
        </span>
        <InfoCircleOutlined
          //   onClick={onClickShowMore}
          className="show-details_icon"
        />
      </div>
      <Switch onChange={onChangeSwitch} />
    </div>
  );
}

export default CustomToggle;
