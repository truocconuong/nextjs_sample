import React, {useState} from "react";
import {EditOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {Row, Col, Select} from "antd";
import CustomButton from "@generals/Button";
import InputField from "@generals/InputField";
import SelectField from "@generals/SelectField";
import CustomToggle from "@generals/Toggle";
import ModalInfo from "@generals/Modal/ModalInfo";
import {
  CloudInsurancePoliciesIcon,
  InsurancePoliciesImage,
  ResetIcon,
  SaveIcon,
  TrashEnabledIcon,
} from "../../../../../public/images";
import CustomCheckboxInfo from "@generals/Checkbox/CheckboxInfo";
import {useDispatch} from 'react-redux';
import { ProgressActions } from "../../../../../redux/actions";
import { useEffect } from "react";
import router from "next/router";

const {Option} = Select;

const testOptions = [
  {label: "TEST 1", value: "TEST 1"},
  {label: "TEST 2", value: "TEST 2"},
  {label: "TEST 3", value: "TEST 3"},
  {label: "TEST 4", value: "TEST 4"},
  {label: "TEST 5", value: "TEST 5"},
];

function InsurancePolicyLayout(props) {
  const dispatch = useDispatch();

  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowForm, setIsShowForm] = useState(true);
  const [numberForm, setNumberForm] = useState(1);
  const [listData, setListData] = useState([]);
  const [disabledEdit, setDisabledEdit] = useState(true);
  const [data, setData] = useState({
    insuranceCompany: "",
    type: "",
    beneficiary: null,
    policyName: "",
    policyNo: "",
    currentValue: "",
    coverage: "",
  });
  const [isCheckNonNominated, setIsCheckNonNominated] = useState(true);
  const [isCheckNominated, setIsCheckNominated] = useState(false);
  const [isContinue, setIsContinue] = useState(false)

  useEffect(() => {
    dispatch(
      ProgressActions.setAmountPercentIncreament(
        {
          amountPercentIncreament: 0,
        },
        () => {}
      )
    );
    dispatch(
      ProgressActions.setPushable(
        {
          pushable: true
        },
        () => {}
      )
    );
    dispatch(
      ProgressActions.setRouter(
        {
          router: '/personal-estates-listing/investment'
        },
        () => {}
      )
    )
  }, [])

  useEffect(() => {
    if (listData.length > 0) {
      dispatch(
        ProgressActions.setDisabled({
          disabled: false
        },
        () => {}
        )
      )
    }
  }, [isContinue])

  const handleReset = () => {
    setData({
      insuranceCompany: "",
      type: "",
      beneficiary: null,
      policyName: "",
      policyNo: "",
      currentValue: "",
      coverage: "",
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
    if (isCheckNonNominated) {
      delete tempData["accountHoverNames"];
      tempData["type"] = "Solely Ownership";
    } else if (isCheckNominated) {
      tempData["type"] = "Joint Ownership";
    }
    tempListData.push(tempData);
    setListData(tempListData);
    setNumberForm(tempListData.length + 1);
    handleReset();
    setIsCheckNonNominated(true);
    setIsCheckNominated(false);
    if (!isContinue) {
      setIsContinue(true)
    }
  };

  const handleEdit = item => {
    setDisabledEdit(true);
    setIsShowForm(true);
    let tempListData = listData;
    setListData(tempListData.filter(i => i !== item));
    setNumberForm(tempListData.length);
    const findItem = tempListData.find(data => data === item);
    if (item?.type === "Solely Ownership") {
      setIsCheckNonNominated(true);
      setIsCheckNominated(false);
    }
    if (item?.type === "Joint Ownership") {
      setIsCheckNonNominated(false);
      setIsCheckNominated(true);
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
    setIsCheckNominated(false);
    setIsCheckNonNominated(true);
    // handleReset();
  };

  const handleCheckJoint = () => {
    setIsCheckNominated(true);
    setIsCheckNonNominated(false);
    // handleReset();
  };

  return (
    <>
      <Row className="investments insurance-policy">
        <Row className="body-investment" justify="center">
          <Row className="main-investment">
            <Col className="info-investment insurance-policy__bg-common">
              <Row className="info-investment_content">
                <InsurancePoliciesImage style={{marginBottom: "48px"}} />
                <Row className="info-investment_investments">
                  <span className="info-investment_1">Insurance Policies</span>
                  <InfoCircleOutlined
                    onClick={handleShowModal}
                    className="info-investment_icon"
                  />
                </Row>
                <p className="info-investment_2">
                  You probably have many insurance policies from different
                  insurers, it will be good to constantly list them down so that
                  your loved ones will be aware.
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
                          <Col className="number-1 div-center insurance-policy__bg-common">
                            <span>{index + 1}</span>
                          </Col>
                          <Col>
                            <Row>
                              <span className="type">
                                {item?.insuranceCompany}
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
                      <Col className="number-1 div-center insurance-policy__bg-common">
                        <span>{numberForm}</span>
                      </Col>
                      <Col>
                        <span className="investment-details-text">
                          Policy Details
                        </span>
                      </Col>
                    </Col>
                  </Row>
                  <Col className="w-full">
                    <Row className="mb-32">
                      <InputField
                        displayLabel
                        label="Insurance Company"
                        inputProps={{
                          placeholder: "e.g. FWD Insurance",
                          value: data?.insuranceCompany,
                          name: "insuranceCompany",
                          onChange: e => handleChangeInput(e),
                        }}
                      ></InputField>
                    </Row>
                    <Row className="mb-24">
                      <CustomCheckboxInfo
                        checked={isCheckNonNominated}
                        onChange={handleCheckSolely}
                        title="Non-Nominated"
                        content="Insurance policies that have not been nominated can be included as part of your estate. The insurance proceeds will be added into your estate and distributed to your beneficiaries upon claims."
                      />
                    </Row>
                    <Row className="mb-32">
                      <CustomCheckboxInfo
                        checked={isCheckNominated}
                        onChange={handleCheckJoint}
                        title="Nominated"
                        content="Insurance policies that have been nominated with beneficiaries will not be reflected in your Will itself. By entering the nominated policy details, you will have a clearer picture of the size of your current estate, and helps you better distribute your assets."
                      />
                    </Row>
                    {isCheckNominated && (
                      <Row className="mb-32">
                        <SelectField
                          displayLabel
                          label="Beneficiary"
                          selectProps={{
                            placeholder: "Select",
                            value: data?.beneficiary,
                            onChange: value =>
                              setData(prev => ({...prev, beneficiary: value})),
                          }}
                        >
                          {testOptions.map(item => {
                            return (
                              <Option value={item.value}>{item.label}</Option>
                            );
                          })}
                        </SelectField>
                      </Row>
                    )}
                    <Row className={isShowDetail ? "mb-32" : "mb-40"}>
                      <CustomToggle
                        onChangeSwitch={() => setIsShowDetail(!isShowDetail)}
                      />
                    </Row>

                    {isShowDetail && (
                      <>
                        <Row className="mb-32">
                          <InputField
                            displayLabel
                            label="Policy Name"
                            inputProps={{
                              placeholder: "Policy name",
                              value: data?.policyName,
                              name: "policyName",
                              onChange: e => handleChangeInput(e),
                            }}
                          ></InputField>
                        </Row>
                        <Row className="mb-32" justify="space-between">
                          <div className="wp-48 responsive-mb-32">
                            <InputField
                              displayLabel
                              label="Policy No."
                              inputProps={{
                                placeholder: "0",
                                value: data?.policyNo,
                                name: "policyNo",
                                onChange: e => handleChangeInput(e),
                              }}
                            ></InputField>
                          </div>
                          <div className="wp-48">
                            <InputField
                              displayLabel
                              label="Current Value ($)"
                              inputProps={{
                                placeholder: "0.00",
                                value: data?.currentValue,
                                name: "currentValue",
                                onChange: e => handleChangeInput(e),
                              }}
                            ></InputField>
                          </div>
                        </Row>
                        <Row className="mb-40">
                          <InputField
                            displayLabel
                            label="Coverage ($)"
                            inputProps={{
                              placeholder: "0.00",
                              value: data?.coverage,
                              name: "coverage",
                              onChange: e => handleChangeInput(e),
                              className: "mb-16",
                            }}
                          ></InputField>
                          <div>
                            <span className="text-info-input">
                              The policy coverage that you inputted into the
                              field will not be reflected in your Will itself.
                              By entering the coverage amount, you will have a
                              clearer picture of the size of your current
                              estate, and helps you better distribute your
                              assets.
                            </span>
                          </div>
                        </Row>
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
                <CloudInsurancePoliciesIcon />
                <span onClick={handleAddInvestment} style={{cursor: "pointer"}}>
                  Add Policy
                </span>
              </Row>
            </Col>
          </Row>
        </Row>
      </Row>
      {isShowModal && (
        <ModalInfo
          show={isShowModal}
          title="Insurance Policies"
          content={
            <span>
              Only bank accounts under your single name will become part of your
              estate when you pass on. Jointly owned accounts will only be
              considered as part of your estate and distributed to your
              beneficiaries if the joint account holder passes away before you
              do.
            </span>
          }
          handleOk={handleOk}
          handleCancel={handleOk}
        />
      )}
    </>
  );
}

export default InsurancePolicyLayout;
