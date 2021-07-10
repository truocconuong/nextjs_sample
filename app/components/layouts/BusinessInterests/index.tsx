import {EditOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {Row, Col} from "antd";
import CustomButton from "generals/Button";
import InputField from "generals/InputField";
import CustomToggle from "generals/Toggle";
import React, {useState} from "react";
import ModalInfo from "generals/Modal/ModalInfo";
import {
  BusinessImage,
  BusinessMobileImage,
  CloudBusinessIcon,
  ResetIcon,
  SaveIcon,
  TrashIcon,
} from "../../../../public/images";
import {isMobile} from "react-device-detect";

function BusinessInterestsLayout(props) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowForm, setIsShowForm] = useState(true);
  const [numberForm, setNumberForm] = useState(1);
  const [listData, setListData] = useState([]);
  const [data, setData] = useState({
    companyName: "",
    companyUEN: "",
    position: "",
    estimateCurrentMarketValue: "",
    percentageShare: "",
  });

  const handleReset = () => {
    setData({
      companyName: "",
      companyUEN: "",
      position: "",
      estimateCurrentMarketValue: "",
      percentageShare: "",
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
    handleReset();
    setNumberForm(tempListData.length + 1);
  };

  const handleEdit = item => {
    setIsShowForm(true);
    let tempListData = listData;
    setListData(tempListData.filter(i => i !== item));
    setData(tempListData.find(data => data === item));
    setNumberForm(tempListData.length);
  };

  const handleChangeInput = e => {
    const {name, value} = e.target;
    setData(prev => ({...prev, [name]: value}));
  };

  const handleAddInvestment = () => {
    setIsShowForm(true);
  };

  return (
    <>
      <Row className="investments">
        <Row className="body-investment" justify="center">
          <Row className="main-investment">
            <Col className="info-investment">
              <Row className="info-investment_content">
                {isMobile ? (
                  <BusinessMobileImage style={{marginBottom: "34px"}} />
                ) : (
                  <BusinessImage style={{marginBottom: "34px"}} />
                )}
                <Row className="info-investment_investments">
                  <span className="info-investment_1">Business Interests</span>
                  <InfoCircleOutlined
                    onClick={handleShowModal}
                    className="info-investment_icon"
                  />
                </Row>
                <p className="info-investment_2">
                  You may have owned or invested into multiple businesses. By
                  listing down your respective holdings of your business
                  interests, you will have a clearer picture to your overall
                  estate.
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
                              <span className="type">{item?.companyName}</span>
                            </Row>
                            <Row>
                              <span className="financial">
                                {item?.companyUEN}
                              </span>
                            </Row>
                          </Col>
                        </Col>
                        <Col className="div-center responsive-list-data">
                          <Col className="mr-8 edit-button">
                            <CustomButton
                              type="custom"
                              icon={<EditOutlined />}
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </CustomButton>
                          </Col>
                          <Col className="trash-icon div-center">
                            <TrashIcon />
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
                          Business Details
                        </span>
                      </Col>
                    </Col>
                  </Row>
                  <Col className="w-full">
                    <Row className="mb-32">
                      <InputField
                        displayLabel
                        label="Company Name"
                        inputProps={{
                          placeholder: "e.g. Sample Company Pte. Ltd.",
                          name: "companyName",
                          value: data?.companyName,
                          onChange: e => handleChangeInput(e),
                        }}
                      ></InputField>
                    </Row>
                    <Row className="mb-32">
                      <InputField
                        displayLabel
                        label="Company UEN"
                        inputProps={{
                          placeholder: "e.g. 52812812D",
                          name: "companyUEN",
                          value: data?.companyUEN,
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
                            label="Position"
                            inputProps={{
                              placeholder:
                                "e.g. Director / Shareholder / Secretary",
                              value: data?.position,
                              name: "position",
                              onChange: e => handleChangeInput(e),
                            }}
                          ></InputField>
                        </Row>
                        <Row className="mb-32 estimate">
                          <InputField
                            displayLabel
                            label="Estimated Current Market Value ($)"
                            inputProps={{
                              placeholder: "0.00",
                              value: data?.estimateCurrentMarketValue,
                              name: "estimateCurrentMarketValue",
                              onChange: e => handleChangeInput(e),
                            }}
                          ></InputField>
                          <span className="estimate-text w-full mt-16">
                            The Current Market Value that you inputted into the
                            field will not be reflected in your Will itself. By
                            entering the company market value, you will have a
                            clearer picture of the size of your current estate,
                            and helps you better distribute your assets.
                          </span>
                        </Row>
                        <Row className="mb-32">
                          <InputField
                            displayLabel
                            label="Percentage Share (%)"
                            inputProps={{
                              placeholder: "0.00",
                              value: data?.percentageShare,
                              name: "percentageShare",
                              onChange: e => handleChangeInput(e),
                            }}
                          ></InputField>
                        </Row>
                      </>
                    )}
                    <Row justify="center">
                      <Col style={{marginRight: "24px"}}>
                        <CustomButton
                          type="custom"
                          icon={<ResetIcon />}
                          onClick={handleReset}
                        >
                          Reset
                        </CustomButton>
                      </Col>
                      <Col>
                        <CustomButton
                          type="custom"
                          icon={<SaveIcon />}
                          onClick={handleSave}
                        >
                          Save
                        </CustomButton>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )}
              <Row className="add-investment" justify="space-between">
                <CloudBusinessIcon />
                <span onClick={handleAddInvestment} style={{cursor: "pointer"}}>
                  Add Entity
                </span>
              </Row>
            </Col>
          </Row>
        </Row>
      </Row>
      {isShowModal && (
        <ModalInfo
          show={isShowModal}
          title="Business Interests"
          content="Business Interests entail all the businesses that you own, including Corporate, Partnership, Limited Liability Company and Sole Proprietorship."
          handleOk={handleOk}
        />
      )}
    </>
  );
}

export default BusinessInterestsLayout;
