import CardInfo, { CardInfoDataPropsInterface } from "generals/CardInfo";
import CustomButton from "generals/Button";
import Modal from "generals/Modal";
import PersonalPreview from "generals/PersonalForm";
import { DataFormInput } from "@module/ExecutorFormInput";
import React, { useEffect, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import router from "next/dist/client/router";
import { ProgressActions } from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import {
  ExecutorMobileIcon,
  ExecutorDesktopIcon,
  TipIcon,
} from "../../../../public/images";
import ExecutorFormInput from "@module/ExecutorFormInput";

const PersonalExecutor = () => {
  const initialDataForm: DataFormInput = {
    legalName: "",
    email: "",
    passport: "",
    relationship: "",
    type: "Main Executor",
    id: 0,
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
      router.push("/personal-executor");
    }
  }, [percent]);

  const onEditCard = (_e: any, id: number) => {
    const editingForm = [...dataForm].find((item) => item.id === id);
    setEditingFormInput(editingForm);
    setVisibleFormInput(true);
  };

  const onAddExecutorAlterNative = () => {
    if (visibleFormInput) {
      return;
    }
    setEditingFormInput({
      ...initialDataForm,
      type: "Alternate Executor",
      id: ++initialDataForm.id,
    });
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
          mainIconDesktop={ExecutorDesktopIcon}
          mainIconMobile={ExecutorMobileIcon}
          infoIcon={TipIcon}
          textDescription={
            "The executor is someone above 21 years old that you have identified to legally carry out your will and the execution of your wishes in your will."
          }
          title="Executors"
          textButton="The executor is someone above 21 years old that you have identified to legally carry out your will and the execution of your wishes in your will."
          backgroundColor="#E9FAF4"
          displayButton={false}
        />
        <div
          className={
            "card-form " + (mobile ? " card-form-mobile" : " card-form-desktop")
          }
        >
          <div className="card-form-wrapper">
            {dataForm.map((item: DataFormInput) => {
              console.log("item");
              return (
                <div className="card-item" key={item.id}>
                  <CardInfo
                    name={item.legalName}
                    description={item.type}
                    isMobile={mobile}
                    hightlightColor={"#E9FAF4"}
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
              <ExecutorFormInput
                isMobile={mobile}
                onSaveData={onSaveDataFormInput}
                initialValue={editingFormInput}
              />
            )}
            {dataForm.length < 2 ? (
              <div className="alternative-executor-container">
                <div className="alternative-executor-wrapper">
                  <div className="title">💭 Require an alternate executor?</div>
                  <div
                    className="add-executor"
                    onClick={onAddExecutorAlterNative}
                  >
                    Add Executor
                  </div>
                </div>
              </div>
            ) : (
              <div className="limit-executor-container">
                <div className="limit-executor-wrapper">
                  <div className="title">
                    💭 You’ve reached the maximum number of executors
                  </div>
                </div>
              </div>
            )}
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
              (isMobile ? "modal-mobile-executor " : "modal-desktop-executor ")
            }
            style={mobile && !tabled ? { position: "fixed", bottom: "0" } : {}}
          >
            <div className="modal-information-wrapper">
              <div className="title">Executors</div>
              <div className="content">
                <p>1. The roles of an Executor</p>
                <p>
                  (a) The Executor will administer and distribute your estate*
                  according to your wishes in your will upon your death
                </p>
                <p>
                  (b) The Executor will also represent the estate in any probate
                  proceedings
                </p>
                <p>
                  (c) The Executor will usually also be the “trustee” of your
                  estate. A trustee has the power to hold your estate upon your
                  death and will hold any assets, invest or use any money for
                  the benefit of your beneficiaries who are minors (under the
                  age of 21 years old).
                </p>
                <p>
                  *Estate is essentially everything you own from bank accounts,
                  CPF, stocks, shares, property, insurance policies and
                  belongings, after gifts, taxes, debts and expenses have been
                  taken out.
                </p>
                <p>
                  2. Changing of Executors It is common to change Executors of
                  wills. You may change your Executor at any point in future by
                  creating a new will.
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
              (isMobile ? "modal-mobile-executor " : "modal-desktop-executor ")
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

export default PersonalExecutor;