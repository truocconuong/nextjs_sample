import { Col, Row, Select, SelectProps } from "antd";
import React, { ReactElement } from "react";
import { SelectUp, SelectDown, IconSearch } from "../../../public/images";
interface SelectFieldPropsInterface {
  label?: string;
  displayLabel?: boolean;
  selectProps?: SelectProps<any>;
  children?: any[];
  wrapperClassName?: string;
  searchable?: boolean;
}
const SelectField = (props: SelectFieldPropsInterface) => {
  const {
    displayLabel,
    label,
    selectProps,
    children,
    wrapperClassName,
    searchable,
  } = props;
  return (
    <div className={"select-field-container " + (wrapperClassName || "")}>
      <Row>
        <Col span={24}>
          {displayLabel && (
            <label htmlFor="select" className="paragraph-3 label-select-field">
              {label}
            </label>
          )}
        </Col>
        {searchable ? (
          <Col span={24} className="select-searchable">
            <div className="search-icon">
              <IconSearch />
            </div>
            <Select
              loading={true}
              showSearch={searchable}
              suffixIcon={selectProps?.value ? <SelectUp /> : <SelectDown />}
              {...selectProps}
              className={
                selectProps.className +
                (selectProps?.value && !selectProps?.disabled
                  ? " box-shadow "
                  : "")
              }
            >
              {children}
            </Select>
          </Col>
        ) : (
          <Col span={24}>
            <Select
              suffixIcon={selectProps?.value ? <SelectUp /> : <SelectDown />}
              {...selectProps}
              className={
                selectProps.className +
                (selectProps?.value && !selectProps?.disabled
                  ? " box-shadow "
                  : "")
              }
            >
              {children}
            </Select>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default React.memo(SelectField);
