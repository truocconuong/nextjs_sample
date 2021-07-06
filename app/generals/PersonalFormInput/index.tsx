import React from "react";
interface PersonalFormPropsInterface {
  isMobile?: boolean;
}
const PersonalFormInput = (props: PersonalFormPropsInterface) => {
  const { isMobile } = props;
  return (
    <div
      className={
        "personal-form-input-container" +
        (isMobile
          ? " personal-form-input-mobile"
          : " personal-form-input-desktop")
      }
    >
      <div className="personal-form-input-wrapper">aaaaaaaa</div>
    </div>
  );
};

export default PersonalFormInput;
