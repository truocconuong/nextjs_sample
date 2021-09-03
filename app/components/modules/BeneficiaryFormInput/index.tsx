import { MASTERDATA_TYPE } from "@constant/index";
import { IMasterdata } from "@constant/data.interface";
import { isEmail } from "@util/index";
import { Select } from "antd";
import CustomButton from "generals/Button";
import InputField from "generals/InputField";
import SelectField from "generals/SelectField";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  SaveIcon,
  UndoIcon,

  SaveIconEnabled,
  UndoIconEnabled,
  IconExit,
} from "../../../../public/images";
const { Option } = Select;
interface BeneficiaryPropsInterface {
  isMobile?: boolean;
  onSaveData: (data: any, relationshipName: string) => void;
  initialValue: DataFormInput;
  setIsShowFormInput: React.Dispatch<React.SetStateAction<boolean>>
}

export interface DataFormInput {
  legalName: string;
  email: string;
  passport: string;
  relationship: string;
  id: string;
  count?: number;
}
const BeneficiaryFormInput = (props: BeneficiaryPropsInterface) => {
  const { isMobile, onSaveData, initialValue, setIsShowFormInput } = props;
  const initialState: DataFormInput = {
    legalName: "",
    relationship: "",
    passport: "",
    email: "",
    id: initialValue.id,
  };

  const [relationships, setRelationShips] = useState<IMasterdata[]>([]);


  const masterdata = useSelector(
    createSelector(
      (state: any) => state?.masterdata,
      (masterdata: IMasterdata[]) => masterdata
    )
  );

  useEffect(() => {
    const relationships = masterdata.filter(item => item.value === MASTERDATA_TYPE.RELATIONSHIP);
    setRelationShips(relationships);
  }, [])

  useEffect(() => {
    setDataForm(initialValue)
  }, [initialValue])

  const [dataForm, setDataForm] = useState<DataFormInput>(initialValue);

  const onValueChange = (key: string, value: string) => {
    const newDataForm = { ...dataForm };
    newDataForm[key] = value;
    setDataForm(newDataForm);
  };

  const onResetForm = () => {
    setDataForm(initialState);
  };

  const isEnableForm = () => {
    const dataFormCopy = { ...dataForm };
    for (let key in dataFormCopy) {
      if (key === "type" || key === "id") {
        continue;
      } else {
        if (dataFormCopy[key]) {
          return true;
        }
      }
    }
    return false;
  };

  const isFullForm = () => {
    const dataFormCopy = { ...dataForm };
    if (dataFormCopy.email && !isEmail(dataFormCopy.email)) {
      return false;
    }
    for (let key in dataFormCopy) {
      if (key === 'id' || key === "type" || key === "email" || key === "passport") {
        continue;
      }
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
    const relationshipName = relationships.find(item => item.id === dataForm.relationship);
    onSaveData(dataForm, relationshipName?.name);
  };

  return (
    <div className={"beneficiary-form-input-container"}>
      <div className="close-icon" onClick={() => setIsShowFormInput(false)}><IconExit /></div>
      <div className="beneficiary-form-input-wrapper">
        <div className="title-form">
          <div className="step"><span>{initialValue.count}</span></div>
          <div className="title">{initialValue.email ? "Update" : "Beneficiary Details"}</div>
        </div>
        <div className="legal-name">
          <div className="container-input">
            <InputField
              displayLabel
              label="Your Beneficiary Full Legal Name"
              inputProps={{
                placeholder: "e.g. Ken Chan",
                value: dataForm.legalName,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  onValueChange("legalName", e?.target?.value),
              }}
              wrapperClassName="wrapper-class"
            />
          </div>
        </div>
        <div className="relationship">
          <div className="container-input">
            <SelectField
              displayLabel
              label="Relationship"
              selectProps={{
                value: dataForm.relationship || undefined,
                placeholder: "Select",
                onChange: (value) => onValueChange("relationship", value),
                filterOption: (input, option) => {
                  return option?.children?.toLowerCase()?.indexOf(input.toLowerCase()) >= 0
                }
              }}
              searchable
            >
              {
                relationships.map((relationship) => <Option key={relationship.id} value={relationship.id}>{relationship.name}</Option>)
              }
            </SelectField>
          </div>
        </div>
        <div className="wrap-mor-infor">
          <div className="skip"><span>👍</span> Skip Now, Fill Later</div>
          <div className="description">These information still required to complete your Will</div>
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
                limitLines={5}
                displaySupportText
                supportText="The NRIC and Passport No. may only contain letters and numbers."
              />
            </div>
          </div>
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

export default BeneficiaryFormInput;
