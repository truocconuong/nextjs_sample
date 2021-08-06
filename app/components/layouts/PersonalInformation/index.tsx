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
  UserActions,
} from "../../../../redux/actions";
import {useDispatch} from "react-redux";
import {
  PersonalIcon,
  PersonalMobileIcon,
  TipIcon,
} from "../../../../public/images";
import {IData, IPersonalInformation} from "@constant/data.interface";
import {v4 as uuidv4} from "uuid";
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

  const width = useSelector(
    createSelector(
      (state: any) => state?.sizeBrowser,
      sizeBrowser => sizeBrowser?.width
    )
  );

  useEffect(() => {
    setIsMobile(width < 768);
  }, [width]);

  useEffect(() => {
    dispatch(
      ProgressActions.setPercent(
        {
          percent: 20,
        },
        () => {}
      )
    );
    dispatch(
      ProgressActions.setPushable(
        {
          pushable: true,
        },
        () => {}
      )
    );
    dispatch(
      ProgressActions.setAmountPercentIncreament(
        {
          amountPercentIncreament: 0,
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

  const categoryData = useSelector(
    createSelector(
      (state: any) => state?.category,
      (category: IData) => {
        return category;
      }
    )
  );

  useEffect(() => {
    const initialDataForm: DataFormInput = {
      legalName: categoryData?.full_legal_name || "",
      email: categoryData?.email || "",
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

  const toDataApiUpdatePersonalInformation = (data: DataFormInput) => {
    return {
      full_legal_name: data.legalName,
      email: data.email,
      postal_code: data.address,
      address_line_1: data.addressLine1,
      address_line_2: data.addressLine2,
      nric: data.passport,
      unit_number: data.unitNumber,
    };
  };

  const onEditCard = (id: number) => {
    setVisibleFormInput(true);
  };
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
