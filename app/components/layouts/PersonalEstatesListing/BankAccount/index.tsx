import React, {useEffect, useState} from "react";
import {EditOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {Row, Col, Select} from "antd";
import CustomButton from "@generals/Button";
import InputField from "@generals/InputField";
import SelectField from "@generals/SelectField";
import CustomToggle from "@generals/Toggle";
import ModalInfo from "@generals/Modal/ModalInfo";
import {
  BankAccountImage,
  CloudBankAccountIcon,
  ResetIcon,
  SaveIcon,
  TrashEnabledIcon,
  TypesOfOwnershipImage,
} from "@images/index";
import CustomCheckboxInfo from "@generals/Checkbox/CheckboxInfo";
import ModalStep from "@generals/Modal/ModalStep";
import {PersonalEstatesListingActions, ProgressActions} from "@redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import {IData, IMasterdata} from "@constant/data.interface";
import {v4 as uuidv4} from "uuid";
import {limitLength, extractAlpha} from "@util/index";

const {Option} = Select;

const optionsSplash = [
  {
    image: <TypesOfOwnershipImage />,
    title: "Types of Ownership",
    alignContents: "start",
    contents: [
      {
        subTitle: "Solely Ownership",
        content:
          "Only bank accounts under your single name will become part of your estate when you pass on.",
      },
      {
        subTitle: "Joint Ownership",
        content:
          "Jointly owned accounts will only be considered as part of your estate and distributed to your beneficiaries if the joint account holder passes away before you do.",
      },
    ],
  },
];

interface IProps {
  isLogin: boolean;
}

function BankAccountLayout(props: IProps) {
  const {isLogin} = props;
  const dispatch = useDispatch();

  const categoryData = useSelector(
    createSelector(
      (state: any) => state?.category,
      (category: IData) => {
        return category;
      }
    )
  );

  const masterDataReducer = useSelector(
    createSelector(
      (state: any) => state?.masterdata,
      (masterdata: IMasterdata[]) => {
        return masterdata;
      }
    )
  );

  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalSplash, setIsShowModalSplash] = useState(true);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowForm, setIsShowForm] = useState(true);
  const [numberForm, setNumberForm] = useState(1);
  const [listData, setListData] = useState([]);
  const [disabledEdit, setDisabledEdit] = useState(false);
  const [data, setData] = useState({
    id: "",
    bank_id: null,
    account_no: "",
    is_solely: true,
    is_joint: false,
    current_balance: 0,
    account_holder: "",
  });
  // const [isContinue, setIsContinue] = useState(false);
  const [errors, setErrors] = useState({
    account_no: false,
    bank_id: false,
  });
  const [optionBanks, setOptionBanks] = useState([]);

  useEffect(() => {
    if (categoryData?.bank_accounts) {
      setListData(categoryData.bank_accounts);
      setNumberForm(categoryData.bank_accounts.length + 1);
      if (categoryData.bank_accounts.length >= 1 && !data.id) {
        setIsShowForm(false);
        setIsShowModalSplash(false);
      }
    }
  }, [categoryData?.bank_accounts]);

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
      ProgressActions.setRouter(
        {
          router: "/personal-estates-listing/insurance-policy",
        },
        () => {}
      )
    );
    dispatch(
      ProgressActions.setDisabled(
        {
          disabled: false,
        },
        () => {}
      )
    );
  }, []);

  // useEffect(() => {
  //   if (listData.length > 0) {
  //     dispatch(
  //       ProgressActions.setDisabled(
  //         {
  //           disabled: false,
  //         },
  //         () => {}
  //       )
  //     );
  //   }
  // }, [isContinue]);

  useEffect(() => {
    if (masterDataReducer) {
      const tempBanks = [];
      masterDataReducer.map(item => {
        if (item?.value === "BANK") {
          tempBanks.push({
            label: item?.name,
            value: item?.id,
          });
        }
      });
      setOptionBanks(tempBanks);
    }
  }, [masterDataReducer]);

  const handleReset = () => {
    setData({
      id: "",
      bank_id: null,
      account_no: "",
      is_solely: true,
      is_joint: false,
      current_balance: 0,
      account_holder: "",
    });
  };

  const handleResetState = () => {
    setDisabledEdit(false);
    setIsShowDetail(false);
    setIsShowForm(false);
  };

  const handleShowModal = () => {
    setIsShowModal(true);
  };

  const handleOk = () => {
    setIsShowModal(false);
  };

  const handleValidate = () => {
    let isError = false;
    let error = errors;
    if (!data?.bank_id) {
      error.bank_id = true;
      isError = true;
    }
    if (!data?.account_no) {
      error.account_no = true;
      isError = true;
    }
    setErrors(prev => ({...prev, error}));
    return isError;
  };

  const handleSave = () => {
    const checkValidation = handleValidate();
    if (checkValidation) {
      return;
    }
    const submitData = {
      ...data,
      current_balance: Number(data.current_balance),
    };
    if (disabledEdit) {
      // edit
      if (isLogin) {
        dispatch(
          PersonalEstatesListingActions.updateBankAccount(
            submitData.id,
            submitData,
            () => {}
          )
        );
      } else {
        dispatch(
          PersonalEstatesListingActions.updateBankAccountGuest(
            submitData.id,
            submitData,
            () => {}
          )
        );
      }
    } else {
      // create
      if (isLogin) {
        dispatch(
          PersonalEstatesListingActions.createBankAccount(
            submitData,
            property => {
              submitData.id = property.id;
              setListData([...listData, submitData]);
            }
          )
        );
      } else {
        const tempSubmitData = {...submitData, id: uuidv4()};
        dispatch(
          PersonalEstatesListingActions.createBankAccountGuest(
            tempSubmitData,
            () => {}
          )
        );
      }
      setNumberForm(numberForm + 1);
    }
    handleReset();
    handleResetState();
    // if (!isContinue) {
    //   setIsContinue(true);
    // }
  };

  const handleEdit = item => {
    setDisabledEdit(true);
    setIsShowForm(true);
    let tempListData = [...listData];
    setNumberForm(tempListData.findIndex(i => i == item) + 1);
    const findItem = tempListData.find(data => data === item);
    setData(findItem);
  };

  const handleDelete = item => {
    const tempItem = {...item, is_delete: true};
    if (item?.id === data?.id) {
      handleReset();
      handleResetState();
    }
    if (isLogin) {
      dispatch(
        PersonalEstatesListingActions.updateBankAccount(
          tempItem?.id,
          tempItem,
          () => {}
        )
      );
      return;
    }
    dispatch(
      PersonalEstatesListingActions.deleteBankAccountGuest(
        tempItem?.id,
        () => {}
      )
    );
  };

  const handleChangeInput = e => {
    const {name, value} = e.target;
    setErrors(prev => ({...prev, [name]: false}));
    if (name === "account_holder") {
      setData(prev => ({
        ...prev,
        [name]: limitLength(extractAlpha(value), 30),
      }));
      return;
    }
    setData(prev => ({...prev, [name]: limitLength(value, 30)}));
  };

  const handleAddBankAccount = () => {
    if (isShowForm) return;
    setIsShowForm(true);
    setDisabledEdit(false);
  };

  const handleDeleteForm = () => {
    handleReset();
    handleResetState();
  };

  return (
    <>
      {isShowModalSplash && (
        <ModalStep
          show={isShowModalSplash}
          setShow={setIsShowModalSplash}
          options={optionsSplash}
        />
      )}
      <Row className="investments bank-account">
        <Row className="body-investment" justify="center">
          <Row className="main-investment">
            <Col className="info-investment bank-account__bg-common">
              <Row className="info-investment_content">
                <BankAccountImage style={{marginBottom: "48px"}} />
                <Row className="info-investment_investments">
                  <span className="info-investment_1">Bank Account</span>
                  <InfoCircleOutlined
                    onClick={handleShowModal}
                    className="info-investment_icon info-bank-account_icon"
                  />
                </Row>
                <p className="info-investment_2">
                  You can include your cash holdings by listing down your cash
                  accounts in banks which include current accounts, savings
                  accounts and time deposit accounts.
                </p>
              </Row>
              <Row></Row>
            </Col>
            <Col className="input-investment">
              {listData.length > 0 &&
                listData.map((item, index) => {
                  return (
                    <Row className="form-investment mb-32 list-data">
                      <Row justify="space-between" align="middle">
                        <Col className="div-center">
                          <Col className="number-1 div-center bank-account__bg-common">
                            <span>{index + 1}</span>
                          </Col>
                          <Col>
                            <Row className="limit-width">
                              <span className="type">
                                {
                                  masterDataReducer.find(
                                    masterData =>
                                      masterData.id === item?.bank_id
                                  )?.name
                                }
                              </span>
                            </Row>
                            <Row>
                              <span className="financial">
                                {item?.is_solely
                                  ? "Solely Ownership"
                                  : "Joint Ownership"}
                              </span>
                            </Row>
                          </Col>
                        </Col>
                        <Col className="div-center responsive-list-data">
                          <Col className="mr-8 edit-button">
                            <CustomButton
                              width="100%"
                              icon={<EditOutlined />}
                              onClick={() => handleEdit(item)}
                              disabled={disabledEdit}
                            >
                              Edit
                            </CustomButton>
                          </Col>
                          <Col className="trash-icon div-center">
                            <TrashEnabledIcon
                              onClick={() => handleDelete(item)}
                            />
                          </Col>
                        </Col>
                      </Row>
                    </Row>
                  );
                })}
              {isShowForm && (
                <Row className="form-investment mb-32">
                  <Row justify="space-between" align="middle" className="mb-32">
                    <Col className="div-center">
                      <Col className="number-1 div-center bank-account__bg-common">
                        <span>{numberForm}</span>
                      </Col>
                      <Col>
                        <span className="investment-details-text">
                          Bank Details
                        </span>
                      </Col>
                    </Col>
                    <Col className="trash-icon div-center">
                      <TrashEnabledIcon onClick={handleDeleteForm} />
                    </Col>
                  </Row>
                  <Col className="w-full">
                    <Row className="mb-32">
                      <SelectField
                        displayLabel
                        label="Bank"
                        selectProps={{
                          placeholder: "Select",
                          value: data?.bank_id,
                          onChange: value => {
                            setData(prev => ({...prev, bank_id: value}));
                            setErrors(prev => ({...prev, bank_id: false}));
                          },
                        }}
                        isError={errors?.bank_id}
                      >
                        {optionBanks.map(item => {
                          return (
                            <Option value={item.value}>{item.label}</Option>
                          );
                        })}
                      </SelectField>
                    </Row>
                    <Row className="mb-32">
                      <InputField
                        displayLabel
                        label="Account No."
                        inputProps={{
                          placeholder: "e.g. 012345678",
                          value: data?.account_no,
                          name: "account_no",
                          onChange: e => handleChangeInput(e),
                          type: "number",
                        }}
                        isError={errors?.account_no}
                      ></InputField>
                    </Row>
                    <Row className="mb-24">
                      <CustomCheckboxInfo
                        checked={data?.is_solely}
                        onChange={() =>
                          setData(prev => ({
                            ...prev,
                            is_solely: true,
                            is_joint: false,
                          }))
                        }
                        title="Solely Ownership"
                        content="Only bank accounts under your single name will become part of your estate when you pass on."
                      />
                    </Row>
                    <Row className="mb-32">
                      <CustomCheckboxInfo
                        checked={data?.is_joint}
                        onChange={() =>
                          setData(prev => ({
                            ...prev,
                            is_solely: false,
                            is_joint: true,
                          }))
                        }
                        title="Joint Ownership"
                        content="Jointly owned accounts will only be considered as part of your estate and distributed to your beneficiaries if the joint account holder passes away before you do."
                      />
                    </Row>
                    <Row className={isShowDetail ? "mb-32" : "mb-40"}>
                      <CustomToggle
                        onChangeSwitch={() => setIsShowDetail(!isShowDetail)}
                      />
                    </Row>

                    {isShowDetail && (
                      <>
                        <Row className={data?.is_joint ? "mb-32" : "mb-40"}>
                          <InputField
                            displayLabel
                            label="Current Balance ($)"
                            inputProps={{
                              type: "number",
                              placeholder: "0.00",
                              value: data?.current_balance,
                              name: "current_balance",
                              onChange: e => handleChangeInput(e),
                              className: "mb-16",
                            }}
                          ></InputField>
                          <div>
                            <span className="text-info-input">
                              The balances that you inputted into the field will
                              not be reflected in your Will itself. By entering
                              the account balances, you will have a clearer
                              picture of the size of your current estate, and
                              helps you better distribute your assets.
                            </span>
                          </div>
                        </Row>

                        {data?.is_joint && (
                          <>
                            <Row className="mb-40">
                              <InputField
                                displayLabel
                                label="Account Holder Names"
                                inputProps={{
                                  placeholder: "Names",
                                  className: "mb-16",
                                  value: data?.account_holder,
                                  name: "account_holder",
                                  onChange: e => handleChangeInput(e),
                                }}
                              ></InputField>
                              <div>
                                <span className="text-info-input">
                                  Accommodate multiple names including user's
                                </span>
                              </div>
                            </Row>
                          </>
                        )}
                      </>
                    )}
                    <Row justify="center">
                      <Col style={{marginRight: "24px"}}>
                        <CustomButton
                          icon={<ResetIcon />}
                          onClick={handleReset}
                        >
                          Reset
                        </CustomButton>
                      </Col>
                      <Col>
                        <CustomButton icon={<SaveIcon />} onClick={handleSave}>
                          Save
                        </CustomButton>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )}
              <Row className="add-investment" justify="space-between">
                <CloudBankAccountIcon />
                <span
                  onClick={handleAddBankAccount}
                  style={{cursor: "pointer"}}
                >
                  Add Account
                </span>
              </Row>
            </Col>
          </Row>
        </Row>
      </Row>
      {isShowModal && (
        <ModalInfo
          show={isShowModal}
          title="Bank Account"
          content={
            <span>
              Only bank accounts under your single name will become part of your
              estate when you pass on.
              <br />
              <br />
              Jointly owned accounts will only be considered as part of your
              estate and distributed to your beneficiaries if the joint account
              holder passes away before you do.
            </span>
          }
          handleOk={handleOk}
          handleCancel={handleOk}
        />
      )}
    </>
  );
}

export default BankAccountLayout;
