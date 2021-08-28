import { MAX_LENGTH_NAME } from "@constant/index";
import { isEmail, isValidName, isValidNric } from "@util/index";
import CustomButton from "generals/Button";
import InputField from "generals/InputField";
import React, { useState } from "react";
import {getAddress} from "onemap-address-search-singapore";
import { useEffect } from "react";
import {
  SaveIcon,
  UndoIcon,
  SaveIconEnabled,
  UndoIconEnabled,
} from "../../../../public/images";
interface PersonalFormPropsInterface {
  isMobile?: boolean;
  onSaveData: (data: any) => void;
  initialValue: DataFormInput;
}

export interface DataFormInput {
  legalName: string;
  email: string;
  passport: string;
  address: string;
  addressLine1: string;
  addressLine2: string;
  unitNumber: string;
}
const PersonalFormInput = (props: PersonalFormPropsInterface) => {
  const { isMobile, onSaveData, initialValue } = props;
  const [dataForm, setDataForm] = useState<DataFormInput>(initialValue);
  useEffect(() => {
    setDataForm(initialValue)
  }, [initialValue])
  const onValueChange = (key: string, value: string) => {
    const newDataForm = { ...dataForm };
    if(value.length >= MAX_LENGTH_NAME){
      return;
    }
    newDataForm[key] = value;
    setDataForm(newDataForm);
  };

  const onResetForm = () => {
    setDataForm(initialValue);
  };

  const isEnableForm = () => {
    const dataFormCopy = { ...dataForm };
    for (let key in dataFormCopy) {
      if (dataFormCopy[key]) {
        return true;
      }
    }
    return false;
  };

  const isFullForm = () => {
    const dataFormCopy = { ...dataForm };
    if (!isEmail(dataFormCopy.email)) {
      return false;
    }
    for (let key in dataFormCopy) {
      if (!dataFormCopy[key]) {
        return false;
      }
    }
    return true;
  };

  const onFormSave = () => {
    if (!isFullForm()) {
      return;
    }
    onSaveData(dataForm);
  };

  const onSearchAddress = () => {
    getAddress({
      postalCode: dataForm?.address,
    }).then(address => {
      const newDataForm = { ...dataForm };
      newDataForm.unitNumber = address?.blockNo,
      newDataForm.addressLine1 = address?.address[0] && address?.address[0].ADDRESS;
      newDataForm.addressLine2 = address?.address[1] && address?.address[1].ADDRESS;
      setDataForm(newDataForm);
    });
  };

  return (
    <div className={"personal-form-input-container"}>
      <div className="personal-form-input-wrapper">
        <div className="legal-name">
          <div className="container-input">
            <InputField
              displayLabel
              label="Your Full Legal Name"
              inputProps={{
                placeholder: "e.g. Ken Chan",
                value: dataForm.legalName,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  onValueChange("legalName", e?.target?.value),
                maxLength: 30
              }}
              wrapperClassName="wrapper-class"
              isError={dataForm.legalName && !isValidName(dataForm.legalName)}
              displayErrorText={dataForm.legalName && !isValidName(dataForm.legalName)}
              errorTextStr="Name can not contain special characters except @"
            />
          </div>
        </div>
        <div className="email">
          <div className="container-input">
            <InputField
              displayLabel
              label="Email"
              inputProps={{
                placeholder: "e.g. user@gmail.com",
                value: dataForm.email,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  onValueChange("email", e?.target?.value),
              }}
              isError={dataForm.email && !isEmail(dataForm.email)}
              displayErrorText={dataForm.email && !isEmail(dataForm.email)}
              errorTextStr="Email is invalid."
            />
          </div>
        </div>
        <div className="passport">
          <div className="container-input">
            <InputField
              displayLabel
              label="NRIC / Passport No. "
              inputProps={{
                placeholder: "e.g. G1234567A",
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  onValueChange("passport", e?.target?.value),
                value: dataForm.passport,
              }}
              isError={dataForm.passport && !isValidNric(dataForm.passport)}
              displayErrorText={dataForm.passport && !isValidNric(dataForm.passport)}
              errorTextStr="Nric is invalid"
              displaySupportText
              supportText="The NRIC and Passport No. may only contain letters and numbers."
            />
          </div>
        </div>
        <div className="address">
          <div className="container-input">
            <InputField
              displayLabel
              label="Registered Address"
              inputProps={{
                placeholder: "6 digit postal code",
                value: dataForm.address,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  onValueChange("address", e?.target?.value),
                maxLength: 6
              }}
              searchable
              onSearch={onSearchAddress}
            />
          </div>
        </div>
        <div className="address-line">
          <InputField
            inputProps={{
              placeholder: "Address line 1",
              value: dataForm.addressLine1,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                onValueChange("addressLine1", e?.target?.value),
            }}
          />
        </div>
        <div className="address-line">
          <InputField
            inputProps={{
              placeholder: "Address line 2",
              value: dataForm.addressLine2,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                onValueChange("addressLine2", e?.target?.value),
            }}
          />
        </div>
        <div className="unit-number">
          <InputField
            inputProps={{
              placeholder: "Unit number",
              value: dataForm.unitNumber,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                onValueChange("unitNumber", e?.target?.value),
            }}
          />
        </div>
        <div className={"btn-container " + (isMobile ? "mgt-40" : "mgt-32")}>
          <div className="btn-wrapper">
            <CustomButton
              size="large"
              icon={
                <div className="btn-icon">
                  {isEnableForm() ? <UndoIconEnabled /> : <UndoIcon />}
                </div>
              }
              onClick={onResetForm}
              disabled={!isEnableForm()}
              className="btn-undo"
            >
              Reset
            </CustomButton>
            <CustomButton
              size="large"
              icon={
                <div className="btn-save-icon">
                  {isFullForm() ? <SaveIconEnabled /> : <SaveIcon />}
                </div>
              }
              disabled={!isFullForm()}
              style={isFullForm() ? { border: "1px solid #6670A2" } : {}}
              className="btn-undo"
              onClick={onFormSave}
            >
              Save
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalFormInput;
