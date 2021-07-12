import {EditOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {Row, Col, Select} from "antd";
import CustomButton from "generals/Button";
import InputField from "generals/InputField";
import SelectField from "generals/SelectField";
import React, {useState} from "react";
import ModalInfo from "generals/Modal/ModalInfo";
import _ from "lodash";
import {
  CloudValuablesIcon,
  ResetIcon,
  SaveIcon,
  TrashIcon,
  ValuablesImage,
  WatchIcon,
} from "../../../../public/images";

const {Option} = Select;

const options = [
  {label: "TEST 11", value: "TEST 11"},
  {label: "TEST 12", value: "TEST 12"},
  {label: "TEST 13", value: "TEST 13"},
  {label: "TEST 14", value: "TEST 14"},
  {label: "TEST 15", value: "TEST 15"},
];

function ValuablesLayout(props) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalRemove, setIsShowModalRemove] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowForm, setIsShowForm] = useState(true);
  // const [numberForm, setNumberForm] = useState(1);
  const [listData, setListData] = useState([]);
  const [data, setData] = useState({
    valuablesType: "",
      brand: "",
      model: "",
      serialNo: "",
  });

  const handleReset = () => {
    setData({
      valuablesType: "",
      brand: "",
      model: "",
      serialNo: "",
    });
  };

  const handleShowModal = () => {
    setIsShowModal(true);
  };

  const handleOk = () => {
    setIsShowModal(false);
  };

  const handleSave = () => {
    setIsShowDetail(false);
    setIsShowForm(false);
    let tempListData = listData;
    tempListData.push(data);
    setListData(tempListData);
    // setNumberForm(tempListData.length + 1);
    handleReset();
  };

  const handleEdit = item => {
    setIsShowDetail(true);
    setIsShowForm(true);
    let tempListData = listData;
    setListData(tempListData.filter(i => i !== item));
    setData(tempListData.find(data => data === item));
    // setNumberForm(tempListData.length);
  };

  const handleDelete = () => {
    setIsShowModalRemove(true);
  };

  const handleConfirmDelete = item => {
    let tempListData = listData.filter(i => i !== item);
    setListData(tempListData);
    // setNumberForm(tempListData.length + 1);
    setIsShowModalRemove(false);
  };

  const handleChangeInput = e => {
    const {name, value} = e.target;
    setData(prev => ({...prev, [name]: value}));
  };

  const handleAddInvestment = () => {
    setIsShowForm(true);
  };

  const handleChangeValuablesType = value => {
    setData(prev => ({...prev, valuablesType: value}));
    setIsShowDetail(true);
  };

  return (
    <>
      <Row className="investments">
        <Row className="body-investment" justify="center">
          <Row className="main-investment">
            <Col className="bg-info-valuables info-investment">
              <Row className="info-investment_content">
                <ValuablesImage style={{marginBottom: "34px"}} />
                <Row className="info-investment_investments">
                  <span className="info-investment_1">My Valuables</span>
                  <InfoCircleOutlined
                    onClick={handleShowModal}
                    className="info-investment_icon"
                  />
                </Row>
                <p className="info-investment_2">
                  You may like to leave a gift to your loved ones. A gift can be
                  in the form of cash, valuables, priced possessions, vehicles,
                  real estate and even pets.
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
                          <Col className="number-1 div-center valuables__number1--color">
                            <WatchIcon />
                          </Col>
                          <Col>
                            <Row>
                              <span className="type">
                                {item?.valuablesType}
                              </span>
                            </Row>
                            <Row>
                              <span className="financial">
                                {item?.brand}
                              </span>
                            </Row>
                          </Col>
                        </Col>
                        <Col className="div-center responsive-list-data">
                          <Col className="mr-8 edit-button">
                            <CustomButton
                              icon={<EditOutlined />}
                              onClick={() => handleEdit(item)}
                              // disabled
                            >
                              Edit
                            </CustomButton>
                          </Col>
                          <Col className="trash-icon div-center">
                            <TrashIcon onClick={handleDelete} />
                            {isShowModalRemove && (
                              <ModalInfo
                                show={isShowModalRemove}
                                title="Remove"
                                content="Are you sure that you want to permanently remove the seleted section?"
                                handleOk={() => handleConfirmDelete(item)}
                                handleCancel={() => setIsShowModalRemove(false)}
                                contentButton="Remove"
                              />
                            )}
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
                      <Col className="number-1 div-center valuables__number1--color">
                        <WatchIcon />
                      </Col>
                      <Col>
                        <span className="investment-details-text">
                          Valuables Details
                        </span>
                      </Col>
                    </Col>
                  </Row>
                  <Col className="w-full">
                    <Row className="mb-32">
                      <SelectField
                        displayLabel
                        label="Valuables Type"
                        selectProps={{
                          placeholder: "Select",
                          value: data?.valuablesType || null,
                          onChange: value => handleChangeValuablesType(value),
                        }}
                      >
                        {options.map((item, index) => {
                          return (
                            <Option value={item.value}>{item.label}</Option>
                          );
                        })}
                      </SelectField>
                    </Row>
                    {isShowDetail && (
                      <>
                        <Row className="mb-32">
                          <InputField
                            displayLabel
                            label="Brand"
                            inputProps={{
                              placeholder: "e.g. Armani",
                              value: data?.brand,
                              name: "brand",
                              onChange: e => handleChangeInput(e),
                            }}
                          ></InputField>
                        </Row>
                        <Row className="mb-32">
                          <InputField
                            displayLabel
                            label="Model"
                            inputProps={{
                              placeholder: "e.g. Three-Hand Brown Leather",
                              value: data?.model,
                              name: "model",
                              onChange: e => handleChangeInput(e),
                            }}
                          ></InputField>
                        </Row>
                        <Row className="mb-32">
                          <InputField
                            displayLabel
                            label="Serial No."
                            inputProps={{
                              placeholder: "e.g. 110099",
                              value: data?.serialNo,
                              name: "serialNo",
                              onChange: e => handleChangeInput(e),
                            }}
                          ></InputField>
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
                <CloudValuablesIcon />
                <span onClick={handleAddInvestment} style={{cursor: "pointer"}}>
                  Add Valuable
                </span>
              </Row>
            </Col>
          </Row>
        </Row>
      </Row>
      {isShowModal && (
        <ModalInfo
          show={isShowModal}
          title="Valuables"
          content="Gifts will be deducted from your estate first before the estate is split between the beneficiaries by the distribution percentage you have specified. It is optional to give gifts to individuals, and entirely up to your discretion."
          handleOk={handleOk}
          handleCancel={handleOk}
        />
      )}
    </>
  );
}

export default ValuablesLayout;
