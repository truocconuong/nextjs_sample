import CardInfo, {CardInfoDataPropsInterface} from "generals/CardInfo";
import CustomButton from "generals/Button";
import Modal from "generals/Modal";
import PersonalPreview from "generals/PersonalForm";
import PersonalFormInput, {DataFormInput} from "@module/PersonalFormInput";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {createSelector} from "reselect";
import {
  CategoryActions,
  ProgressActions,
  SingpassActions,
  UserActions,
} from "../../../../redux/actions";
import {useDispatch} from "react-redux";
import {
  PersonalIcon,
  PersonalMobileIcon,
  TipIcon,
} from "../../../../public/images";
import {IData, IPersonalInformation, ISingpassGetEnv, ISingpassPersonalData} from "@constant/data.interface";
import {v4 as uuidv4} from "uuid";
import router from "next/router";
import { NotificationWarning } from "@generals/notifications";
import { saveCategoriesData } from "@redux/actions/category";
const PersonalInformation = () => {
  const dispatch = useDispatch();
  const [visibleModal, setVisibleModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleFormInput, setVisibleFormInput] = useState(true);
  const initialDataCard: CardInfoDataPropsInterface = {
    name: "",
    description: "",
    id: uuidv4(),
  };

  const [dataForm, setDataForm] = useState<DataFormInput>({
    legalName: "",
    email: "",
    passport: "",
    address: "",
    addressLine1: "",
    addressLine2: "",
    unitNumber: "",
  });

  const categoryData = useSelector(
    createSelector(
      (state: any) => state?.category,
      (category: IData) => {
        return category;
      }
    )
  );

  const width = useSelector(
    createSelector(
      (state: any) => state?.sizeBrowser,
      sizeBrowser => sizeBrowser?.width
    )
  );

  useEffect(() => {
    setTimeout(() => {
      window?.scrollTo({top: 0, behavior: "smooth"});
    })
  }, [])

  useEffect(() => {
    setIsMobile(width < 768);
  }, [width]);

  useEffect(() => {
    dispatch(
      ProgressActions.setPushable(
        {
          pushable: true,
        },
        () => {}
      )
    );

    dispatch(
      ProgressActions.setDisabled(
        {
          disabled: categoryData?.full_legal_name?.length === 0,
        },
        () => {}
      )
    );

    dispatch(
      ProgressActions.setRouter(
        {
          router: "/personal-executor",
        },
        () => {}
      )
    );
  }, []);

  useEffect(() => {
    const initialDataForm: DataFormInput = {
      legalName: categoryData?.full_legal_name || "",
      email: categoryData?.email_personal || "",
      passport: categoryData?.nric || "",
      address: categoryData?.postal_code || "",
      addressLine1: categoryData?.address_line_1 || "",
      addressLine2: categoryData?.address_line_2 || "",
      unitNumber: categoryData?.unit_number || "",
    };
    setDataForm({...initialDataForm});
  }, [categoryData]);

  const [dataCard, setDataCard] = useState<CardInfoDataPropsInterface>(
    initialDataCard
  );

  const onSaveDataFormInput = (data: DataFormInput) => {
    setDataForm(data);
    setVisibleFormInput(false);
    const dataCardCopy = {...dataCard};
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
    const token = localStorage.getItem("accessToken");
    if (token) {
      const dataUpdate: IPersonalInformation = toDataApiUpdatePersonalInformation(
        data
      );
      dispatch(
        UserActions.updatePersonalInformation(
          dataUpdate,
          categoryData.id,
          token,
          () => {}
        )
      );
    } else {
      dispatch(CategoryActions.setPersonalInformation(data, () => {}));
    }
  };

  useEffect(() => {
    const isErrorSingpass = localStorage.getItem("hasErrorSingpass");
    if(isErrorSingpass === "true"){
      NotificationWarning("An error occurred while retrieving information from Singpass");
    }
  }, [])

  const toDataApiUpdatePersonalInformation = (data: DataFormInput) => {
    return {
      full_legal_name: data.legalName,
      email_personal: data.email,
      postal_code: data.address,
      address_line_1: data.addressLine1,
      address_line_2: data.addressLine2,
      nric: data.passport,
      unit_number: data.unitNumber,
    };
  };

  const onGetUserInformationBySingpass = () => {
    const purpose = "Get Information From Singpass";
    const authoriseUrl = singpassEnv._authApiUrl + "?client_id=" + singpassEnv._clientId +
      "&attributes=" + singpassEnv._attributes +
      "&purpose=" + purpose +
      "&state=" + encodeURIComponent("123") +
      "&redirect_uri=" + singpassEnv._redirectUrl;
    router?.push(authoriseUrl);
  }

  useEffect(() => {
    const singpassCode = localStorage.getItem("code");
    if(singpassCode){
      dispatch(SingpassActions.getSingpassEnv)
    }
  }, [])

  const singpassEnv = useSelector(
    createSelector(
      (state: any) => state?.singpass,
      (singpass: ISingpassGetEnv) => {
        return singpass;
      }
    )
  );

  const singpassPersonalInformation = useSelector(
    createSelector(
      (state: any) => state?.singpasPersonal,
      (singpasPersonal: ISingpassPersonalData) => {
        return singpasPersonal;
      }
    )
  );

  useEffect(() => {
    dispatch(SingpassActions.getSingpassEnv(null, (res) => {
    }))
  }, [])

  const onEditCard = (id: number) => {
    setVisibleFormInput(true);
  };


  useEffect(() => {
    if(singpassPersonalInformation){
      const newCategoryData: IData = {
        ...categoryData,
        full_legal_name: singpassPersonalInformation?.name?.value,
      }

      dispatch(saveCategoriesData(newCategoryData));
    }
  }, [])
  const classNameWrapper =
    "personal-wrapper" +
    (isMobile
      ? " personal-wrapper-mobile w-100"
      : " personal-wrapper-desktop w-60");
  return (
    <div className={"personal-container " + (!isMobile ? "responsive" : "")}>
      <div className={classNameWrapper}>
        <PersonalPreview
          isMobile={isMobile}
          mainIconDesktop={PersonalIcon}
          mainIconMobile={PersonalMobileIcon}
          displayButton
          infoIcon={TipIcon}
          onIconClick={() => setVisibleModal(true)}
          textDescription={
            "In order to prevent possible challenges to your identity as the testator, please ensure that you state your Legal Name, NRIC Number and Address as per your NRIC."
          }
          title="Personal Information"
          textButton="Retrieve Myinfo with Singpass"
          backgroundColor="#ffede9"
          onGetUserInformationBySingpass={onGetUserInformationBySingpass}
        />
        <div
          className={
            "card-form " +
            (isMobile ? " card-form-mobile" : " card-form-desktop")
          }
        >
          <div className="card-form-wrapper">
            {dataCard.name && (
              <div className="card-item">
                <CardInfo
                  name={dataCard.name}
                  description={dataCard.description}
                  isMobile={isMobile}
                  hightlightColor={"#FFF5F5"}
                  onEditCard={onEditCard}
                  id={dataCard.id}
                  canDelete={false}
                />
              </div>
            )}
            {visibleFormInput && (
              <PersonalFormInput
                isMobile={isMobile}
                onSaveData={onSaveDataFormInput}
                initialValue={dataForm}
              />
            )}
          </div>
        </div>
        <Modal
          centered={!isMobile}
          visible={visibleModal}
          footer={null}
          closable={false}
          className={
            " modal-information " +
            (isMobile ? "modal-mobile " : "modal-desktop ")
          }
          style={isMobile ? {position: "fixed", bottom: "0"} : {}}
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
