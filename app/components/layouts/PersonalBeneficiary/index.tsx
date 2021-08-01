import CardInfo, { CardInfoDataPropsInterface } from "generals/CardInfo";
import CustomButton from "generals/Button";
import Modal from "generals/Modal";
import PersonalPreview from "generals/PersonalForm";
import { DataFormInput } from "@module/BeneficiaryFormInput";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import router from "next/dist/client/router";
import { GlobalDataActions, ProgressActions, UserActions } from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import {
  TipIcon,
  BeneficiaryDesktopIcon,
  BeneficiaryMobileIcon,
  SuccessIcon,
  CloseIcon,
} from "../../../../public/images";
import BeneficiaryFormInput from "@module/BeneficiaryFormInput";
import { IBeneficiary, IData, IMasterdata } from "@constant/data.interface";
import { v4 as uuidv4 } from 'uuid';
import { MASTERDATA_TYPE } from "@constant/index";

const PersonalBeneficiary = () => {
  let [count, setCount] = useState(1);
  const categoryData = useSelector(
    createSelector(
      (state: any) => state?.category,
      (category: IData) => {
        return category
      }
    )
  );
  const initialDataForm: DataFormInput = {
    legalName: "",
    email: "",
    passport: "",
    relationship: "",
    count: count,
    id: uuidv4(),
  };

  
  const toDataFormInputBeneficiary = () => {
    const dataForm: DataFormInput[] = categoryData?.beneficiaries?.map((beneficiary: IBeneficiary, index) => {
      return {
        email: beneficiary.email || "",
        legalName: beneficiary.full_legal_name || "",
        id: beneficiary.id,
        passport: beneficiary.nric || "",
        relationship: beneficiary.relationship_id,
        count: index + 1
      }
    })
    return dataForm || [];
  }
  
  const dispatch = useDispatch();
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [visibleFormInput, setVisibleFormInput] = useState(false);
  const [editingFormInput, setEditingFormInput] = useState(initialDataForm);
  const [deletingId, setDeletingId] = useState(null);
  const [dataForm, setDataForm] = useState<DataFormInput[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const width = useSelector(
    createSelector(
      (state: any) => state?.sizeBrowser,
      (sizeBrowser) => sizeBrowser?.width
    )
  );

  useEffect(() => {
    setIsMobile(width < 876);
  }, [width]);

  useEffect(() => {
    const dataForm = toDataFormInputBeneficiary();
    setDataForm(dataForm);
  }, [categoryData])

  useEffect(() => {
    if (dataForm.length === 1) {
      setVisibleFormInput(false)
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
    console.log(categoryData.beneficiaries)
    if (dataForm.length === 0) {
      setVisibleFormInput(true)
    }
    if (dataForm.length > 0) {
      setVisibleFormInput(false)
    }
    setCount(dataForm.length)
  }, [dataForm])

  // useEffect(() => {
  //   console.log("categor data", categoryData)
  //   if (!localStorage.getItem("accessToken") || (!categoryData?.beneficiaries || categoryData?.beneficiaries?.length === 0)) {
  //     console.log("nhay vao day")
  //     setVisibleFormInput(true);
  //   }
  // }, [])

  const toApiDataForm = (dataForm: DataFormInput[]) => {
    const dataRes: IBeneficiary[] = dataForm.map((dataForm: DataFormInput) => {
      return {
        full_legal_name: dataForm.legalName,
        relationship_id: dataForm.relationship,
        email: dataForm.email,
        nric: dataForm.passport
      }
    })
    return dataRes;
  }

  const onSaveDataFormInput = (data: DataFormInput) => {
    const dataFormCopy = [...dataForm];
    const index = dataFormCopy.findIndex((item) => item.id === data.id);

    if (index > -1) {
      dataFormCopy[index] = data;
    }
    
    if (categoryData) {
      const token = localStorage.getItem("accessToken");
      const dataBeneficiary: IBeneficiary= toDataApiBeneficiary(data);
      const found = categoryData?.beneficiaries?.find(item => item.id === data.id);

      (found || index > -1) ? dispatch(UserActions.updateBeneficiary(dataBeneficiary, `${data.id}`, token, () => {
        setDataForm(dataFormCopy);
        setVisibleFormInput(false);
       })) : 
      dispatch(UserActions.createBeneficiary(dataBeneficiary, token, (dataBenefy: IBeneficiary) => {
        data.id = dataBenefy.id;
        dataFormCopy.push(data);
        setDataForm(dataFormCopy);
        setVisibleFormInput(false);
      }));
    } else {
      dataFormCopy.push(data);
      setDataForm(dataFormCopy);
      setVisibleFormInput(false);
      dispatch(GlobalDataActions.setBeneficiary(toApiDataForm(dataFormCopy), () => {}));
    }
  };

  
  const toDataApiBeneficiary = (dataForm: DataFormInput) => {
    return {
      full_legal_name: dataForm?.legalName || "",
      relationship_id: dataForm?.relationship || "",
      email: dataForm?.email || undefined,
      nric: dataForm?.passport || undefined,
    }
  }

  useEffect(() => {
    dispatch(
      ProgressActions.setPushable(
        {
          pushable: true,
        },
        () => { }
      )
    );
    dispatch(
      ProgressActions.setAmountPercentIncreament(
        {
          amountPercentIncreament: 10,
        },
        () => { }
      )
    );
    dispatch(
      ProgressActions.setRouter(
        {
          router: "/personal-estates-listing/property",
        },
        () => { }
      )
    );
  }, [])


  const onEditCard = (_e: any, id: string) => {
    const editingForm = [...dataForm].find((item) => item.id === id);
    setEditingFormInput(editingForm);
    setVisibleFormInput(true);
  };

  const onAddBeneficiaryAlterNative = () => {
    const newCount = ++count;
    setCount(newCount);
    if (visibleFormInput) {
      return;
    }
    setEditingFormInput({
      ...initialDataForm,
      count: newCount
    });
    setVisibleFormInput(true);
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
      });
    }
    if (categoryData) {
      const token = localStorage.getItem("accessToken");
      dispatch(UserActions.deleteBeneficiary({is_delete: true}, deletingId, token, () => { }));
    } else {
      dispatch(GlobalDataActions.setBeneficiary(toApiDataForm(newFormData), () => { }));
    }
  };

  const masterdata = useSelector(
    createSelector(
      (state: any) => state?.masterdata,
      (masterdata: IMasterdata[]) => masterdata
    )
  );

  const getRelationship = (id: string) => {
    console.log("id", id)
    console.log("master data", masterdata)
    const found = masterdata.filter(item => item.value === MASTERDATA_TYPE.RELATIONSHIP).find(item => item.id === id);
    return found?.name;
  }

  console.log("data form,,", dataForm)

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
          onIconClick={() => setVisibleModal(true)}
          isMobile={isMobile}
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
            "card-form " +
            (isMobile ? " card-form-mobile" : " card-form-desktop")
          }
        >
          <div className="card-form-wrapper">
            {dataForm.map((item: DataFormInput) => {
              return (
                <div className="card-item" key={item.id}>
                  <CardInfo
                    name={item.legalName}
                    description={getRelationship(item.relationship)}
                    isMobile={isMobile}
                    hightlightColor={"#EFF5FF"}
                    onEditCard={onEditCard}
                    id={item.id}
                    canDelete={true}
                    hightlightText={item.count}
                    onDeleteCardItem={(id: string) => {
                      setDeletingId(id);
                      setVisibleModalDelete(true);
                    }}
                  />
                </div>
              );
            })}
            {visibleFormInput && (
              <BeneficiaryFormInput
                isMobile={isMobile}
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
            {false && (
              <div className="update-beneficiary-success">
                <div className="wrapper">
                  <div className="tick">
                    <SuccessIcon />
                  </div>
                  <div className="title">
                    <span style={{ fontWeight: "bold" }}>Done!</span>
                    <span> Beneficiary has been successfully updated.</span>
                  </div>
                  <div className="exit">
                    <CloseIcon />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {visibleModal && (
          <Modal
            centered={true}
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
            style={isMobile ? { position: "fixed", bottom: "0" } : {}}
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

export default PersonalBeneficiary;
