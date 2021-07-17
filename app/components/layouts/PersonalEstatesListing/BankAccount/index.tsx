import React, {useState} from "react";
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
} from "../../../../../public/images";
import CustomCheckboxInfo from "@generals/Checkbox/CheckboxInfo";
import ModalStep from "@generals/Modal/ModalStep";

const {Option} = Select;

const testOptions = [
  {label: "TEST 1", value: "TEST 1"},
  {label: "TEST 2", value: "TEST 2"},
  {label: "TEST 3", value: "TEST 3"},
  {label: "TEST 4", value: "TEST 4"},
  {label: "TEST 5", value: "TEST 5"},
];

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

function BankAccountLayout(props) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalSplash, setIsShowModalSplash] = useState(true);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowForm, setIsShowForm] = useState(true);
  const [numberForm, setNumberForm] = useState(1);
  const [listData, setListData] = useState([]);
  const [disabledEdit, setDisabledEdit] = useState(true);
  const [data, setData] = useState({
    bank: null,
    accountNo: "",
    type: "",
    currentBalance: "",
    accountHoverNames: "",
  });
  const [isCheckSolely, setIsCheckSolely] = useState(true);
  const [isCheckJoint, setIsCheckJoint] = useState(false);

  const handleReset = () => {
    setData({
      bank: null,
      accountNo: "",
      type: "",
      currentBalance: "",
      accountHoverNames: "",
    });
  };

  const handleShowModal = () => {
    setIsShowModal(true);
  };

  const handleOk = () => {
    setIsShowModal(false);
  };

  const handleSave = () => {
    setDisabledEdit(false);
    setIsShowDetail(false);
    setIsShowForm(false);
    let tempListData = listData;
    let tempData = data;
    if (isCheckSolely) {
      delete tempData["accountHoverNames"];
      tempData["type"] = "Solely Ownership";
    } else if (isCheckJoint) {
      tempData["type"] = "Joint Ownership";
    }
    tempListData.push(tempData);
    setListData(tempListData);
    setNumberForm(tempListData.length + 1);
    handleReset();
    setIsCheckSolely(true);
    setIsCheckJoint(false);
  };

  const handleEdit = item => {
    setDisabledEdit(true);
    setIsShowForm(true);
    let tempListData = listData;
    setListData(tempListData.filter(i => i !== item));
    setNumberForm(tempListData.length);
    const findItem = tempListData.find(data => data === item);
    if (item?.type === "Solely Ownership") {
      setIsCheckSolely(true);
      setIsCheckJoint(false);
    }
    if (item?.type === "Joint Ownership") {
      setIsCheckSolely(false);
      setIsCheckJoint(true);
    }
    setData(findItem);
  };

  const handleDelete = item => {
    const tempListData = listData.filter(i => i !== item);
    setListData(tempListData);
    setNumberForm(tempListData.length + 1);
  };

  const handleChangeInput = e => {
    const {name, value} = e.target;
    setData(prev => ({...prev, [name]: value}));
  };

  const handleAddInvestment = () => {
    if (isShowForm) return;
    setIsShowForm(true);
    setDisabledEdit(false);
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
                            <Row>
                              <span className="type">{item?.bank}</span>
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
                      <Col className="number-1 div-center bank-account__bg-common">
                        <span>{numberForm}</span>
                      </Col>
                      <Col>
                        <span className="investment-details-text">
                          Bank Details
                        </span>
                      </Col>
                    </Col>
                  </Row>
                  <Col className="w-full">
                    <Row className="mb-32">
                      <SelectField
                        displayLabel
                        label="Bank"
                        selectProps={{
                          placeholder: "Select",
                          value: data?.bank,
                          onChange: value =>
                            setData(prev => ({
                              ...prev,
                              bank: value,
                            })),
                        }}
                      >
                        {testOptions.map(item => {
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
                          placeholder: "e.g. 0012345678",
                          value: data?.accountNo,
                          name: "accountNo",
                          onChange: e => handleChangeInput(e),
                        }}
                      ></InputField>
                    </Row>
                    <Row className="mb-24">
                      <CustomCheckboxInfo
                        checked={isCheckSolely}
                        onChange={handleCheckSolely}
                        title="Solely Ownership"
                        content="Only bank accounts under your single name will become part of your estate when you pass on."
                      />
                    </Row>
                    <Row className="mb-32">
                      <CustomCheckboxInfo
                        checked={isCheckJoint}
                        onChange={handleCheckJoint}
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
                        <Row className={isCheckJoint ? "mb-32" : "mb-40"}>
                          <InputField
                            displayLabel
                            label="Current Balance ($)"
                            inputProps={{
                              placeholder: "0.00",
                              value: data?.currentBalance,
                              name: "currentBalance",
                              onChange: e => handleChangeInput(e),
                              className: "mb-16",
                            }}
                          ></InputField>
                          <div>
                            <span>
                              The balances that you inputted into the field will
                              not be reflected in your Will itself. By entering
                              the account balances, you will have a clearer
                              picture of the size of your current estate, and
                              helps you better distribute your assets.
                            </span>
                          </div>
                        </Row>

                        {isCheckJoint && (
                          <>
                            <Row className="mb-40">
                              <InputField
                                displayLabel
                                label="Account Holder Names"
                                inputProps={{
                                  placeholder: "Names",
                                  className: "mb-16",
                                  value: data?.accountHoverNames,
                                  name: "accountHoverNames",
                                  onChange: e => handleChangeInput(e),
                                }}
                              ></InputField>
                              <div>
                                <span>
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
                <span onClick={handleAddInvestment} style={{cursor: "pointer"}}>
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
