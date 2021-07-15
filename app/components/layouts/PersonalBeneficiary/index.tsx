import CardInfo, { CardInfoDataPropsInterface } from "generals/CardInfo";
import CustomButton from "generals/Button";
import Modal from "generals/Modal";
import PersonalPreview from "generals/PersonalForm";
import { DataFormInput } from "@module/BeneficiaryFormInput";
import React, { useEffect, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import router from "next/dist/client/router";
import { ProgressActions } from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import {
  TipIcon,
  BeneficiaryDesktopIcon,
  BeneficiaryMobileIcon,
  SuccessIcon,
  DeleteIcon,
  CloseIcon,
} from "../../../../public/images";
import BeneficiaryFormInput from "@module/BeneficiaryFormInput";

const PersonalBeneficiary = () => {
  let [id, setId] = useState(1);
  const initialDataForm: DataFormInput = {
    legalName: "",
    email: "",
    passport: "",
    relationship: "",
    type: "Main Beneficiary",
    id: id,
  };
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState(false);
  const [tabled, setTabled] = useState(false);
  const [visibleModal, setVisibleModal] = useState(true);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [visibleFormInput, setVisibleFormInput] = useState(true);
  const [editingFormInput, setEditingFormInput] = useState(initialDataForm);
  const [deletingId, setDeletingId] = useState(null);
  const [dataForm, setDataForm] = useState<DataFormInput[]>([]);

  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);

  useEffect(() => {
    setTabled(isTablet);
  }, [isTablet]);

  const onSaveDataFormInput = (data: DataFormInput) => {
    const dataFormCopy = [...dataForm];
    const index = dataFormCopy.findIndex((item) => item.id === data.id);

    if (index > -1) {
      dataFormCopy[index] = data;
    } else {
      dataFormCopy.push(data);
    }
    setDataForm(dataFormCopy);
    setVisibleFormInput(false);
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
      router.push("/personal-beneficiary");
    }
  }, [percent]);

  const onEditCard = (_e: any, id: number) => {
    const editingForm = [...dataForm].find((item) => item.id === id);
    setEditingFormInput(editingForm);
    setVisibleFormInput(true);
  };

  const onAddBeneficiaryAlterNative = () => {
    if (visibleFormInput) {
      return;
    }
    setEditingFormInput({
      ...initialDataForm,
      type: "Alternate Beneficiary",
      id: id,
    });
    setId(++id);
    setVisibleFormInput(true);
  };

  const onDeleteCardItem = () => {
    const dataFormCopy = [...dataForm];
    const newFormData = dataFormCopy.filter((item) => item.id != deletingId);
    setDataForm(newFormData);
    setVisibleModalDelete(false);
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
        <PersonalPreview
          isMobile={mobile}
          mainIconDesktop={BeneficiaryDesktopIcon}
          mainIconMobile={BeneficiaryMobileIcon}
          infoIcon={TipIcon}
          textDescription="You may name 1 or more beneficiaries who you wish to leave your estate to. Each beneficiary will be entitled to a percentage of estate at your discretion."
          title="Beneficiary"
          backgroundColor="#E9F0FF"
          displayButton={false}
        />
        <div
          className={
            "card-form " + (mobile ? " card-form-mobile" : " card-form-desktop")
          }
        >
          <div className="card-form-wrapper">
            {dataForm.map((item: DataFormInput) => {
              return (
                <div className="card-item" key={item.id}>
                  <CardInfo
                    name={item.legalName}
                    description={item.relationship}
                    isMobile={mobile}
                    hightlightColor={"#EFF5FF"}
                    onEditCard={onEditCard}
                    id={item.id}
                    canDelete={true}
                    onDeleteCardItem={(id: number) => {
                      setDeletingId(id);
                      setVisibleModalDelete(true);
                    }}
                  />
                </div>
              );
            })}
            {(visibleFormInput || dataForm.length === 0) && (
              <BeneficiaryFormInput
                isMobile={mobile}
                onSaveData={onSaveDataFormInput}
                initialValue={editingFormInput}
              />
            )}
            <div className="alternative-beneficiary-container">
              <div className="alternative-beneficiary-wrapper">
                <div className="title">💭 Require another beneficiary?</div>
                <div
                  className="add-beneficiary"
                  onClick={onAddBeneficiaryAlterNative}
                >
                  Add More
                </div>
              </div>
            </div>
            <div className="update-beneficiary-success">
              <div className="wrapper">
                <div className="tick">
                  <SuccessIcon />
                </div>
                <div className="title">
                  <span style={{ fontWeight: "bold" }}>Done!</span>
                  <span> Beneficiary has been successfully updated.</span>
                </div>
                <div className="exit"><CloseIcon /></div>
              </div>
            </div>
          </div>
        </div>
        {visibleModal && (
          <Modal
            centered={!mobile || tabled}
            visible={visibleModal}
            footer={
              <div className="btn-wrapper">
                <CustomButton
                  size="large"
                  className="btn-confirm"
                  onClick={() => setVisibleModal(false)}
                >
                  Understood
                </CustomButton>
              </div>
            }
            closable={false}
            className={
              " modal-information " +
              (isMobile
                ? "modal-mobile-beneficiary "
                : "modal-desktop-beneficiary ")
            }
            style={mobile && !tabled ? { position: "fixed", bottom: "0" } : {}}
          >
            <div className="modal-information-wrapper">
              <div className="title">Beneficiarys</div>
              <div className="content">
                <p>
                  The Beneficiary is someone that you have named to receive
                  money or other benefits from your will.
                </p>
                <p>
                  You will be able to change the beneficiaries and the
                  percentage split of your estate in future by establishing a
                  new will.
                </p>
              </div>
            </div>
          </Modal>
        )}
        {visibleModalDelete && (
          <Modal
            centered={true}
            visible={visibleModalDelete}
            wrapClassName="modal-delete"
            footer={
              <div className="btn-wrapper">
                <CustomButton
                  size="large"
                  className="btn-confirm"
                  onClick={onDeleteCardItem}
                >
                  Remove
                </CustomButton>
              </div>
            }
            closable={false}
            className={
              " modal-information " +
              (isMobile
                ? "modal-mobile-beneficiary "
                : "modal-desktop-beneficiary ")
            }
            style={mobile && !tabled ? { position: "fixed", bottom: "0" } : {}}
          >
            <div className="modal-information-wrapper">
              <div className="title">Remove</div>
              <div className="content">
                <p>
                  Are you sure that you want to permanently remove the seleted
                  section?
                </p>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default PersonalBeneficiary;