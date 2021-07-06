import CustomButton from "generals/Button";
import React from "react";
import { PersonalIcon, TipIcon } from "../../../public/images";

interface PersonalFormProps {
  isMobile?: boolean;
}
const PersonalForm = (props: PersonalFormProps) => {
  const { isMobile } = props;
  return (
    <div
      className={
        "personal-form-container " +
        (isMobile ? "personal-form-mobile" : "personal-form-desktop ")
      }
    >
      <div className="personal-form-wrapper">
        <div className="icon-personal">
          <PersonalIcon />
        </div>
        <div className="ps-title-wrap">
          <div className="ps-title">Personal Information</div>
          <div className="ps-icon">
            <TipIcon />
          </div>
        </div>
        <div className="description">
          In order to prevent possible challenges to your identity as the
          testator, please ensure that you state your Legal Name, NRIC Number
          and Address as per your NRIC.
        </div>
        <div className="btn-input-info-wrap">
          <CustomButton type="primary" className="btn-input-info">
            Retrieve Myinfo with Singpass
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default PersonalForm;
