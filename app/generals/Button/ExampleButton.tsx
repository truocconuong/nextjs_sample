import React from "react";
import CustomButton from ".";
import {DownloadOutlined, EditOutlined} from "@ant-design/icons";

function ExampleButton(props) {
  return (
    <div>
      <div style={{margin: "20px"}}>
        <CustomButton>Button</CustomButton>
      </div>
      <div style={{margin: "20px"}}>
        <CustomButton size="large">Button</CustomButton>
      </div>

      <div style={{margin: "20px"}}>
        <CustomButton type="primary">Button</CustomButton>
      </div>
      <div style={{margin: "20px"}}>
        <CustomButton type="primary" size="large">
          Button
        </CustomButton>
      </div>

      <div style={{margin: "20px"}}>
        <CustomButton type="ghost">Button</CustomButton>
      </div>
      <div style={{margin: "20px"}}>
        <CustomButton type="ghost" size="large">
          Button
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
        <CustomButton danger>Fix Now</CustomButton>
      </div>

      <div style={{margin: "20px"}}>
        <CustomButton disabled>Disabled</CustomButton>
      </div>

      <div style={{margin: "20px"}}>
        <CustomButton type="custom" icon={<EditOutlined />}>
          Edit
        </CustomButton>
      </div>
      <div style={{margin: "20px"}}>
        <CustomButton type="custom" size="large" icon={<EditOutlined />}>
          Edit
        </CustomButton>
      </div>
      <div style={{margin: "20px"}}>
        <CustomButton
          type="custom"
          size="large"
          icon={<EditOutlined />}
          disabled
        >
          Edit
        </CustomButton>
      </div>
    </div>
  );
}

export default ExampleButton;
