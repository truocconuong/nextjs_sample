import CustomButton from "generals/Button";
import React from "react";

interface PersonalFormProps {
  isMobile?: boolean;
  mainIconDesktop: any;
  mainIconMobile: any;
  infoIcon: string;
  textDescription: string;
  title: string;
  textButton?: string;
  backgroundColor: string;
  displayButton?: boolean;
  onIconClick: () => void;
  onGetUserInformationBySingpass?: () => void;
}
const PersonalForm = (props: PersonalFormProps) => {
  const {
    isMobile,
    mainIconDesktop: MainIconDesktop,
    mainIconMobile: MainIconMobile,
    infoIcon: TipIcon,
    title,
    textDescription,
    textButton,
    backgroundColor,
    displayButton,
    onIconClick,
    onGetUserInformationBySingpass
  } = props;
  return (
    <div
      className={
        "personal-form-container " +
        (isMobile ? "personal-form-mobile" : "personal-form-desktop ")
      }
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="personal-form-wrapper">
        <div className={"icon-personal " + (isMobile ? "mgt-40" : "mgt-47")}>
          {isMobile ? <MainIconMobile /> : <MainIconDesktop />}
        </div>
        <div className="ps-title-wrap">
          <div className={"ps-title " + (isMobile ? "fs-24" : "fs-32")}>
            {title}
          </div>
          <div className="ps-icon" onClick={onIconClick}>
            <TipIcon />
          </div>
        </div>
        <div className={"description " + (isMobile ? "fs-16" : "fs-20")}>
          {textDescription}
        </div>
        {displayButton &&
          <div className="btn-input-info-wrap">
            <CustomButton type="primary" className="btn-input-info" onClick={onGetUserInformationBySingpass}>
              {textButton}
            </CustomButton>
          </div>
        }
      </div>
    </div>
  );
};

export default PersonalForm;
