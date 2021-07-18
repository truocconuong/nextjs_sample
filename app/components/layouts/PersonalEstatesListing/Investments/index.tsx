import React, {useEffect, useState} from "react";
import {EditOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {Row, Col, Select} from "antd";
import CustomButton from "@generals/Button";
import InputField from "@generals/InputField";
import SelectField from "@generals/SelectField";
import CustomToggle from "@generals/Toggle";
import ModalInfo from "@generals/Modal/ModalInfo";
import {
  CloudIcon,
  PotImage,
  ResetIcon,
  SaveIcon,
  TrashEnabledIcon,
} from "../../../../../public/images";
import { ProgressActions } from "../../../../../redux/actions";
import { useDispatch } from "react-redux";

const {Option} = Select;

const options = [
  {label: "TEST 11", value: "TEST 11"},
  {label: "TEST 12", value: "TEST 12"},
  {label: "TEST 13", value: "TEST 13"},
  {label: "TEST 14", value: "TEST 14"},
  {label: "TEST 15", value: "TEST 15"},
];

function InvestmentsLayout(props) {
  const dispatch = useDispatch();

  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowForm, setIsShowForm] = useState(true);
  const [numberForm, setNumberForm] = useState(1);
  const [isDisabledEdit, setIsDisabledEdit] = useState(false);
  const [listData, setListData] = useState([]);
  const [data, setData] = useState({
    investmentType: null,
    financial: "",
    accountNo: "",
    capitalOutlay: "",
    currentMarketValue: "",
  });
  const [isContinue, setIsContinue] = useState(false);

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
          router: '/personal-estates-listing/business-interest'
        },
        () => {}
      )
    )
  }, [])

  useEffect(() => {
    if (listData.length > 0) {
      dispatch(
        ProgressActions.setDisabled(
          {
            disabled: false
          },
          () => {}
        )
      )
    }
  }, [isContinue])

  const handleReset = () => {
    setData({
      investmentType: null,
      financial: "",
      accountNo: "",
      capitalOutlay: "",
      currentMarketValue: "",
    });
  };

  const handleShowModal = () => {
    setIsShowModal(true);
  };

  const handleOk = () => {
    setIsShowModal(false);
  };

  const handleSave = () => {
    setIsDisabledEdit(false);
    setIsShowDetail(false);
    setIsShowForm(false);
    let tempListData = listData;
    tempListData.push(data);
    setListData(tempListData);
    handleReset();
    if (!isContinue) {
      setIsContinue(true)
    }
  };

  const handleEdit = item => {
    setIsDisabledEdit(true);
    setIsShowForm(true);
    let tempListData = listData;
    setListData(tempListData.filter(i => i !== item));
    setData(tempListData.find(data => data === item));
  };

  const handleDelete = (item) => {
    const tempListData = listData.filter(i => i !== item);
    setListData(tempListData);
    setNumberForm(tempListData.length + 1);
  }

  const handleChangeInput = e => {
    const {name, value} = e.target;
    setData(prev => ({...prev, [name]: value}));
  };

  const handleAddInvestment = () => {
    if (isShowForm) return;
    setIsShowForm(true);
    setIsDisabledEdit(false);
  };

  return (
    <>
      <Row className="investments">
        <Row className="body-investment" justify="center">
          <Row className="main-investment">
            <Col className="info-investment">
              <Row className="info-investment_content">
                <PotImage style={{marginBottom: "34px"}} />
                <Row className="info-investment_investments">
                  <span className="info-investment_1">Investments</span>
                  <InfoCircleOutlined
                    onClick={handleShowModal}
                    className="info-investment_icon"
                  />
                </Row>
                <p className="info-investment_2">
                  You may have done many investments in different banks,
                  brokerages and trading platforms. It will be good to
                  constantly list them down so that your loved ones will be
                  aware.
                </p>
              </Row>
              <Row></Row>
            </Col>
            <Col className="input-investment">
              {listData.length > 0 &&
                listData.map((item, index) => {
                  return (
                    <Row className="list-data form-investment mb-32">
                      <Row justify="space-between" align="middle">
                        <Col className="div-center">
                          <Col className="number-1 div-center">
                            <span>{index + 1}</span>
                          </Col>
                          <Col>
                            <Row>
                              <span className="type">
                                {item?.investmentType}
                              </span>
                            </Row>
                            <Row>
                              <span className="financial">
                                {item?.financial}
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
                              disabled={isDisabledEdit}
                            >
                              Edit
                            </CustomButton>
                          </Col>
                          <Col className="trash-icon div-center">
                            <TrashEnabledIcon onClick={() => handleDelete(item)}/>
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
                      <Col className="number-1 div-center">
                        <span>{numberForm}</span>
                      </Col>
                      <Col>
                        <span className="investment-details-text">
                          Investment Details
                        </span>
                      </Col>
                    </Col>
                  </Row>
                  <Col className="w-full">
                    <Row className="mb-32">
                      <SelectField
                        displayLabel
                        label="Investment Type"
                        selectProps={{
                          placeholder: "Select",
                          value: data?.investmentType,
                          onChange: value =>
                            setData(prev => ({...prev, investmentType: value})),
                        }}
                      >
                        {options.map((item, index) => {
                          return (
                            <Option value={item.value}>{item.label}</Option>
                          );
                        })}
                      </SelectField>
                    </Row>
                    <Row className="mb-32">
                      <InputField
                        displayLabel
                        label="Financial Institutions"
                        inputProps={{
                          placeholder: "e.g. Standard Chartered",
                          name: "financial",
                          value: data?.financial,
                          onChange: e => handleChangeInput(e),
                        }}
                      ></InputField>
                    </Row>
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
                            label="Account No."
                            inputProps={{
                              placeholder: "e.g. 9342099896",
                              value: data?.accountNo,
                              name: "accountNo",
                              onChange: e => handleChangeInput(e),
                            }}
                          ></InputField>
                        </Row>
                        <Row className="mb-40" justify="space-between">
                          <div className="wp-48 responsive-mb-32">
                            <InputField
                              displayLabel
                              label="Capital Outlay ($)"
                              inputProps={{
                                placeholder: "e.g. 20,000.00",
                                value: data?.capitalOutlay,
                                name: "capitalOutlay",
                                onChange: e => handleChangeInput(e),
                              }}
                            ></InputField>
                          </div>
                          <div className="wp-48">
                            <InputField
                              displayLabel
                              label="Current Market Value ($)"
                              inputProps={{
                                placeholder: "e.g. 90,000.00",
                                value: data?.currentMarketValue,
                                name: "currentMarketValue",
                                onChange: e => handleChangeInput(e),
                              }}
                            ></InputField>
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
                <CloudIcon />
                <span onClick={handleAddInvestment} style={{cursor: "pointer"}}>
                  Add Investment
                </span>
              </Row>
            </Col>
          </Row>
        </Row>
      </Row>
      {isShowModal && (
        <ModalInfo
          show={isShowModal}
          title="Investments"
          content="Only investments accounts under your single name will become part of your estate when you pass on. Jointly owned accounts will only be considered as part of your estate and distributed to your beneficiaries if the joint account holder passes away before you do."
          handleOk={handleOk}
          handleCancel={handleOk}
        />
      )}
    </>
  );
}

export default InvestmentsLayout;
