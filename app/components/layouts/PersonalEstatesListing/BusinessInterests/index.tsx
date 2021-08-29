import {EditOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {Row, Col} from "antd";
import React, {useEffect, useState} from "react";
import ModalInfo from "@generals/Modal/ModalInfo";
import CustomButton from "@generals/Button";
import InputField from "@generals/InputField";
import CustomToggle from "@generals/Toggle";
import {
  BusinessImage,
  BusinessMobileImage,
  CloudBusinessIcon,
  ResetIcon,
  SaveIcon,
  TrashEnabledIcon,
} from "@images/index";
import {isMobile} from "react-device-detect";
import {PersonalEstatesListingActions, ProgressActions} from "@redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import {IData} from "@constant/data.interface";
import {v4 as uuidv4} from "uuid";
import {limitLength} from "@util/index";

interface IProps {
  isLogin: boolean;
}

function BusinessInterestsLayout(props: IProps) {
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

  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowForm, setIsShowForm] = useState(true);
  const [numberForm, setNumberForm] = useState(1);
  const [disabledEdit, setDisabledEdit] = useState(false);
  const [listData, setListData] = useState([]);
  const [data, setData] = useState({
    id: "",
    company_name: "",
    company_uen: "",
    position: "",
    estimated_current_market_value: 0,
    percentage_share: 0,
  });
  // const [isContinue, setIsContinue] = useState(false);
  const [errors, setErrors] = useState({
    company_name: false,
    company_uen: false,
  });

  useEffect(() => {
    if (categoryData?.business_interests) {
      setListData(categoryData.business_interests);
      setNumberForm(categoryData.business_interests.length + 1);
      if (categoryData.business_interests.length >= 1 && !data.id) {
        setIsShowForm(false);
      }
    }
  }, [categoryData?.business_interests]);

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
          router: "/personal-estates-listing/valuables",
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
  //           disabled: false
  //         },
  //         () => {}
  //       )
  //     )
  //   }
  // }, [isContinue])

  const handleReset = () => {
    setData({
      id: "",
      company_name: "",
      company_uen: "",
      position: "",
      estimated_current_market_value: 0,
      percentage_share: 0,
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
    if (!data?.company_name) {
      error.company_name = true;
      isError = true;
    }
    if (!data?.company_uen) {
      error.company_uen = true;
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
      estimated_current_market_value: Number(
        data?.estimated_current_market_value
      ),
      percentage_share: Number(data?.percentage_share),
    };
    if (disabledEdit) {
      // Edit
      if (isLogin) {
        dispatch(
          PersonalEstatesListingActions.updateBusinessInterest(
            submitData.id,
            submitData,
            () => {}
          )
        );
      } else {
        dispatch(
          PersonalEstatesListingActions.updateBusinessInterestGuest(
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
          PersonalEstatesListingActions.createBusinessInterest(
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
          PersonalEstatesListingActions.createBusinessInterestGuest(
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
        PersonalEstatesListingActions.updateBusinessInterest(
          tempItem?.id,
          tempItem,
          () => {}
        )
      );
      return;
    }
    dispatch(
      PersonalEstatesListingActions.deleteBusinessInterestGuest(
        tempItem?.id,
        () => {}
      )
    );
  };

  const handleChangeInput = e => {
    const {name, value} = e.target;
    setErrors(prev => ({...prev, [name]: false}));
    setData(prev => ({...prev, [name]: limitLength(value, 30)}));
  };

  const handleAddInvestment = () => {
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
      <Row className="investments">
        <Row className="body-investment" justify="center">
          <Row className="main-investment">
            <Col className="info-investment bg-info-business">
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
                          <Col className="number-1 div-center bg-info-business">
                            <span>{index + 1}</span>
                          </Col>
                          <Col>
                            <Row>
                              <span className="type">{item?.company_name}</span>
                            </Row>
                            <Row>
                              <span className="financial">
                                {item?.company_uen}
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
                      <Col className="number-1 div-center bg-info-business">
                        <span>{numberForm}</span>
                      </Col>
                      <Col>
                        <span className="investment-details-text">
                          Business Details
                        </span>
                      </Col>
                    </Col>
                    <Col className="div-center trash-icon">
                      <TrashEnabledIcon onClick={handleDeleteForm} />
                    </Col>
                  </Row>
                  <Col className="w-full">
                    <Row className="mb-32">
                      <InputField
                        displayLabel
                        label="Company Name"
                        inputProps={{
                          placeholder: "e.g. Sample Company Pte. Ltd.",
                          name: "company_name",
                          value: data?.company_name,
                          onChange: e => handleChangeInput(e),
                        }}
                        isError={errors?.company_name}
                      ></InputField>
                    </Row>
                    <Row className="mb-32">
                      <InputField
                        displayLabel
                        label="Company UEN"
                        inputProps={{
                          placeholder: "e.g. 52812812D",
                          name: "company_uen",
                          value: data?.company_uen,
                          onChange: e => handleChangeInput(e),
                        }}
                        isError={errors?.company_uen}
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
                              type: "number",
                              placeholder: "0.00",
                              value: data?.estimated_current_market_value,
                              name: "estimated_current_market_value",
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
                              value: data?.percentage_share,
                              name: "percentage_share",
                              onChange: e => handleChangeInput(e),
                              type: "number",
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
          handleCancel={handleOk}
        />
      )}
    </>
  );
}

export default BusinessInterestsLayout;
