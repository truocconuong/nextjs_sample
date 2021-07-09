import CardInfo, { CardInfoDataPropsInterface } from "components/CardInfo";
import CustomButton from "generals/Button";
import Modal from "generals/Modal";
import PersonalPreview from "generals/PersonalForm";
import PersonalFormInput from "generals/PersonalFormInput";
import React, { useEffect, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
const PersonalInformation = () => {
  const [mobile, setMobile] = useState(false);
  const [tabled, setTabled] = useState(false);
  const [visibleModal, setVisibleModal] = useState(true);
  const [visibleFormInput, setVisibleFormInput] = useState(true);
  const initialDataCard: CardInfoDataPropsInterface = {
    name: '',
    passport: ''
  }
  const [dataCard, setDataCard] = useState<CardInfoDataPropsInterface>(initialDataCard)
  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);

  useEffect(() => {
    setTabled(isTablet);
  }, [isTablet]);
  const onSaveDataFormInput =(data: any) => {
    console.log("data",)
    setVisibleFormInput(false);
  }
  return (
    <div className={"personal-container " + (!mobile ? "responsive" : "")}>
      <div
        className={
          "personal-wrapper" +
          (mobile
            ? " personal-wrapper-mobile w-100"
            : " personal-wrapper-desktop w-60")
        }
      >
        <PersonalPreview isMobile={mobile} />
        <CardInfo data={dataCard}/>
        {visibleFormInput && <PersonalFormInput isMobile={mobile} onSaveData={onSaveDataFormInput}/>}
        <Modal
          centered={!mobile || tabled}
          visible={visibleModal}
          footer={null}
          closable={false}
          className={" modal-information " + (isMobile ? "modal-mobile " : "modal-desktop ")}
          style={mobile && ! tabled ? {position: "fixed", bottom: "0"} : {}}
        >
          <div className="modal-information-wrapper">
            <div className="title">Personal Information</div>
            <div className="content">
              <p>
                A Testator is someone who makes a will. In this case, you are
                the Testator.
              </p>
              <p>
                You can ensure the completeness of data by opting to retrieve
                your personal data from MyInfo using your Singpass.
              </p>
              <div className="btn-wrapper">
                <CustomButton
                  size="large"
                  className="btn-confirm"
                  onClick={() => setVisibleModal(false)}
                >
                  Understood
                </CustomButton>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default PersonalInformation;
