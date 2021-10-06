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
} from "@images/index";
import {PersonalEstatesListingActions, ProgressActions} from "@redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import {IData, IMasterdata} from "@constant/data.interface";
import {v4 as uuidv4} from "uuid";
import {formatNumberMoney, isValidMoney, limitLength} from "@util/index";

const {Option} = Select;

interface IProps {
  isLogin: boolean;
}

function InvestmentsLayout(props: IProps) {
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
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowForm, setIsShowForm] = useState(true);
  const [numberForm, setNumberForm] = useState(1);
  const [listData, setListData] = useState([]);
  const [data, setData] = useState({
    id: "",
    type_id: null,
    financial_institutions: "",
    account_no: "",
    capital_outlay: "",
    current_market_value: "",
  });
  // const [isContinue, setIsContinue] = useState(false);
  const [errors, setErrors] = useState({
    type_id: false,
    financial_institutions: false,
  });
  const [optionInvestments, setOptionInvestments] = useState([]);
  const [optionFinancials, setOptionFinancials] = useState([]);
  const [disabledEdit, setDisabledEdit] = useState(false);

  useEffect(() => {
    if (categoryData?.investments) {
      const temp = categoryData?.investments.map(item => ({
        ...item,
        capital_outlay:
          item?.capital_outlay && formatNumberMoney(item?.capital_outlay),
        current_market_value:
          item?.current_market_value &&
          formatNumberMoney(item?.current_market_value),
      }));
      setListData(temp);
      setNumberForm(categoryData.investments.length + 1);
      if (categoryData.investments.length >= 1 && !data.id) {
        setIsShowForm(false);
      }
    }
  }, [categoryData?.investments]);

  useEffect(() => {
    if (masterDataReducer) {
      const tempInvestments = [];
      const tempFinancials = [];
      masterDataReducer.map(item => {
        if (item?.value === "INVESTMENT") {
          tempInvestments.push({
            label: item?.name,
            value: item?.id,
          });
        }
        if (item?.value === "FINANCIAL_INSTITUTIONS") {
          tempFinancials.push({
            label: item?.name,
            value: item?.name,
          });
        }
      });
      setOptionInvestments(tempInvestments);
      setOptionFinancials(tempFinancials);
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
          router: "/personal-estates-listing/business-interest",
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
      type_id: null,
      financial_institutions: "",
      account_no: "",
      capital_outlay: "",
      current_market_value: "",
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
    if (!data?.type_id) {
      error.type_id = true;
      isError = true;
    }
    if (!data?.financial_institutions) {
      error.financial_institutions = true;
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
      capital_outlay: Number(
        data.capital_outlay.toString().replaceAll(",", "")
      ),
      current_market_value: Number(
        data.current_market_value.toString().replaceAll(",", "")
      ),
    };
    if (disabledEdit) {
      // edit
      if (isLogin) {
        dispatch(
          PersonalEstatesListingActions.updateInvestment(
            submitData.id,
            submitData,
            () => {}
          )
        );
      } else {
        dispatch(
          PersonalEstatesListingActions.updateInvestmentGuest(
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
          PersonalEstatesListingActions.createInvestment(
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
          PersonalEstatesListingActions.createInvestmentGuest(
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
        PersonalEstatesListingActions.updateInvestment(
          tempItem?.id,
          tempItem,
          () => {}
        )
      );
      return;
    }
    dispatch(
      PersonalEstatesListingActions.deleteInvestmentGuest(
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

  const handleChangeInputNumberWithMoney = e => {
    const {name, value} = e.target;
    const tempValue = Number(value.replaceAll(",", ""));
    if (value.split(".").length - 1 > 1 || !isValidMoney(tempValue)) return;
    setData(prev => ({
      ...prev,
      [name]: limitLength(formatNumberMoney(value), 30),
    }));
  };

  const handleAddInvestment = () => {
    if (isShowForm) return;
    setNumberForm(listData.length + 1);
    setIsShowForm(true);
    setDisabledEdit(false);
  };

  const handleDeleteForm = () => {
    handleReset();
    handleResetState();
  };

  const handleFinancial = (input: string) => {
    if (data?.financial_institutions === input) return;
    setData(prev => ({...prev, financial_institutions: input}));
    setErrors(prev => ({...prev, financial_institutions: false}));
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
                                {
                                  masterDataReducer.find(
                                    masterData =>
                                      masterData.id === item?.type_id
                                  )?.name
                                }
                              </span>
                            </Row>
                            <Row>
                              <span className="financial">
                                {item?.financial_institutions}
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
                      <Col className="number-1 div-center">
                        <span>{numberForm}</span>
                      </Col>
                      <Col>
                        <span className="investment-details-text">
                          Investment Details
                        </span>
                      </Col>
                    </Col>
                    <Col className="div-center trash-icon">
                      <TrashEnabledIcon onClick={handleDeleteForm} />
                    </Col>
                  </Row>
                  <Col className="w-full">
                    <Row className="mb-32">
                      <SelectField
                        displayLabel
                        label="Investment Type"
                        selectProps={{
                          placeholder: "Select",
                          value: data?.type_id,
                          onChange: value => {
                            setData(prev => ({...prev, type_id: value}));
                            setErrors(prev => ({...prev, type_id: false}));
                          },
                        }}
                        isError={errors?.type_id}
                      >
                        {optionInvestments.map(item => {
                          return (
                            <Option value={item.value}>{item.label}</Option>
                          );
                        })}
                      </SelectField>
                    </Row>
                    <Row className="mb-32">
                      <SelectField
                        displayLabel
                        label="Financial Institutions"
                        selectProps={{
                          placeholder: "Select",
                          value: data?.financial_institutions,
                          onChange: value => {
                            setData(prev => ({
                              ...prev,
                              financial_institutions: value,
                            }));
                            setErrors(prev => ({
                              ...prev,
                              financial_institutions: false,
                            }));
                          },
                          filterOption: (input, option) => {
                            handleFinancial(input);
                            return (
                              option?.children
                                ?.toLowerCase()
                                ?.indexOf(input.toLowerCase()) >= 0
                            );
                          },
                        }}
                        isError={errors?.financial_institutions}
                        searchable
                      >
                        {optionFinancials.map(item => {
                          return (
                            <Option value={item.value}>{item.label}</Option>
                          );
                        })}
                      </SelectField>
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
                              value: data?.account_no,
                              name: "account_no",
                              onChange: e => handleChangeInput(e),
                              type: "number",
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
                                value: data?.capital_outlay,
                                name: "capital_outlay",
                                onChange: e =>
                                  handleChangeInputNumberWithMoney(e),
                              }}
                            ></InputField>
                          </div>
                          <div className="wp-48">
                            <InputField
                              displayLabel
                              label="Current Market Value ($)"
                              inputProps={{
                                placeholder: "e.g. 90,000.00",
                                value: data?.current_market_value,
                                name: "current_market_value",
                                onChange: e =>
                                  handleChangeInputNumberWithMoney(e),
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
