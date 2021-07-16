import React from "react";
import {DatePicker, DatePickerProps} from "antd";

type IProps =  DatePickerProps;
 
function CustomDatePicker(props: IProps) {
  const {value, onChange} = props;
  return (
    <div className="custom-date-picker">
      <DatePicker
        showToday={false}
        dropdownClassName="custom-date-picker__dropdown"
        suffixIcon=""
        placeholder="0/0/0"
        format="DD/MM/YYYY"
        value={value}
        onChange={(value, dataString) => onChange && onChange(value, dataString)}
      >
      </DatePicker>
    </div>
  );
}

export default CustomDatePicker;
