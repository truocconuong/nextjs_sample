import {EditOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {Row, Col, Select} from "antd";
import CustomButton from "generals/Button";
import InputField from "generals/InputField";
import SelectField from "generals/SelectField";
import CustomToggle from "generals/Toggle";
import React, {useEffect, useState} from "react";
import ModalInfo from "generals/Modal/ModalInfo";
import {
  CloudPropertyIcon,
  PersonalEstatesListingImage,
  PropertyImage,
  ResetIcon,
  SaveIcon,
  TrashEnabledIcon,
  TypesOfOwnershipImage,
} from "@images/index";
import SelectCountry from "generals/SelectCountry";
import CustomCheckboxInfo from "generals/Checkbox/CheckboxInfo";
import CustomDatePicker from "generals/DatePicker";
import moment from "moment";
import ModalStep from "generals/Modal/ModalStep";
import {useDispatch, useSelector} from "react-redux";
import {ProgressActions, PersonalEstatesListingActions} from "@redux/actions";
import {getAddress} from "onemap-address-search-singapore";
import {createSelector} from "reselect";
import {IData, IMasterdata, IProperty} from "@constant/data.interface";
import _ from "lodash";
import {v4 as uuidv4} from "uuid";
import {limitLength} from "@util/index";

const {Option} = Select;

const optionsSplash = [
  {
    image: <PersonalEstatesListingImage />,
    title: "Personal Estates Listing",
    contents: [
      {
        content:
          "Your loved ones may not be fully aware of all your possessions. It is a good practise to regularly update your assets in the Personal Estate Listing to ensure your beneficiaries can fully inherit your legacy.",
      },
    ],
  },
  {
    image: <TypesOfOwnershipImage />,
    title: "Types of Ownership",
    alignContents: "start",
    contents: [
      {
        subTitle: "Solely Ownership",
        content:
          "If you pass on with an outstanding mortgage and without life insurance, your family may be left without  a roof if they are unable to service the loan.",
      },
      {
        subTitle: "Joint Ownership",
        content:
          "Only real estate that is solely under your name will become part of your estate when you pass on. Jointly-owned properties will go to the survivor by default and will not be part of your estate.",
      },
    ],
  },
];

interface IProps {
  isLogin: boolean;
}

function PropertyLayout(props: IProps) {
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
  const [data, setData] = useState<IProperty>({
    id: "",
    country: "",
    is_solely: true,
    is_joint: false,
    postal_code: "",
    address_line_1: "",
    address_line_2: "",
    unit_number: "",
    tenure: 0,
    current_bank_loan_id: null,
    type_id: null,
    remaining_loan_tenure: 0,
    joint_name: "",
    joint_contact: "",
    loan_start_date: null,
    loan_end_date: null,
    year_loan_taken: 0,
    interest_rate: 0,
    outstanding_loan_amount: 0,
    is_delete: false,
  });
  // const [isContinue, setIsContinue] = useState(true);
  const [errors, setErrors] = useState({
    postal_code: false,
    country: false,
  });
  const [optionTypes, setOptionTypes] = useState([]);
  const [optionBanks, setOptionBanks] = useState([]);

  useEffect(() => {
    if (categoryData?.properties) {
      const temp = categoryData?.properties.map(item => ({
        ...item,
        loan_start_date:
          item?.loan_start_date !== null
            ? moment(item?.loan_start_date).format("DD/MM/YYYY")
            : "",
        loan_end_date:
          item?.loan_end_date !== null
            ? moment(item?.loan_end_date || "").format("DD/MM/YYYY")
            : "",
      }));
      setListData(temp);
      setNumberForm(temp.length + 1);
      if (temp.length >= 1 && !data?.id) {
        setIsShowForm(false);
        setIsShowModalSplash(false);
      }
    }
  }, [categoryData?.properties]);

  useEffect(() => {
    if (masterDataReducer) {
      const tempTypes = [];
      const tempBanks = [];
      masterDataReducer.map(item => {
        if (item?.value === "TYPE_PROPERTY") {
          tempTypes.push({
            label: item?.name,
            value: item?.id,
          });
          return;
        }
        if (item?.value === "BANK") {
          tempBanks.push({
            label: item?.name,
            value: item?.id,
          });
        }
      });
      setOptionTypes(tempTypes);
      setOptionBanks(tempBanks);
    }
  }, [masterDataReducer]);

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
          router: "/personal-estates-listing/bank-account",
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

  const handleReset = () => {
    setData({
      id: "",
      country: "",
      is_solely: true,
      is_joint: false,
      postal_code: "",
      address_line_1: "",
      address_line_2: "",
      unit_number: "",
      tenure: 0,
      current_bank_loan_id: null,
      type_id: null,
      remaining_loan_tenure: 0,
      joint_name: "",
      joint_contact: "",
      loan_start_date: "",
      loan_end_date: "",
      year_loan_taken: 0,
      interest_rate: 0,
      outstanding_loan_amount: 0,
      is_delete: false,
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
    if (!data?.country) {
      error.country = true;
      isError = true;
    }
    if (data?.is_solely && !data?.postal_code) {
      error.postal_code = true;
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
      tenure: Number(data.tenure),
      remaining_loan_tenure: Number(data.remaining_loan_tenure),
      year_loan_taken: Number(data.year_loan_taken),
      interest_rate: Number(data.interest_rate),
      outstanding_loan_amount: Number(data.outstanding_loan_amount),
      loan_start_date: moment(data.loan_start_date, "DD/MM/YYYY"),
      loan_end_date: moment(data.loan_end_date, "DD/MM/YYYY"),
    };
    if (disabledEdit) {
      // edit
      if (isLogin) {
        dispatch(
          PersonalEstatesListingActions.updateProperty(
            submitData.id,
            submitData,
            () => {}
          )
        );
      } else {
        dispatch(
          PersonalEstatesListingActions.updatePropertyGuest(
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
          PersonalEstatesListingActions.createProperty(submitData, property => {
            submitData.id = property.id;
            setListData([...listData, submitData]);
          })
        );
      } else {
        const tempSubmitData = {...submitData, id: uuidv4()};
        dispatch(
          PersonalEstatesListingActions.createPropertyGuest(
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
        PersonalEstatesListingActions.updateProperty(
          tempItem?.id,
          tempItem,
          () => {}
        )
      );
      return;
    }
    dispatch(
      PersonalEstatesListingActions.deletePropertyGuest(tempItem?.id, () => {})
    );
  };

  const handleChangeInput = e => {
    const {name, value} = e.target;
    if (data?.is_solely && name === "postal_code") {
      setErrors(prev => ({...prev, postal_code: false}));
    }
    setData(prev => ({...prev, [name]: limitLength(value, 30)}));
  };

  const handleAddProperty = () => {
    if (isShowForm) return;
    setIsShowForm(true);
    setDisabledEdit(false);
  };

  const handleCheckSolely = () => {
    setData(prev => ({
      ...prev,
      is_solely: true,
      is_joint: false,
    }));
  };

  const handleCheckJoint = () => {
    setData(prev => ({
      ...prev,
      is_solely: false,
      is_joint: true,
    }));
  };

  const handleChangeStartTime = (value, dataString) => {
    setData(prev => ({
      ...prev,
      loan_start_date: dataString,
    }));
  };

  const handleChangeEndTime = (value, dataString) => {
    setData(prev => ({...prev, loan_end_date: dataString}));
  };

  const handleChangeCountry = value => {
    setErrors(prev => ({...prev, country: false}));
    setData(prev => ({...prev, country: value}));
  };

  const handleSearchPostalCode = () => {
    getAddress({
      postalCode: data?.postal_code,
    }).then(address => {
      setData(prev => ({
        ...prev,
        unit_number: address?.blockNo,
        address_line_1: address?.address[0] && address?.address[0].ADDRESS,
        address_line_2: address?.address[1] && address?.address[1].ADDRESS,
      }));
    });
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
      <Row className="investments property">
        <Row className="body-investment" justify="center">
          <Row className="main-investment">
            <Col className="info-investment property__bg-common">
              <Row className="info-investment_content">
                <PropertyImage style={{marginBottom: "-28px"}} />
                <Row className="info-investment_investments">
                  <span className="info-investment_1">Property</span>
                  <InfoCircleOutlined
                    onClick={handleShowModal}
                    className="info-investment_icon"
                  />
                </Row>
                <p className="info-investment_2">
                  You can add all your residential, commercial, land and other
                  real estate that you owned solely under your name as part of
                  your estate.
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
                          <Col className="number-1 div-center property__bg-common">
                            <span>{index + 1}</span>
                          </Col>
                          <Col>
                            <Row>
                              <span className="type property__country">
                                {item?.country}
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
                      <Col className="number-1 div-center property__bg-common">
                        <span>{numberForm}</span>
                      </Col>
                      <Col>
                        <span className="investment-details-text">
                          Property Details
                        </span>
                      </Col>
                    </Col>
                    <Col className="div-center trash-icon">
                      <TrashEnabledIcon onClick={handleDeleteForm} />
                    </Col>
                  </Row>
                  <Col className="w-full">
                    <Row className="mb-32">
                      <SelectCountry
                        value={data?.country}
                        onChange={value => handleChangeCountry(value)}
                        isError={errors?.country}
                      />
                    </Row>
                    <Row className="mb-24">
                      <CustomCheckboxInfo
                        checked={data?.is_solely}
                        onChange={handleCheckSolely}
                        title="Solely Ownership"
                        content="If you pass on with an outstanding mortgage and without life insurance, your family may be left without a roof if they are unable to service the loan."
                      />
                    </Row>
                    <Row className="mb-32">
                      <CustomCheckboxInfo
                        checked={data?.is_joint}
                        onChange={handleCheckJoint}
                        title="Joint Ownership"
                        content="Only real estate that is solely under your name will become part of your estate when you pass on. Jointly-owned properties will go to the survivor by default and will not be part of your estate."
                      />
                    </Row>
                    {data?.is_solely && (
                      <>
                        <Row className="mb-32">
                          <InputField
                            displayLabel
                            label="Registered Address"
                            inputProps={{
                              placeholder: "6 digit postal postal_code",
                              name: "postal_code",
                              value: data?.postal_code,
                              onChange: e => handleChangeInput(e),
                              className: "mb-16",
                            }}
                            isError={errors?.postal_code}
                            searchable
                            onSearch={handleSearchPostalCode}
                          />
                          <InputField
                            inputProps={{
                              placeholder: "Address line 1",
                              name: "address_line_1",
                              value: data?.address_line_1,
                              onChange: e => handleChangeInput(e),
                              className: "mb-16",
                            }}
                          />
                          <InputField
                            inputProps={{
                              placeholder: "Address line 2",
                              name: "address_line_2",
                              value: data?.address_line_2,
                              onChange: e => handleChangeInput(e),
                              className: "mb-16",
                            }}
                          />
                          <InputField
                            inputProps={{
                              placeholder: "Unit number",
                              name: "unit_number",
                              value: data?.unit_number,
                              onChange: e => handleChangeInput(e),
                            }}
                          />
                        </Row>
                      </>
                    )}

                    <Row className={isShowDetail ? "mb-32" : "mb-40"}>
                      <CustomToggle
                        onChangeSwitch={() => setIsShowDetail(!isShowDetail)}
                      />
                    </Row>

                    {isShowDetail && (
                      <>
                        {data?.is_solely && (
                          <>
                            <Row className="mb-32" justify="space-between">
                              <div className="wp-48 responsive-mb-32">
                                <SelectField
                                  displayLabel
                                  label="Type of Property"
                                  selectProps={{
                                    placeholder: "Select",
                                    value: data?.type_id,
                                    onChange: value =>
                                      setData(prev => ({
                                        ...prev,
                                        type_id: value,
                                      })),
                                  }}
                                >
                                  {optionTypes.map(item => {
                                    return (
                                      <Option value={item.value}>
                                        {item.label}
                                      </Option>
                                    );
                                  })}
                                </SelectField>
                              </div>
                              <div className="wp-48">
                                <InputField
                                  displayLabel
                                  label="Tenure (in years)"
                                  inputProps={{
                                    placeholder: "0",
                                    value: data?.tenure,
                                    name: "tenure",
                                    onChange: e => handleChangeInput(e),
                                    type: "number",
                                  }}
                                ></InputField>
                              </div>
                            </Row>
                            <Row className="mb-32">
                              <SelectField
                                displayLabel
                                label="Current Bank Loan"
                                selectProps={{
                                  placeholder: "Select",
                                  value: data?.current_bank_loan_id,
                                  onChange: value =>
                                    setData(prev => ({
                                      ...prev,
                                      current_bank_loan_id: value,
                                    })),
                                }}
                              >
                                {optionBanks.map(item => {
                                  return (
                                    <Option value={item.value}>
                                      {item.label}
                                    </Option>
                                  );
                                })}
                              </SelectField>
                            </Row>
                            <Row className="mb-32" justify="space-between">
                              <div className="wp-48 responsive-mb-32">
                                <div>Loan Lock-In Start-Date</div>
                                <CustomDatePicker
                                  onChange={(value, dataString) =>
                                    handleChangeStartTime(value, dataString)
                                  }
                                  value={
                                    data?.loan_start_date &&
                                    moment(data?.loan_start_date, "DD/MM/YYYY")
                                  }
                                />
                              </div>
                              <div className="wp-48">
                                <div>Loan Lock-In End-Date</div>
                                <CustomDatePicker
                                  onChange={(value, dataString) =>
                                    handleChangeEndTime(value, dataString)
                                  }
                                  value={
                                    data?.loan_end_date &&
                                    moment(data?.loan_end_date, "DD/MM/YYYY")
                                  }
                                />
                              </div>
                            </Row>
                            <Row className="mb-32" justify="space-between">
                              <div className="wp-48 responsive-mb-32">
                                <InputField
                                  displayLabel
                                  label="Year Loan Taken"
                                  inputProps={{
                                    placeholder: "0",
                                    value: data?.year_loan_taken,
                                    name: "year_loan_taken",
                                    onChange: e => handleChangeInput(e),
                                    type: "number",
                                  }}
                                ></InputField>
                              </div>
                              <div className="wp-48">
                                <InputField
                                  displayLabel
                                  label="Interest Rate (%)"
                                  inputProps={{
                                    placeholder: "0",
                                    value: data?.interest_rate,
                                    name: "interest_rate",
                                    onChange: e => handleChangeInput(e),
                                    type: "number",
                                    pattern: "^d*(.d{0,2})?$",
                                    step: "0.01",
                                  }}
                                ></InputField>
                              </div>
                            </Row>
                            <Row className="mb-32">
                              <InputField
                                displayLabel
                                label="Outstanding Loan Amount ($)"
                                inputProps={{
                                  placeholder: "0",
                                  value: data?.outstanding_loan_amount,
                                  name: "outstanding_loan_amount",
                                  onChange: e => handleChangeInput(e),
                                  type: "number",
                                }}
                              ></InputField>
                            </Row>
                            <Row className="mb-40">
                              <InputField
                                displayLabel
                                label="Remaining Loan Tenure (in years)"
                                inputProps={{
                                  placeholder: "0",
                                  value: data?.remaining_loan_tenure,
                                  name: "remaining_loan_tenure",
                                  onChange: e => handleChangeInput(e),
                                  type: "number",
                                }}
                              ></InputField>
                            </Row>
                          </>
                        )}
                        {data?.is_joint && (
                          <>
                            <Row className="mb-32">
                              <div className="mb-16">
                                Property Management Details{" "}
                                <span className="text-info-input">
                                  (Optional)
                                </span>
                              </div>
                              <InputField
                                inputProps={{
                                  placeholder: "Name",
                                  className: "mb-16",
                                  value: data?.joint_name,
                                  name: "joint_name",
                                  onChange: e => handleChangeInput(e),
                                }}
                              ></InputField>
                              <InputField
                                inputProps={{
                                  placeholder: "Contact",
                                  value: data?.joint_contact,
                                  name: "joint_contact",
                                  onChange: e => handleChangeInput(e),
                                }}
                              ></InputField>
                            </Row>
                            <Row className="mb-40">
                              <InputField
                                displayLabel
                                label="Registered Address"
                                inputProps={{
                                  placeholder: "Address line 1",
                                  className: "mb-16",
                                  value: data?.address_line_1,
                                  name: "address_line_1",
                                  onChange: e => handleChangeInput(e),
                                }}
                              ></InputField>
                              <InputField
                                inputProps={{
                                  placeholder: "Address line 2",
                                  className: "mb-16",
                                  value: data?.address_line_2,
                                  name: "address_line_2",
                                  onChange: e => handleChangeInput(e),
                                }}
                              ></InputField>
                              <InputField
                                inputProps={{
                                  placeholder: "Unit number",
                                  value: data?.unit_number,
                                  name: "unit_number",
                                  onChange: e => handleChangeInput(e),
                                }}
                              ></InputField>
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
                <CloudPropertyIcon />
                <span onClick={handleAddProperty} style={{cursor: "pointer"}}>
                  Add Property
                </span>
              </Row>
            </Col>
          </Row>
        </Row>
      </Row>
      {isShowModal && (
        <ModalInfo
          show={isShowModal}
          title="Property"
          content={
            <span>
              Only real estate that is solely under your name will become part
              of your estate when you pass on. Jointly-owned properties will go
              to the survivor by default.
              <br />
              <br />
              Do note that if you pass on with an outstanding mortgage and
              without life insurance, your family may be left without a roof if
              they are unable to service the loan.
            </span>
          }
          handleOk={handleOk}
          handleCancel={handleOk}
        />
      )}
    </>
  );
}

export default React.memo(PropertyLayout);
