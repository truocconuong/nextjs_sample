import {EditOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {Row, Col, Select} from "antd";
import CustomButton from "generals/Button";
import InputField from "generals/InputField";
import SelectField from "generals/SelectField";
import CustomToggle from "generals/Toggle";
import React, {useState} from "react";
import ModalInfo from "generals/Modal/ModalInfo";
import {
  CloudPropertyIcon,
  PersonalEstatesListingImage,
  PropertyImage,
  ResetIcon,
  SaveIcon,
  TrashEnabledIcon,
  TypesOfOwnershipImage,
} from "../../../../../public/images";
import SelectCountry from "generals/SelectCountry";
import CustomCheckboxInfo from "generals/Checkbox/CheckboxInfo";
import CustomDatePicker from "generals/DatePicker";
import moment from "moment";
import ModalStep from "generals/Modal/ModalStep";

const {Option} = Select;

const testOptions = [
  {label: "TEST 1", value: "1"},
  {label: "TEST 2", value: "2"},
  {label: "TEST 3", value: "3"},
  {label: "TEST 4", value: "4"},
  {label: "TEST 5", value: "5"},
];

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

function PropertyLayout(props) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalSplash, setIsShowModalSplash] = useState(true);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowForm, setIsShowForm] = useState(true);
  const [numberForm, setNumberForm] = useState(1);
  const [listData, setListData] = useState([]);
  const [disabledEdit, setDisabledEdit] = useState(true);
  const [dataSolely, setDataSolely] = useState({
    country: "",
    type: "Solely Ownership",
    code: "",
    address1: "",
    address2: "",
    unitNumber: "",
    typeOfProperty: null,
    tenure: "",
    currentBankLoan: null,
    loanStartTime: "",
    loanEndTime: "",
    yearLoanTaken: "",
    interestRate: "",
    outstandingLoan: "",
    remainingLoan: "",
  });
  const [dataJoint, setDataJoint] = useState({
    country: "",
    type: "Joint Ownership",
    name: "",
    contact: "",
    address1: "",
    address2: "",
    unitNumber: "",
  });
  const [isCheckSolely, setIsCheckSolely] = useState(true);
  const [isCheckJoint, setIsCheckJoint] = useState(false);
  const [currentCountry, setCurrentCountry] = useState("");

  const handleReset = () => {
    setDataSolely({
      country: "",
      type: "Solely Ownership",
      code: "",
      address1: "",
      address2: "",
      unitNumber: "",
      typeOfProperty: null,
      tenure: "",
      currentBankLoan: null,
      loanStartTime: "",
      loanEndTime: "",
      yearLoanTaken: "",
      interestRate: "",
      outstandingLoan: "",
      remainingLoan: "",
    });
    setDataJoint({
      country: "",
      type: "Joint Ownership",
      name: "",
      contact: "",
      address1: "",
      address2: "",
      unitNumber: "",
    });
  };

  const handleShowModal = () => {
    setIsShowModal(true);
  };

  const handleOk = () => {
    setIsShowModal(false);
  };

  const handleSave = () => {
    setDisabledEdit(false)
    setIsShowDetail(false);
    setIsShowForm(false);
    let tempListData = listData;
    if (isCheckSolely) {
      tempListData.push({...dataSolely, country: currentCountry});
    }
    if (isCheckJoint) {
      tempListData.push({...dataJoint, country: currentCountry});
    }
    setListData(tempListData);
    setNumberForm(tempListData.length + 1);
    handleReset();
    setIsCheckSolely(true);
    setIsCheckJoint(false);
    setCurrentCountry("");
  };

  const handleEdit = item => {
    setDisabledEdit(true)
    setIsShowForm(true);
    let tempListData = listData;
    setListData(tempListData.filter(i => i !== item));
    setNumberForm(tempListData.length);
    const findItem = tempListData.find(data => data === item);
    setCurrentCountry(findItem?.country);
    if (item?.type === "Solely Ownership") {
      setIsCheckSolely(true);
      setIsCheckJoint(false);
      setDataSolely(findItem);
    }
    if (item?.type === "Joint Ownership") {
      setDataJoint(findItem);
      setIsCheckSolely(false);
      setIsCheckJoint(true);
    }
  };

  const handleDelete = item => {
    const tempListData = listData.filter(i => i !== item);
    setListData(tempListData);
    setNumberForm(tempListData.length + 1);
  };

  const handleChangeInputSolely = e => {
    const {name, value} = e.target;
    setDataSolely(prev => ({...prev, [name]: value}));
  };

  const handleChangeInputJoint = e => {
    const {name, value} = e.target;
    setDataJoint(prev => ({...prev, [name]: value}));
  };

  const handleAddInvestment = () => {
    if (isShowForm) return;
    setIsShowForm(true);
    setDisabledEdit(false)
  };

  const handleCheckSolely = () => {
    setIsCheckJoint(false);
    setIsCheckSolely(true);
    // handleReset();
  };

  const handleCheckJoint = () => {
    setIsCheckJoint(true);
    setIsCheckSolely(false);
    // handleReset();
  };

  const handleChangeStartTime = (value, dataString) => {
    setDataSolely(prev => ({...prev, loanStartTime: dataString}));
  };

  const handleChangeEndTime = (value, dataString) => {
    setDataSolely(prev => ({...prev, loanEndTime: dataString}));
  };

  const handleChangeCountry = value => {
    setCurrentCountry(value);
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
                                {/* <span className="tooltip">{item?.country}</span> */}
                              </span>
                            </Row>
                            <Row>
                              <span className="financial">{item?.type}</span>
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
                  </Row>
                  <Col className="w-full">
                    <Row className="mb-32">
                      <SelectCountry
                        value={currentCountry}
                        onChange={value => handleChangeCountry(value)}
                      />
                    </Row>
                    <Row className="mb-24">
                      <CustomCheckboxInfo
                        checked={isCheckSolely}
                        onChange={handleCheckSolely}
                        title="Solely Ownership"
                        content="If you pass on with an outstanding mortgage and without life insurance, your family may be left without a roof if they are unable to service the loan."
                      />
                    </Row>
                    <Row className="mb-32">
                      <CustomCheckboxInfo
                        checked={isCheckJoint}
                        onChange={handleCheckJoint}
                        title="Joint Ownership"
                        content="Only real estate that is solely under your name will become part of your estate when you pass on. Jointly-owned properties will go to the survivor by default and will not be part of your estate."
                      />
                    </Row>
                    {isCheckSolely && (
                      <>
                        <Row className="mb-32">
                          <InputField
                            displayLabel
                            label="Registered Address"
                            inputProps={{
                              placeholder: "6 digit postal code",
                              name: "code",
                              value: dataSolely?.code,
                              onChange: e => handleChangeInputSolely(e),
                              className: "mb-16",
                            }}
                            searchable
                            onSearch={() => console.log("search input...")}
                          />
                          <InputField
                            inputProps={{
                              placeholder: "Address line 1",
                              name: "address1",
                              value: dataSolely?.address1,
                              onChange: e => handleChangeInputSolely(e),
                              className: "mb-16",
                            }}
                          />
                          <InputField
                            inputProps={{
                              placeholder: "Address line 2",
                              name: "address2",
                              value: dataSolely?.address2,
                              onChange: e => handleChangeInputSolely(e),
                              className: "mb-16",
                            }}
                          />
                          <InputField
                            inputProps={{
                              placeholder: "Unit number",
                              name: "unitNumber",
                              value: dataSolely?.unitNumber,
                              onChange: e => handleChangeInputSolely(e),
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
                        {isCheckSolely && (
                          <>
                            <Row className="mb-32" justify="space-between">
                              <div className="wp-48 responsive-mb-32">
                                <SelectField
                                  displayLabel
                                  label="Type of Property"
                                  selectProps={{
                                    placeholder: "Select",
                                    value: dataSolely?.typeOfProperty,
                                      onChange: value =>
                                        setDataSolely(prev => ({...prev, typeOfProperty: value})),
                                  }}
                                >
                                  {testOptions.map(item => {
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
                                    value: dataSolely?.tenure,
                                    name: "tenure",
                                    onChange: e => handleChangeInputSolely(e),
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
                                  value: dataSolely?.currentBankLoan,
                                    onChange: value =>
                                      setDataSolely(prev => ({...prev, currentBankLoan: value})),
                                }}
                              >
                                {testOptions.map((item, index) => {
                          return (
                            <Option value={item.value}>{item.label}</Option>
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
                                    dataSolely?.loanStartTime &&
                                    moment(
                                      dataSolely?.loanStartTime,
                                      "DD/MM/YYYY"
                                    )
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
                                    dataSolely?.loanEndTime &&
                                    moment(
                                      dataSolely?.loanEndTime,
                                      "DD/MM/YYYY"
                                    )
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
                                    value: dataSolely?.yearLoanTaken,
                                    name: "yearLoanTaken",
                                    onChange: e => handleChangeInputSolely(e),
                                  }}
                                ></InputField>
                              </div>
                              <div className="wp-48">
                                <InputField
                                  displayLabel
                                  label="Interest Rate (%)"
                                  inputProps={{
                                    placeholder: "0",
                                    value: dataSolely?.interestRate,
                                    name: "interestRate",
                                    onChange: e => handleChangeInputSolely(e),
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
                                  value: dataSolely?.outstandingLoan,
                                  name: "outstandingLoan",
                                  onChange: e => handleChangeInputSolely(e),
                                }}
                              ></InputField>
                            </Row>
                            <Row className="mb-40">
                              <InputField
                                displayLabel
                                label="Remaining Loan Tenure (in years)"
                                inputProps={{
                                  placeholder: "0",
                                  value: dataSolely?.remainingLoan,
                                  name: "remainingLoan",
                                  onChange: e => handleChangeInputSolely(e),
                                }}
                              ></InputField>
                            </Row>
                          </>
                        )}
                        {isCheckJoint && (
                          <>
                            <Row className="mb-32">
                              <div className="mb-16">
                                Property Management Details{" "}
                                <span>(Optional)</span>
                              </div>
                              <InputField
                                inputProps={{
                                  placeholder: "Name",
                                  className: "mb-16",
                                  value: dataJoint?.name,
                                  name: "name",
                                  onChange: e => handleChangeInputJoint(e),
                                }}
                              ></InputField>
                              <InputField
                                inputProps={{
                                  placeholder: "Contact",
                                  value: dataJoint?.contact,
                                  name: "contact",
                                  onChange: e => handleChangeInputJoint(e),
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
                                  value: dataJoint?.address1,
                                  name: "address1",
                                  onChange: e => handleChangeInputJoint(e),
                                }}
                              ></InputField>
                              <InputField
                                inputProps={{
                                  placeholder: "Address line 2",
                                  className: "mb-16",
                                  value: dataJoint?.address2,
                                  name: "address2",
                                  onChange: e => handleChangeInputJoint(e),
                                }}
                              ></InputField>
                              <InputField
                                inputProps={{
                                  placeholder: "Unit number",
                                  value: dataJoint?.unitNumber,
                                  name: "unitNumber",
                                  onChange: e => handleChangeInputJoint(e),
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
                <span onClick={handleAddInvestment} style={{cursor: "pointer"}}>
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

export default PropertyLayout;
