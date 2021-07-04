import { Col, Row, Select, SelectProps } from "antd";
import React, { ReactElement } from "react";
interface SelectFieldPropsInterface {
  label?: string;
  displayLabel?: boolean;
  selectProps?: SelectProps<any>;
  children?: ReactElement[];
}
const SelectField = (props: SelectFieldPropsInterface) => {
  const { displayLabel, label, selectProps, children } = props;
  console.log("selectProps", selectProps);
  return (
    <div className="select-field-container">
      <Row>
        <Col span={24}>
          {displayLabel && (
            <label htmlFor="select" className="paragraph-3 label-select-field">
              {label}
            </label>
          )}
        </Col>
        <Col span={24}>
          <Select
            suffixIcon={<DownCircleTwoTone />}
            {...selectProps}
            className={
              selectProps?.value && !selectProps?.disabled ? " box-shadow " : ""
            }
          >
            {children}
          </Select>
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(SelectField);
