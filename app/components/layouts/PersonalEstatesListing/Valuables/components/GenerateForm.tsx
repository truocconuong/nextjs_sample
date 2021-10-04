import {VALUABLES_TYPE} from "@constant/index";
import InputField from "@generals/InputField";
import SelectCountry from "@generals/SelectCountry";
import {limitLength} from "@util/index";
import {Row} from "antd";
import React, {useState, useEffect} from "react";

enum TYPE_FORM {
  COMMON = "common",
  PET = "pet",
  REAL_ESTATE = "real estate",
  SAFE_BOX = "safe box",
}

function GenerateForm(props) {
  const {masterDataReducer, data, setData} = props;

  const [typeForm, setTypeForm] = useState("");

  useEffect(() => {
    switch (
      masterDataReducer.find(masterData => masterData.id === data?.type_id)
        ?.name
    ) {
      case VALUABLES_TYPE.MOTOR_VEHICLE:
      case VALUABLES_TYPE.WATCH:
      case VALUABLES_TYPE.JEWELLERY:
        setTypeForm(TYPE_FORM.COMMON);
        break;
      case VALUABLES_TYPE.PET:
        setTypeForm(TYPE_FORM.PET);
        break;
      case VALUABLES_TYPE.REAL_ESTATE:
        setTypeForm(TYPE_FORM.REAL_ESTATE);
        break;
      case VALUABLES_TYPE.SAFE_BOX:
        setTypeForm(TYPE_FORM.SAFE_BOX);
        break;
      default:
        setTypeForm(TYPE_FORM.COMMON);
        break;
    }
  }, [data?.type_id]);

  const handleChangeInput = e => {
    const {name, value} = e.target;
    setData(prev => ({...prev, [name]: limitLength(value, 30)}));
  };

  const handleChangeCountry = value => {
    setData(prev => ({...prev, country_name: value}));
  };

  return (
    <>
      {typeForm === TYPE_FORM.COMMON && (
        <>
          <Row className="mb-32">
            <InputField
              displayLabel
              label="Brand"
              inputProps={{
                placeholder: "",
                value: data?.brand,
                name: "brand",
                onChange: e => handleChangeInput(e),
              }}
            ></InputField>
          </Row>
          <Row className="mb-32">
            <InputField
              displayLabel
              label="Model"
              inputProps={{
                placeholder: "",
                value: data?.model,
                name: "model",
                onChange: e => handleChangeInput(e),
              }}
            ></InputField>
          </Row>
          <Row className="mb-32">
            <InputField
              displayLabel
              label="Serial No."
              inputProps={{
                placeholder: "",
                value: data?.serial_no,
                name: "serial_no",
                onChange: e => handleChangeInput(e),
              }}
            ></InputField>
          </Row>
        </>
      )}
      {typeForm === TYPE_FORM.PET && (
        <>
          <Row className="mb-32">
            <InputField
              displayLabel
              label="Name"
              inputProps={{
                placeholder: "",
                value: data?.pet_name,
                name: "pet_name",
                onChange: e => handleChangeInput(e),
              }}
            ></InputField>
          </Row>
          <Row className="mb-32">
            <InputField
              displayLabel
              label="Breed"
              inputProps={{
                placeholder: "",
                value: data?.pet_breed,
                name: "pet_breed",
                onChange: e => handleChangeInput(e),
              }}
            ></InputField>
          </Row>
          <Row className="mb-32">
            <InputField
              displayLabel
              label="Pet Registration Number"
              inputProps={{
                placeholder: "",
                value: data?.pet_registration_number,
                name: "pet_registration_number",
                onChange: e => handleChangeInput(e),
              }}
            ></InputField>
          </Row>
        </>
      )}
      {typeForm === TYPE_FORM.REAL_ESTATE && (
        <>
          <Row className="mb-32">
            <SelectCountry
              value={data?.country_name}
              onChange={value => handleChangeCountry(value)}
            />
          </Row>
          <Row className="mb-32">
            <InputField
              displayLabel
              label="Registered Address"
              inputProps={{
                placeholder: "Address line 1",
                className: "mb-16",
                value: data?.address_line_1,
                name: "address_line_1",
                onChange: e => handleChangeInput(e),
              }}
            ></InputField>
            <InputField
              inputProps={{
                placeholder: "Address line 2",
                className: "mb-16",
                value: data?.address_line_2,
                name: "address_line_2",
                onChange: e => handleChangeInput(e),
              }}
            ></InputField>
            <InputField
              inputProps={{
                placeholder: "Postal code",
                value: data?.postal_code,
                name: "postal_code",
                onChange: e => handleChangeInput(e),
              }}
            ></InputField>
          </Row>
        </>
      )}
      {typeForm === TYPE_FORM.SAFE_BOX && (
        <>
          <Row className="mb-32">
            <InputField
              displayLabel
              label="Safe Box Details"
              inputProps={{
                placeholder: "Type here...",
                value: data?.safe_box_detail,
                name: "safe_box_detail",
                onChange: e => handleChangeInput(e),
              }}
            ></InputField>
          </Row>
        </>
      )}
    </>
  );
}

export default GenerateForm;
