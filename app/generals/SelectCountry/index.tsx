import React, {useState} from "react";
import {countries, findFlagUrlByCountryName} from "country-flags-svg";
import SelectField from "generals/SelectField";
import {Select} from "antd";
import {useEffect} from "react";
const {Option} = Select;

let options = [];

countries.map(item => {
  const temp = {
    label: (
      <div>
        <img width="30" height="20" src={item.flag} />
        <span style={{marginLeft: "8px"}}>{item.name}</span>
      </div>
    ),
    value: item.name,
  };
  if (item.name === "Afghanistan") return;
  options.push(temp);
});

interface IProps {
  isError?: boolean;
  errorTextStr?: string;
  value?: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

function SelectCountry(props: IProps) {
  const {value, onChange, isError, errorTextStr} = props;

  const [current, setCurrent] = useState({
    label: null,
    value: "",
  });

  useEffect(() => {
    if (value) {
      const flagUrl = findFlagUrlByCountryName(value);
      setCurrent({
        label: (
          <div>
            <img width="30" height="20" src={flagUrl} />
            <span style={{marginLeft: "8px"}}>{value}</span>
          </div>
        ),
        value: value,
      });
    }
  }, [value]);

  return (
    <SelectField
      displayLabel
      label="Country"
      selectProps={{
        value: current?.label,
        placeholder: "Choose a country",
        onChange: value => onChange(value),
      }}
      wrapperClassName="wrapper-select"
      searchable
      isError={isError}
      errorTextStr={errorTextStr}
    >
      {options.map(item => {
        return <Option value={item.value}>{item.label}</Option>;
      })}
    </SelectField>
  );
}
export default SelectCountry;
