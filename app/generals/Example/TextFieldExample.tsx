import { Col, Row, Select } from "antd";
import SelectField from "generals/SelectField";
import React, { useEffect, useState } from "react";
import InputField from "../InputField";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { ProgressActions } from "../../../redux/actions";
import ProgressBar from "generals/Progress";

const { Option } = Select;
const Example = () => {
  const dispatch = useDispatch();
  const defaultValueSelect = "Select";
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>(
    defaultValueSelect
  );

  const onSearch = () => {
    console.log("inputValue", inputValue);
  };

  return (
    <div className="tf-container">
      <Row>
        <Col span={8}>
          <Row gutter={[0, 73]}>
            <Col span={24}>
              <div className="container-input">
                <div className="description">INPUT / EMPTY</div>
                <InputField
                  displayLabel
                  label="Input Field Label"
                  inputProps={{
                    placeholder: "usergoogle@gmail.com",
                    value: inputValue,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      setInputValue(e?.target?.value),
                  }}
                />
              </div>
            </Col>

            <Col span={24}>
              <div className="container-input">
                <div className="description">INPUT / FILLED</div>
                <InputField
                  displayLabel
                  label="Input Field"
                  inputProps={{
                    placeholder: "usergoogle@gmail.com",
                    value: "usergoogle@gmail.com",
                  }}
                />
              </div>
            </Col>

            <Col span={24}>
              <div className="container-input">
                <div className="description">Selector / PRE</div>
                <SelectField
                  displayLabel
                  label="Input Field"
                  selectProps={{
                    placeholder: "Select",
                    className: "full-width"
                  }}
                ></SelectField>
              </div>
            </Col>
            <Col span={24}>
              <div className="container-input">
                <div className="description">INPUT ERROR</div>
                <InputField
                  displayLabel
                  label="Input Field"
                  inputProps={{
                    placeholder: "usergoogle@gmail.com",
                    value: "usergoogle@gmail.com",
                  }}
                  isError={true}
                  displayErrorText={false}
                />
              </div>
            </Col>
            <Col span={24}>
              <div className="container-input">
                <div className="description">INPUT 2 Lines / Empty</div>
                <InputField
                  displayLabel
                  label="Input Field"
                  inputProps={{
                    placeholder: "e.g. S-000-0000-G",
                  }}
                  multipleLines
                  limitLines={5}
                  displaySupportText
                  supportText="The NRIC and Passport No. may only contain letters and numbers."
                />
              </div>
            </Col>
            <Col span={24}>
              <div className="container-input">
                <div className="description">INPUT / ADDRESS</div>
                <InputField
                  displayLabel
                  label="Input Field Label"
                  inputProps={{
                    placeholder: "6 digit postal code",
                    value: inputValue,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      setInputValue(e?.target?.value),
                  }}
                  searchable
                  onSearch={onSearch}
                />
              </div>
            </Col>
            <Col span={24}>
              <div className="container-input">
                <div className="description">INPUT / EMPTY</div>
                <InputField
                  displayLabel
                  label="Input Field Label"
                  inputProps={{
                    placeholder: "usergoogle@gmail.com",
                    value: inputValue,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      setInputValue(e?.target?.value),
                  }}
                />
              </div>
            </Col>
            <Col span={24}>
              <InputField
                inputProps={{
                  placeholder: "no label",
                  value: inputValue,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setInputValue(e?.target?.value),
                }}
              />
            </Col>
          </Row>
        </Col>
        <Col span={8} offset={8}>
          <Row gutter={[0, 73]}>
            <Col span={24}>
              <div className="container-input">
                <div className="description">INPUT / Filled : Disable</div>
                <InputField
                  displayLabel
                  label="Input Field Label"
                  inputProps={{
                    placeholder: "usergoogle@gmail.com",
                    value: "usergoogle@gmail.com",
                    disabled: true,
                  }}
                />
              </div>
            </Col>
            <Col span={24}>
              <div className="container-input">
                <div className="description">INPUT / TYPING</div>
                <InputField
                  displayLabel
                  label="Input Field Label"
                  inputProps={{
                    placeholder: "usergoogle@gmail.com",
                    value: "user",
                  }}
                />
              </div>
            </Col>
            <Col span={24}>
              <div className="container-input">
                <div className="description">Selector / SELECTED</div>
                <SelectField
                  displayLabel
                  label="Input Field"
                  selectProps={{
                    value: selectedValue,
                    placeholder: "Select",
                    onChange: (value) => setSelectedValue(value),
                  }}
                >
                  <Option value="Zhejiang">Zhejiang</Option>
                  <Option value="Jiangsu">Jiangsu</Option>
                </SelectField>
              </div>
            </Col>
            <Col span={24}>
              <div className="container-input">
                <div className="description">INPUT ERROR</div>
                <InputField
                  displayLabel
                  label="Input Field"
                  inputProps={{
                    placeholder: "usergoogle@gmail.com",
                    value: "usergoogle@gmail.com",
                  }}
                  isError={true}
                  displayErrorText={true}
                  errorTextStr="This code is invalid."
                />
              </div>
            </Col>
            <Col span={24}>
              <div className="container-input">
                <div className="description">INPUT / SUPPORT TEXT</div>
                <InputField
                  displayLabel
                  label="Input Field Label"
                  inputProps={{
                    placeholder: "e.g. S-000-0000-G",
                  }}
                  displaySupportText
                  supportText="The NRIC and Passport No. may only contain letters and numbers."
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Example;
