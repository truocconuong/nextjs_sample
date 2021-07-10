import React from "react";
import CustomButton from ".";
import {DownloadOutlined, EditOutlined} from "@ant-design/icons";

function ExampleButton(props) {
  return (
    <div>
      <div style={{margin: "20px"}}>
        <CustomButton borderLarge fontWeightLarge>
          Button
        </CustomButton>
      </div>
      <div style={{margin: "20px"}}>
        <CustomButton size="large">Button</CustomButton>
      </div>
      <div style={{margin: "20px"}}>
        <CustomButton type="primary">Primary</CustomButton>
      </div>
      <div style={{margin: "20px"}}>
        <CustomButton type="primary" size="large">
          Primary
        </CustomButton>
      </div>

      <div style={{margin: "20px"}}>
        <CustomButton type="ghost">Ghost</CustomButton>
      </div>
      <div style={{margin: "20px"}}>
        <CustomButton borderLarge type="ghost" size="large">
          Ghost
        </CustomButton>
      </div>

      <div style={{margin: "20px"}}>
        <CustomButton type="dashed" icon={<DownloadOutlined />}>
          Sign In Securely
        </CustomButton>
      </div>
      <div style={{margin: "20px"}}>
        <CustomButton type="dashed" size="large" icon={<DownloadOutlined />}>
          Sign In Securely
        </CustomButton>
      </div>

      <div style={{margin: "20px"}}>
        <CustomButton type="dashed">Pay $ Now</CustomButton>
      </div>

      <div style={{margin: "20px"}}>
        <CustomButton danger onClick={() => console.log("1")}>
          Fix Now
        </CustomButton>
      </div>
    </div>
  );
}

export default ExampleButton;
