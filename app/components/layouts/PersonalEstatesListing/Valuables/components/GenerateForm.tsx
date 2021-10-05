import {VALUABLES_TYPE} from "@constant/index";
import InputField from "@generals/InputField";
import SelectCountry from "@generals/SelectCountry";
import {limitLength} from "@util/index";
import {Row} from "antd";
import React, {useState, useEffect} from "react";

function GenerateForm(props) {
  const {masterDataReducer, data, setData} = props;

  const [typeForm, setTypeForm] = useState("");

  useEffect(() => {
    if (data?.type_id) {
      setTypeForm(
        masterDataReducer.find(masterData => masterData.id === data?.type_id)
          ?.name
      );
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
      {typeForm === VALUABLES_TYPE.TIME_PIECE && (
        <>
          <Row className="mb-32">
            <InputField
              displayLabel
              label="Brand"
              inputProps={{
                placeholder: "e.g. Rolex",
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
                placeholder: "e.g Submariner",
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
                placeholder: "e.g 124060",
                value: data?.serial_no,
                name: "serial_no",
                onChange: e => handleChangeInput(e),
              }}
            ></InputField>
          </Row>
        </>
      )}
      {typeForm === VALUABLES_TYPE.JEWELLERY && (
        <>
          <Row className="mb-32">
            <InputField
              displayLabel
              label="Brand"
              inputProps={{
                placeholder: "e.g. Harry Winston",
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
                placeholder: "e.g Winston Cluster Diamond Necklace",
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
                placeholder: "e.g 124060",
                value: data?.serial_no,
                name: "serial_no",
                onChange: e => handleChangeInput(e),
              }}
            ></InputField>
          </Row>
        </>
      )}
      {typeForm === VALUABLES_TYPE.VEHICLE && (
        <>
          <Row className="mb-32">
            <InputField
              displayLabel
              label="Brand"
              inputProps={{
                placeholder: "e.g. BMW",
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
                placeholder: "e.g BMW i4 M50",
                value: data?.model,
                name: "model",
                onChange: e => handleChangeInput(e),
              }}
            ></InputField>
          </Row>
          <Row className="mb-32">
            <InputField
              displayLabel
              label="Number Plate"
              inputProps={{
                placeholder: "e.g 124060",
                value: data?.serial_no,
                name: "serial_no",
                onChange: e => handleChangeInput(e),
              }}
            ></InputField>
          </Row>
        </>
      )}
      {typeForm === VALUABLES_TYPE.PET && (
        <>
          <Row className="mb-32">
            <InputField
              displayLabel
              label="Name"
              inputProps={{
                placeholder: "e.g. Cookie",
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
                placeholder: "e.g. I will entrust Cookie to John.",
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
      {typeForm === VALUABLES_TYPE.REAL_ESTATE && (
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
      {(typeForm === VALUABLES_TYPE.SAFE_BOX ||
        typeForm === VALUABLES_TYPE.ANTIQUE ||
        typeForm === VALUABLES_TYPE.COLLECTION ||
        typeForm === VALUABLES_TYPE.ART_PIECE) && (
        <>
          <Row className="mb-32">
            <InputField
              displayLabel
              label="Details"
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
