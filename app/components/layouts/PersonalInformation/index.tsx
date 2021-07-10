import CardInfo, { CardInfoDataPropsInterface } from "generals/CardInfo";
import CustomButton from "generals/Button";
import Modal from "generals/Modal";
import PersonalPreview from "generals/PersonalForm";
import PersonalFormInput, { DataFormInput } from "@module/PersonalFormInput";
import React, { useEffect, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import router from "next/dist/client/router";
import { ProgressActions } from "../../../../redux/actions";
import { useDispatch } from "react-redux";

const PersonalInformation = () => {
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState(false);
  const [tabled, setTabled] = useState(false);
  const [visibleModal, setVisibleModal] = useState(true);
  const [visibleFormInput, setVisibleFormInput] = useState(true);
  const initialDataCard: CardInfoDataPropsInterface = {
    name: "",
    description: "",
    id: 0,
  };

  const initialDataForm: DataFormInput = {
    legalName: "",
    email: "",
    passport: "",
    address: "",
    addressLine1: "",
    addressLine2: "",
    unitNumber: "",
  };
  const [dataForm, setDataForm] = useState<DataFormInput>(initialDataForm);

  const [dataCard, setDataCard] = useState<CardInfoDataPropsInterface>(
    initialDataCard
  );
  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);

  useEffect(() => {
    setTabled(isTablet);
  }, [isTablet]);

  const onSaveDataFormInput = (data: DataFormInput) => {
    setDataForm(data);
    setVisibleFormInput(false);
    const dataCardCopy = { ...dataCard };
    dataCardCopy.name = data.legalName;
    dataCardCopy.description = data.passport;
    setDataCard(dataCardCopy);
    dispatch(
      ProgressActions.setDisabled(
        {
          disabled: false,
        },
        () => {}
      )
    );
  };

  const percent = useSelector(
    createSelector(
      (state: any) => state?.progress,
      (progress) => progress?.percent
    )
  );

  useEffect(() => {
    if (percent > 0) {
      router.push("/home");
    }
  }, [percent]);

  const onEditCard = (id: number) => {
    setVisibleFormInput(true);
  };
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
        <div
          className={
            "card-form " + (mobile ? " card-form-mobile" : " card-form-desktop")
          }
        >
          <div className="card-form-wrapper">
            {dataCard.name && (
              <div className="card-item">
                <CardInfo
                  name={dataCard.name}
                  description={dataCard.description}
                  isMobile={mobile}
                  hightlightColor={"#FFF5F5"}
                  onEditCard={onEditCard}
                  id={dataCard.id}
                  canDelete={false}
                />
              </div>
            )}
            {visibleFormInput && (
              <PersonalFormInput
                isMobile={mobile}
                onSaveData={onSaveDataFormInput}
                initialValue={dataForm}
              />
            )}
          </div>
        </div>
        <Modal
          centered={!mobile || tabled}
          visible={visibleModal}
          footer={null}
          closable={false}
          className={
            " modal-information " +
            (isMobile ? "modal-mobile " : "modal-desktop ")
          }
          style={mobile && !tabled ? { position: "fixed", bottom: "0" } : {}}
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