import CardInfo from "generals/CardInfo";
import CustomButton from "generals/Button";
import Modal from "generals/Modal";
import PersonalPreview from "generals/PersonalForm";
import { DataFormInput } from "@module/ExecutorFormInput";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { GlobalDataActions, ProgressActions, UserActions } from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import {
  ExecutorMobileIcon,
  ExecutorDesktopIcon,
  TipIcon,
} from "../../../../public/images";
import ExecutorFormInput from "@module/ExecutorFormInput";
import { IData, IExecutor } from "@constant/data.interface";
import { v4 as uuidv4 } from 'uuid';
interface IPersonalExecutorProps {
  data?: IData;
  firstRender: boolean;
}
const PersonalExecutor = (props: IPersonalExecutorProps) => {
  const { data: categoryData, firstRender } = props;
  const initialDataForm: DataFormInput = {
    legalName: "",
    email: "",
    passport: "",
    relationship: "",
    type: "Main Executor",
    id: uuidv4(),
  };
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFormInput, setEditingFormInput] = useState(initialDataForm);
  const [deletingId, setDeletingId] = useState(null);

  const toDataFormInputExecutors = () => {
    const dataForm: DataFormInput[] = categoryData?.executors?.map((executor: IExecutor) => {
      return {
        email: executor.email || "",
        legalName: executor.full_legal_name || "",
        id: executor.id,
        passport: executor.nric || "",
        relationship: executor.relationship_id || "",
        type: executor.type
      }
    })
    return dataForm || [];
  }

  useEffect(() => {
    setDataForm(toDataFormInputExecutors())
  }, [props])

  const [dataForm, setDataForm] = useState<DataFormInput[]>(toDataFormInputExecutors());

  const width = useSelector(
    createSelector(
      (state: any) => state?.sizeBrowser,
      (sizeBrowser) => sizeBrowser?.width
    )
  );

  useEffect(() => {
    setIsMobile(width < 876)
  }, [width])

  useEffect(() => {
    if (dataForm.length === 2) {
      dispatch(
        ProgressActions.setAmountPercentIncreament(
          {
            amountPercentIncreament: 0,
          },
          () => { }
        )
      );
      dispatch(
        ProgressActions.setPushable(
          {
            pushable: true,
          },
          () => { }
        )
      );
      dispatch(
        ProgressActions.setRouter(
          {
            router: "/personal-beneficiary",
          },
          () => { }
        )
      );
      dispatch(
        ProgressActions.setDisabled(
          {
            disabled: false,
          },
          () => { }
        )
      );
    } else {
      dispatch(
        ProgressActions.setDisabled(
          {
            disabled: true,
          },
          () => { }
        )
      );
    }
  }, [dataForm])

  const onSaveDataFormInput = (data: DataFormInput) => {
    const dataFormCopy = [...dataForm];
    const index = dataFormCopy.findIndex((item) => item.id === data.id);
    const token = localStorage.getItem("accessToken");
    if (token) {
      const dataExecutorRequest: IExecutor = toDataApiExecutor(data);
      (index > -1) ? dispatch(UserActions.updateExecutor(dataExecutorRequest, `${data.id}`, token, () => {
        dataFormCopy[index] = data;
        setDataForm(dataFormCopy);
      })) :
        dispatch(UserActions.createExecutor(dataExecutorRequest, token, (dataExecutor: IExecutor) => {
          data.id = dataExecutor.id;
          dataFormCopy.push(data);
          setDataForm(dataFormCopy);
        }));
    } else {
      if (index > -1) {
        dataFormCopy[index] = data;
      }else {
        data.id = uuidv4();
        dataFormCopy.push(data);
      }
      setDataForm(dataFormCopy);
      dispatch(GlobalDataActions.setExecutor(toApiDataForm(dataFormCopy), () => {

      }));
    }
    setIsEditing(false)
  };

  const toDataApiExecutor = (dataForm: DataFormInput) => {
    return {
      full_legal_name: dataForm?.legalName || "",
      relationship_id: dataForm?.relationship || "",
      email: dataForm?.email || undefined,
      nric: dataForm?.passport || undefined,
      type: dataForm?.type
    }
  }

  const toApiDataForm = (dataForm: DataFormInput[]) => {
    const dataRes: IExecutor[] = dataForm?.map((dataForm: DataFormInput) => {
      return {
        full_legal_name: dataForm.legalName || "",
        relationship_id: dataForm.relationship || "",
        email: dataForm.email || undefined,
        nric: dataForm.passport || undefined,
        type: dataForm?.type,
        id: dataForm?.id
      }
    }).map(item => item)
    return dataRes;
  }

  const onEditCard = (_e: any, id: string) => {
    const editingForm = [...dataForm].find((item) => item.id === id);
    setEditingFormInput(editingForm);
    setIsEditing(true)
  };

  const onAddExecutorAlterNative = () => {
    setEditingFormInput({
      ...initialDataForm,
      type: "Alternate Executor"
    });
    setIsEditing(true)
  };

  const onDeleteCardItem = () => {
    const dataFormCopy = [...dataForm];
    const newFormData = dataFormCopy.filter((item) => item.id != deletingId);
    setDataForm(newFormData);
    setVisibleModalDelete(false);
    if (newFormData.length === 0) {
      dispatch(
        ProgressActions.setDisabled(
          {
            disabled: true,
          },
          () => { }
        )
      );
      setEditingFormInput({
        ...initialDataForm,
        type: "Main Executor"
      });
    }
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(UserActions.deleteExecutor({ is_delete: true }, deletingId, token, () => { }));
    } else {
      dispatch(GlobalDataActions.setExecutor(toApiDataForm(newFormData), () => { }));
    }
    if(editingFormInput?.id === deletingId){
      setIsEditing(false);
    }
  };

  return (
    <div className={"personal-container " + (!isMobile ? "responsive" : "")}>
      <div
        className={
          "personal-wrapper" +
          (isMobile
            ? " personal-wrapper-mobile w-100"
            : " personal-wrapper-desktop w-60")
        }
      >
        <PersonalPreview
          isMobile={isMobile}
          mainIconDesktop={ExecutorDesktopIcon}
          mainIconMobile={ExecutorMobileIcon}
          infoIcon={TipIcon}
          onIconClick={() => setVisibleModal(true)}
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
            "card-form " + (isMobile ? " card-form-mobile" : " card-form-desktop")
          }
        >
          <div className="card-form-wrapper">
            {dataForm?.map((item: DataFormInput) => {
              return (
                <div className="card-item" key={item.id}>
                  <CardInfo
                    name={item.legalName}
                    description={item.type}
                    isMobile={isMobile}
                    hightlightColor={"#E9FAF4"}
                    onEditCard={onEditCard}
                    id={item.id}
                    canDelete={true}
                    onDeleteCardItem={(id: string) => {
                      setDeletingId(id);
                      setVisibleModalDelete(true);
                    }}
                  />
                </div>
              );
            })}

            {((dataForm.length === 0 && !firstRender) || isEditing) && (
              <ExecutorFormInput
                isMobile={isMobile}
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
            centered={!isMobile}
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
            style={isMobile ? { position: "fixed", bottom: "0" } : {}}
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
            style={isMobile ? { position: "fixed", bottom: "0" } : {}}
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
