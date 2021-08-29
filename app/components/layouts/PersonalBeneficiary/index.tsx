import CardInfo, { CardInfoDataPropsInterface } from "generals/CardInfo";
import CustomButton from "generals/Button";
import Modal from "generals/Modal";
import PersonalPreview from "generals/PersonalForm";
import { DataFormInput } from "@module/BeneficiaryFormInput";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { CategoryActions, ProgressActions, UserActions } from "../../../../redux/actions";
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
interface IPersonalBeneficiaryProps {
  data?: IData;
  firstRender: boolean;
}
const PersonalBeneficiary = (props: IPersonalBeneficiaryProps) => {
  const { data: categoryData, firstRender } = props;
  let [count, setCount] = useState(1);

  const initialDataForm: DataFormInput = {
    legalName: "",
    email: "",
    passport: "",
    relationship: "",
    count: count,
    id: uuidv4(),
  };

  const dispatch = useDispatch();
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [editingFormInput, setEditingFormInput] = useState(initialDataForm);
  const [deletingId, setDeletingId] = useState(null);
  const [dataForm, setDataForm] = useState<DataFormInput[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const width = useSelector(
    createSelector(
      (state: any) => state?.sizeBrowser,
      (sizeBrowser) => sizeBrowser?.width
    )
  );

  useEffect(() => {
    setDataForm(toDataFormInputBeneficiary())
  }, [props])

  useEffect(() => {
    setIsMobile(width < 876);
  }, [width]);

  useEffect(() => {
    if (dataForm.length > 0) {
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
            router: "/allocation",
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
    setCount(dataForm.length)
  }, [dataForm])

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

  const toApiDataForm = (dataForm: DataFormInput[]) => {
    const dataRes: IBeneficiary[] = dataForm.map((dataForm: DataFormInput) => {
      return {
        full_legal_name: dataForm.legalName,
        relationship_id: dataForm.relationship,
        email: dataForm.email,
        nric: dataForm.passport,
        id: dataForm?.id,
        percent: 0
      }
    })
    return dataRes;
  }

  const onSaveDataFormInput = (data: DataFormInput) => {
    const dataFormCopy = [...dataForm];
    const index = dataFormCopy.findIndex((item) => item.id === data.id);
    const token = localStorage.getItem("accessToken");
    if (token) {
      const dataBeneficiaryRequest: IBeneficiary = toDataApiBeneficiary(data);
      (index > -1) ? dispatch(UserActions.updateBeneficiary(dataBeneficiaryRequest, `${data.id}`, token, () => {
        dataFormCopy[index] = data;
        setDataForm(dataFormCopy);
      })) :
        dispatch(UserActions.createBeneficiary(dataBeneficiaryRequest, token, (dataBeneficiary: IBeneficiary) => {
          data.id = dataBeneficiary.id;
          dataFormCopy.push(data);
          setDataForm(dataFormCopy);
        }));
    } else {
      if (index > -1) {
        dataFormCopy[index] = data;
      } else {
        data.id = uuidv4();
        dataFormCopy.push(data);
      }
      setDataForm(dataFormCopy);
      dispatch(CategoryActions.setBeneficiary(toApiDataForm(dataFormCopy), () => {

      }));
    }
    dispatch(
      ProgressActions.setDisabled(
        {
          disabled: false,
        },
        () => { }
      )
    );
    setIsEditing(false)
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
    setIsEditing(true)
  };

  const onAddBeneficiary = () => {
    const newCount = ++count;
    setCount(newCount);
    setEditingFormInput({
      ...initialDataForm,
      count: newCount
    });
    setIsEditing(true)
  };

  const onDeleteCardItem = () => {
    const dataFormCopy = [...dataForm];
    const newFormData = dataFormCopy.filter((item) => item.id != deletingId);
    setNewDataItems(newFormData);
    setVisibleModalDelete(false);
    if (newFormData.length === 0) {
      setEditingFormInput({
        ...initialDataForm,
      });
    }
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(UserActions.deleteBeneficiary({ is_delete: true }, deletingId, token, () => { }));
    } else {
      dispatch(CategoryActions.setBeneficiary(toApiDataForm(newFormData), () => { }));
    }
    if (editingFormInput?.id === deletingId) {
      setIsEditing(false);
    }
  };

  const setNewDataItems = (newFormData: DataFormInput[]) => {
    newFormData.map((item, index) => {
      item.count = index + 1;
    })
    setDataForm(newFormData)
  }

  const masterdata = useSelector(
    createSelector(
      (state: any) => state?.masterdata,
      (masterdata: IMasterdata[]) => masterdata
    )
  );

  const getRelationship = (id: string) => {
    const found = masterdata.filter(item => item.value === MASTERDATA_TYPE.RELATIONSHIP).find(item => item.id === id);
    return found?.name;
  }

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
            {((dataForm.length === 0 && !firstRender) || isEditing) && (
              <BeneficiaryFormInput
                isMobile={isMobile}
                onSaveData={onSaveDataFormInput}
                initialValue={editingFormInput}
                setIsShowFormInput={setIsEditing}
              />
            )}
            <div className="alternative-beneficiary-container">
              <div className="alternative-beneficiary-wrapper">
                <div className="title">💭 Require another beneficiary?</div>
                <div
                  className="add-beneficiary"
                  onClick={onAddBeneficiary}
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
            closable={true}
            onClose={() => setVisibleModalDelete(false)}
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
