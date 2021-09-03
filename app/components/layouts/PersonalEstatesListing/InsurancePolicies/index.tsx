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
} from "@images/index";
import CustomCheckboxInfo from "@generals/Checkbox/CheckboxInfo";
import {useDispatch, useSelector} from "react-redux";
import {PersonalEstatesListingActions, ProgressActions} from "@redux/actions";
import {useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import {IData, IMasterdata} from "@constant/data.interface";
import {createSelector} from "reselect";
import {limitLength} from "@util/index";

const {Option} = Select;
interface IProps {
  isLogin: boolean;
}

function InsurancePolicyLayout(props: IProps) {
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
  const [disabledEdit, setDisabledEdit] = useState(false);
  const [data, setData] = useState({
    id: "",
    insurance_company_id: null,
    is_non_nomivated: true,
    policy_name: "",
    policy_no: "",
    current_value: 0,
    converage: 0,
    beneficiary_name: null,
    is_nominated: false,
  });
  // const [isContinue, setIsContinue] = useState(false);
  const [optionBeneficiaries, setOptionBeneficiaries] = useState([]);
  const [optionInsuranceCompanies, setOptionInsuranceCompanies] = useState([]);
  const [errors, setErrors] = useState({
    insurance_company_id: false,
    beneficiary_name: false,
  });

  useEffect(() => {
    if (categoryData?.insurance_policies) {
      setListData(categoryData.insurance_policies);
      setNumberForm(categoryData.insurance_policies.length + 1);
      if (categoryData.insurance_policies.length >= 1 && !data.id) {
        setIsShowForm(false);
      }
    }
  }, [categoryData?.insurance_policies]);

  useEffect(() => {
    if (masterDataReducer) {
      const tempInsuranceCompanies = [];
      masterDataReducer.map(item => {
        if (item?.value === "INSURANCE_COMPANY") {
          tempInsuranceCompanies.push({
            label: item?.name,
            value: item?.id,
          });
        }
      });
      setOptionInsuranceCompanies(tempInsuranceCompanies);
    }
  }, [masterDataReducer]);

  useEffect(() => {
    if (categoryData?.beneficiaries) {
      const tempOptions = [];
      categoryData?.beneficiaries.map(item => {
        tempOptions.push({
          label: item?.full_legal_name,
          value: item?.full_legal_name,
        });
      });
      setOptionBeneficiaries(tempOptions);
    }
  }, [categoryData?.beneficiaries]);

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
          router: "/personal-estates-listing/investment",
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
      insurance_company_id: null,
      is_non_nomivated: true,
      policy_name: "",
      policy_no: "",
      current_value: 0,
      converage: 0,
      beneficiary_name: null,
      is_nominated: false,
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
    if (!data?.insurance_company_id) {
      error.insurance_company_id = true;
      isError = true;
    }
    if (!data?.beneficiary_name && data?.is_nominated) {
      error.beneficiary_name = true;
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
      current_value: Number(data?.current_value),
      converage: Number(data?.converage),
    };
    if (disabledEdit) {
      // Edit
      if (isLogin) {
        dispatch(
          PersonalEstatesListingActions.updateInsurancePolicy(
            submitData.id,
            submitData,
            () => {}
          )
        );
      } else {
        dispatch(
          PersonalEstatesListingActions.updateInsurancePolicyGuest(
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
          PersonalEstatesListingActions.createInsurancePolicy(
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
          PersonalEstatesListingActions.createInsurancePolicyGuest(
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
        PersonalEstatesListingActions.updateInsurancePolicy(
          tempItem?.id,
          tempItem,
          () => {}
        )
      );
      return;
    }
    dispatch(
      PersonalEstatesListingActions.deleteInsurancePolicyGuest(
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

  const handleAddInsurancePolicy = () => {
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
                                {
                                  masterDataReducer.find(
                                    masterData =>
                                      masterData.id ===
                                      item?.insurance_company_id
                                  )?.name
                                }
                              </span>
                            </Row>
                            <Row>
                              <span className="financial">
                                {item?.is_non_nomivated
                                  ? "Non-Nominated"
                                  : "Nominated"}
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
                      <Col className="number-1 div-center insurance-policy__bg-common">
                        <span>{numberForm}</span>
                      </Col>
                      <Col>
                        <span className="investment-details-text">
                          Policy Details
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
                        label="Insurance Company"
                        selectProps={{
                          placeholder: "Select",
                          value: data?.insurance_company_id,
                          onChange: value => {
                            setErrors(prev => ({
                              ...prev,
                              insurance_company_id: false,
                            }));
                            setData(prev => ({
                              ...prev,
                              insurance_company_id: value,
                            }));
                          },
                          filterOption: (input, option) => {
                            return (
                              option?.children
                                ?.toLowerCase()
                                ?.indexOf(input.toLowerCase()) >= 0
                            );
                          },
                        }}
                        searchable
                        isError={errors?.insurance_company_id}
                      >
                        {optionInsuranceCompanies.map(item => {
                          return (
                            <Option value={item.value}>{item.label}</Option>
                          );
                        })}
                      </SelectField>
                    </Row>
                    <Row className="mb-24">
                      <CustomCheckboxInfo
                        checked={data?.is_non_nomivated}
                        onChange={() =>
                          setData(prev => ({
                            ...prev,
                            is_non_nomivated: true,
                            is_nominated: false,
                          }))
                        }
                        title="Non-Nominated"
                        content="Insurance policies that have not been nominated can be included as part of your estate. The insurance proceeds will be added into your estate and distributed to your beneficiaries upon claims."
                      />
                    </Row>
                    <Row className="mb-32">
                      <CustomCheckboxInfo
                        checked={data?.is_nominated}
                        onChange={() =>
                          setData(prev => ({
                            ...prev,
                            is_non_nomivated: false,
                            is_nominated: true,
                          }))
                        }
                        title="Nominated"
                        content="Insurance policies that have been nominated with beneficiaries will not be reflected in your Will itself. By entering the nominated policy details, you will have a clearer picture of the size of your current estate, and helps you better distribute your assets."
                      />
                    </Row>
                    {data?.is_nominated && (
                      <Row className="mb-32">
                        <SelectField
                          displayLabel
                          label="Beneficiary"
                          selectProps={{
                            placeholder: "Select",
                            value: data?.beneficiary_name,
                            onChange: value =>
                              setData(prev => ({
                                ...prev,
                                beneficiary_name: value,
                              })),
                          }}
                          isError={errors?.beneficiary_name}
                        >
                          {optionBeneficiaries.map(item => {
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
                              value: data?.policy_name,
                              name: "policy_name",
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
                                value: data?.policy_no,
                                name: "policy_no",
                                onChange: e => handleChangeInput(e),
                                type: "number",
                              }}
                            ></InputField>
                          </div>
                          <div className="wp-48">
                            <InputField
                              displayLabel
                              label="Current Value ($)"
                              inputProps={{
                                type: "number",
                                placeholder: "0.00",
                                value: data?.current_value,
                                name: "current_value",
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
                              type: "number",
                              placeholder: "0.00",
                              value: data?.converage,
                              name: "converage",
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
                <span
                  onClick={handleAddInsurancePolicy}
                  style={{cursor: "pointer"}}
                >
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
