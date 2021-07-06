import PersonalPreview from "generals/PersonalForm";
import PersonalFormInput from "generals/PersonalFormInput";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
const PersonalInformation = () => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);
  return (
    <div className="personal-container">
      <div
        className={
          "personal-wrapper" +
          (mobile ? " personal-wrapper-mobile w-100" : " personal-wrapper-desktop w-60")
        }
      >
        <PersonalPreview isMobile={mobile} />
        <PersonalFormInput isMobile={mobile}/>
      </div>
    </div>
  );
};

export default PersonalInformation;
