import {EditOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {Row, Col, Select} from "antd";
import React, {useEffect, useState} from "react";
import CustomButton from "@generals/Button";
import SelectField from "@generals/SelectField";
import ModalInfo from "@generals/Modal/ModalInfo";
import _ from "lodash";
import {
  CarIconValuables,
  CloudValuablesIcon,
  DiamondIconValuables,
  PetIconValuables,
  RealEstatesIconValuables,
  ResetIcon,
  SafeBoxIconValuables,
  SaveIcon,
  TrashEnabledIcon,
  ValuablesImage,
  WatchIconValuables,
} from "@images/index";
import {useDispatch, useSelector} from "react-redux";
import {PersonalEstatesListingActions, ProgressActions} from "@redux/actions";
import {v4 as uuidv4} from "uuid";
import {createSelector} from "reselect";
import {IData, IMasterdata} from "@constant/data.interface";
import GenerateForm from "./components/GenerateForm";

enum TYPE_VALUABLES {
  WATCH = "Watch",
  PET = "Pet",
  REAL_ESTATE = "Real Estate",
  SAFE_BOX = "Safe Box",
  JEWELLERY = "Jewellery",
  MOTOR_VEHICLE = "Motor Vehicle",
}

const {Option} = Select;

interface IProps {
  isLogin: boolean;
}

function ValuablesLayout(props: IProps) {
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
  // const [isShowModalRemove, setIsShowModalRemove] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowForm, setIsShowForm] = useState(true);
  const [disabledEdit, setDisabledEdit] = useState(false);
  const [listData, setListData] = useState([]);
  const [data, setData] = useState({
    id: "",
    type_id: "",
    brand: "",
    model: "",
    serial_no: "",
    plate_no: "",
    country_name: "",
    address_line_1: "",
    address_line_2: "",
    postal_code: "",
    pet_name: "",
    pet_breed: "",
    pet_registration_number: "",
    safe_box_detail: "",
  });
  // const [isContinue, setIsContinue] = useState(false);
  const [errors, setErrors] = useState({
    type_id: false,
  });
  const [optionAssets, setOptionAssets] = useState([]);

  useEffect(() => {
    if (categoryData?.valuables) {
      setListData(categoryData.valuables);
      if (categoryData.valuables.length >= 1 && !data.id) {
        setIsShowForm(false);
      }
    }
  }, [categoryData?.valuables]);

  useEffect(() => {
    if (masterDataReducer) {
      const tempAssets = [];
      masterDataReducer.map(item => {
        if (item?.value === "ASSET") {
          tempAssets.push({
            label: item?.name,
            value: item?.id,
          });
        }
      });
      setOptionAssets(tempAssets);
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
          router: "/allocation",
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
      type_id: "",
      brand: "",
      model: "",
      serial_no: "",
      plate_no: "",
      country_name: "",
      address_line_1: "",
      address_line_2: "",
      postal_code: "",
      pet_name: "",
      pet_breed: "",
      pet_registration_number: "",
      safe_box_detail: "",
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
    };
    if (disabledEdit) {
      // Edit
      if (isLogin) {
        dispatch(
          PersonalEstatesListingActions.updateValuable(
            submitData.id,
            submitData,
            () => {}
          )
        );
      } else {
        dispatch(
          PersonalEstatesListingActions.updateValuableGuest(
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
          PersonalEstatesListingActions.createValuable(submitData, property => {
            submitData.id = property.id;
            setListData([...listData, submitData]);
          })
        );
      } else {
        const tempSubmitData = {...submitData, id: uuidv4()};
        dispatch(
          PersonalEstatesListingActions.createValuableGuest(
            tempSubmitData,
            () => {}
          )
        );
      }
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
    setIsShowDetail(true);
    let tempListData = [...listData];
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
        PersonalEstatesListingActions.updateValuable(
          tempItem?.id,
          tempItem,
          () => {}
        )
      );
      return;
    }
    dispatch(
      PersonalEstatesListingActions.deleteValuableGuest(tempItem?.id, () => {})
    );
  };

  // const handleConfirmDelete = item => {
  //   let tempListData = listData.filter(i => i !== item);
  //   setListData(tempListData);
  //   // setNumberForm(tempListData.length + 1);
  //   setIsShowModalRemove(false);
  // };

  const handleAddValuable = () => {
    if (isShowForm) return;
    setIsShowForm(true);
    setDisabledEdit(false);
  };

  const handleChangeValuablesType = value => {
    setData(prev => ({...prev, type_id: value}));
    setErrors(prev => ({...prev, type_id: false}));
    setIsShowDetail(true);
  };

  const handleDeleteForm = () => {
    handleReset();
    handleResetState();
  };

  const generateIcon = id => {
    const name = masterDataReducer.find(masterData => masterData.id === id)
      ?.name;
    switch (name) {
      case TYPE_VALUABLES.JEWELLERY:
        return <DiamondIconValuables />;
      case TYPE_VALUABLES.MOTOR_VEHICLE:
        return <CarIconValuables />;
      case TYPE_VALUABLES.PET:
        return <PetIconValuables />;
      case TYPE_VALUABLES.REAL_ESTATE:
        return <RealEstatesIconValuables />;
      case TYPE_VALUABLES.WATCH:
        return <WatchIconValuables />;
      case TYPE_VALUABLES.SAFE_BOX:
        return <SafeBoxIconValuables />;
      default:
        return <WatchIconValuables />;
    }
  };
  
  const generateInfoSecond = (item) => {
    const name = masterDataReducer.find(masterData => masterData.id === item?.type_id)
      ?.name;
    switch (name) {
      case TYPE_VALUABLES.JEWELLERY, TYPE_VALUABLES.MOTOR_VEHICLE, TYPE_VALUABLES.WATCH:
        return item?.brand;
      case TYPE_VALUABLES.PET:
        return item?.name;
      case TYPE_VALUABLES.REAL_ESTATE:
        return item?.country;
      case TYPE_VALUABLES.SAFE_BOX:
        return item?.safe_box_detail.substring(0, 20);
      default:
        return;
    }
  }

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
                            {generateIcon(item?.type_id)}
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
                              <span className="financial">{generateInfoSecond(item)}</span>
                            </Row>
                          </Col>
                        </Col>
                        <Col className="div-center responsive-list-data">
                          <Col className="mr-8 edit-button">
                            <CustomButton
                              icon={<EditOutlined />}
                              onClick={() => handleEdit(item)}
                              width="100%"
                              disabled={disabledEdit}
                            >
                              Edit
                            </CustomButton>
                          </Col>
                          <Col className="trash-icon div-center">
                            <TrashEnabledIcon
                              onClick={() => handleDelete(item)}
                            />
                            {/* <TrashEnabledIcon onClick={handleDelete} />
                            {isShowModalRemove && (
                              <ModalInfo
                                show={isShowModalRemove}
                                title="Remove"
                                content="Are you sure that you want to permanently remove the seleted section?"
                                handleOk={() => handleConfirmDelete(item)}
                                handleCancel={() => setIsShowModalRemove(false)}
                                contentButton="Remove"
                              />
                            )} */}
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
                        {generateIcon(data.type_id)};
                      </Col>
                      <Col>
                        <span className="investment-details-text">
                          Valuables Details
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
                        label="Valuables Type"
                        selectProps={{
                          placeholder: "Select",
                          value: data?.type_id || null,
                          onChange: value => handleChangeValuablesType(value),
                        }}
                      >
                        {optionAssets.map(item => {
                          return (
                            <Option value={item.value}>{item.label}</Option>
                          );
                        })}
                      </SelectField>
                    </Row>
                    {isShowDetail && (
                      <GenerateForm
                        masterDataReducer={masterDataReducer}
                        data={data}
                        setData={setData}
                      />
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
                <span onClick={handleAddValuable} style={{cursor: "pointer"}}>
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
