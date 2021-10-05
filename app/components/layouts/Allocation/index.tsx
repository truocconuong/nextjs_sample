import {
  IBeneficiary,
  IData,
  IMasterdata,
  ISetPercent,
} from "@constant/data.interface";
import { MASTERDATA_TYPE, PERSONAL_ALLOCATION } from "@constant/index";
import CustomButton from "@generals/Button";
import ModalStep from "@generals/Modal/ModalStep";
import {
  IconDistribute,
  IconDistributeMobile,
  IconEstateDistributionDesktop,
  IconEstateDistributionMobile,
  IconThunder,
  TipIcon,
} from "@images/index";
import { CategoryActions, ProgressActions, UserActions } from "@redux/actions";
import { Input, Slider } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useDispatch } from "react-redux";
import { getAmountPercentCompleted } from "../../../../utils/helpers/Tool.util";
import InputField from "@generals/InputField";
import { isNumber } from "@util/index";
export interface AllocationPersonalInterface {
  id: string;
  type: string;
  name: string;
  percent: number;
  color: string;
  email?: string;
  nric?: string;
  relationship_id?: string;
}

const colorsMap = [
  "#FFE9BE",
  "#FFD9D1",
  "#BAF0DF",
  "#D3EDFF",
];
const Allocation = () => {
  const dispatch = useDispatch();
  const maxPercent = 100;
  const [isMobile, setIsMobile] = useState(false);
  const [totalPercent, setTotalPercent] = useState(0);
  const [currentInputShow, setCurrentInputShow] = useState<string>("");
  const [isErrorInputPercent, setIsErrorInputPercent] = useState<boolean>(false);
  const toPersonsData = () => {
    const persons: AllocationPersonalInterface[] = categoryData?.beneficiaries?.map(
      (beneficiary: IBeneficiary, index: number) => {
        const relationshipName = masterdata
          .filter((item) => item.value === MASTERDATA_TYPE.RELATIONSHIP)
          .find((item) => item.id === beneficiary.relationship_id)?.name;
        return {
          color: colorsMap[(index % colorsMap.length)],
          id: beneficiary.id,
          name: beneficiary.full_legal_name,
          percent: beneficiary.percent,
          type: relationshipName,
          email: beneficiary.email,
          nric: beneficiary.nric,
          relationship_id: beneficiary.relationship_id,
        };
      }
    );
    return persons || [];
  };
  const [persons, setPersons] = useState<AllocationPersonalInterface[]>(
    toPersonsData()
  );
  const [isShowModalSplash, setIsShowModalSplash] = useState(false);
  const categoryData = useSelector(
    createSelector(
      (state: any) => state?.category,
      (category: IData) => {
        return category;
      }
    )
  );


  useEffect(() => {
    const persons = toPersonsData();
    setPersons(persons);
    let total = 0;
    persons.forEach(person => {
      total += person.percent;
    })
    const existedAllocationError = persons.length > 1 && persons.find(
      (item) => item.percent === maxPercent
    );
    setTotalPercent(total);
    if (total === maxPercent && !existedAllocationError) {
      dispatch(
        ProgressActions.setDisabled(
          {
            disabled: false,
          },
          () => { }
        )
      );
    } else {
      dispatch(
        ProgressActions.setDisabled(
          {
            disabled: true,
          },
          () => { }
        )
      );
    }


  }, [categoryData]);

  const masterdata = useSelector(
    createSelector(
      (state: any) => state?.masterdata,
      (masterdata: IMasterdata[]) => masterdata
    )
  );

  useEffect(() => {
    dispatch(
      ProgressActions.setPushable(
        {
          pushable: true,
        },
        () => { }
      )
    );
    dispatch(
      ProgressActions.setRouter(
        {
          router: "/start-your-will-create",
        },
        () => { }
      )
    );
  }, []);

  const optionsSplash = [
    {
      image: isMobile ? (
        <IconEstateDistributionMobile />
      ) : (
        <IconEstateDistributionDesktop />
      ),
      title: "Estate Distribution",
      contents: [
        {
          content:
            "Decide how you would like to distribute your residuary estate, after netting off your gifts, debts and taxes, by percentages to your beneficiaries.",
        },
      ],
    },
    {
      image: isMobile ? <IconDistributeMobile /> : <IconDistribute />,
      title: "Distribute Your Estate",
      alignContents: "start",
      contents: [
        {
          content:
            "Giving percentage by sliding the slider bar below to the right to each beneficiary to desired percentage.",
        },
      ],
    },
  ];

  const width = useSelector(
    createSelector(
      (state: any) => state?.sizeBrowser,
      (sizeBrowser) => sizeBrowser?.width
    )
  );

  useEffect(() => {
    setIsMobile(width < 1192);
  }, [width]);

  const formatter = (value: number) => {
    return `${value}%`;
  };

  const onRangeChange = (percent: any, id: string) => {
    const personsCopy = [...persons];
    const remainPersons = [...persons].filter((person) => person.id !== id);
    const total = remainPersons.reduce(function (acc, obj) {
      return acc + obj.percent;
    }, 0);
    if (percent > maxPercent - total) {
      return;
    }
    setTotalPercent(total + percent);
    const index = personsCopy.findIndex(
      (person: AllocationPersonalInterface) => person.id === id
    );
    personsCopy[index].percent = percent;
    setPersons(personsCopy);
  };

  const saveAllocation = (value: number, id: string) => {
    const dataForm = toApiDataForm(persons);
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(
        UserActions.updateBeneficiary(
          { percent: value },
          `${id}`,
          token,
          () => { }
        )
      );
    }
    dispatch(CategoryActions.setBeneficiary(dataForm, (data) => { }));

    setNewPercent(dataForm);
  };

  const saveAllocationByInput = (value: string, id: string, isEnter: boolean) => {
    if (!isEnter || !isNumber(value)) {
      return;
    }
    onRangeChange(parseInt(value), id);
    setCurrentInputShow(null);
  };

  function setNewPercent(dataForm: IBeneficiary[]) {
    categoryData.beneficiaries = dataForm;
    dispatch(
      ProgressActions.setPercent(
        {
          percent: getAmountPercentCompleted(categoryData),
        },
        () => { }
      )
    );
  }

  const toApiDataForm = (dataForm: AllocationPersonalInterface[]) => {
    const dataRes: IBeneficiary[] = dataForm.map(
      (dataForm: AllocationPersonalInterface) => {
        return {
          full_legal_name: dataForm.name,
          relationship_id: dataForm.relationship_id,
          email: dataForm.email,
          nric: dataForm.nric,
          id: dataForm?.id,
          percent: dataForm.percent,
        };
      }
    );
    return dataRes;
  };

  const onAutoDistribute = () => {
    const personsCopy = [...persons];
    let total = 0;
    personsCopy?.map((item) => {
      const value = Math.round(maxPercent / personsCopy.length);
      item.percent = value;
      total += value;
    });
    if (total !== maxPercent && personsCopy[0]) {
      personsCopy[0].percent = maxPercent - total + personsCopy[0]?.percent;
    }
    setTotalPercent(maxPercent);
    setPersons(personsCopy);
    const dataForm = toApiDataForm(personsCopy);
    const token = localStorage.getItem("accessToken");
    if (token) {
      const dataSetPercents = toSetPercentApiData(personsCopy);
      dispatch(UserActions.setPercents(dataSetPercents, token, () => { }));
    } else {
      dispatch(CategoryActions.setBeneficiary(dataForm, () => { }));
    }
    setNewPercent(dataForm);
  };

  const toSetPercentApiData = (persons: AllocationPersonalInterface[]) => {
    const res: ISetPercent[] = persons.map((item) => {
      return {
        id: item.id,
        percent: item.percent,
      };
    });
    return res;
  };

  const maxLengthName = () => {
    const item = persons?.reduce(
      function (a, b) {
        return a?.name?.length > b?.name?.length ? a : b;
      }
    );
    return item?.name?.length || 0;
  }

  const getPresentName = (name: string) => {
    if (!name) {
      return "";
    }
    const value = name.split(" ");
    if (value?.length === 0) {
      return "";
    }
    return value[value.length - 1][0];
  }

  useEffect(() => {
    const existedAllocationError = persons.length > 1 && persons.find(
      (item) => item.percent === maxPercent
    );
    if (totalPercent === maxPercent && !existedAllocationError) {
      dispatch(
        ProgressActions.setDisabled(
          {
            disabled: false,
          },
          () => { }
        )
      );
    } else {
      dispatch(
        ProgressActions.setDisabled(
          {
            disabled: true,
          },
          () => { }
        )
      );
    }
    const dataForm = toApiDataForm(persons);
    setNewPercent(dataForm);
  }, [totalPercent])

  useEffect(() => {
    window?.scrollTo({top: 0, behavior: "smooth"});
  }, [])

  return (
    <div className="allocation-container">
      <div className="allocation-wrapper">
        <div
          className={
            "allocation-ratio " +
            (isMobile
              ? "allocation-ratio-height-mobile"
              : "allocation-ratio-height-desktop")
          }
        >
          <div
            className={
              "allocation-ratio-wrap " +
              (isMobile
                ? "column-reverse allocation-ratio-wrap-mobile"
                : "allocation-ratio-wrap-desktop")
            }
          >
            {isMobile && (
              <div className="title-mobile">{`${100 - totalPercent
                }% left to distribute`}</div>
            )}
            <div
              className={
                "ratio-wrap " +
                (isMobile ? "ratio-wrap-mobile" : "ratio-wrap-desktop")
              }
            >
              <div className="ratio-back"></div>
              <div
                className={
                  "ratio-front " +
                  (isMobile ? "ratio-front-mobile" : "ratio-front-desktop") +
                  (totalPercent === maxPercent ? " border-right-none" : "")
                }
              >
                {persons.map((person: AllocationPersonalInterface) => {
                  const isError = person.percent === maxPercent && persons.length > 1;
                  return (
                    person.percent > 0 && (
                      <div
                        className="item"
                        key={person.id}
                        style={{
                          width: `${person.percent || 0}%`,
                          backgroundColor:
                            isError
                              ? "#FFEBEC"
                              : person.color,
                        }}
                      >
                        <div className={"char-represent"}>
                          {isError
                            ? "Error"
                            : person?.name && getPresentName(person.name)}
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
            <div
              className={
                isMobile
                  ? "description-wrap-mobile"
                  : "description-wrap-desktop"
              }
            >
              <div className="description-left">
                <div className="title">
                  <div className="text">Estate Distribution</div>
                  <div
                    className="icon"
                    onClick={() => setIsShowModalSplash(true)}
                  >
                    <TipIcon />
                  </div>
                </div>
                <div className="des">
                  The percentage split across all beneficiaries must add up to
                  100%.
                </div>
              </div>
              <div className="description-right">
                {!isMobile && (
                  <div className="title-desktop">{`${100 - totalPercent
                    }% left to distribute`}</div>
                )}
                <div className="button">
                  <CustomButton
                    type="ghost"
                    size="large"
                    className="button-auto-distribute"
                    icon={<IconThunder />}
                    onClick={onAutoDistribute}
                  >
                    Automatically Distribute
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            "allocation-distribute-ratio " +
            (isMobile
              ? "allocation-distribute-ratio-width-mobile"
              : "allocation-distribute-ratio-width-desktop")
          }
        >
          {persons.map((person: AllocationPersonalInterface) => {
            const isError = person.percent === maxPercent && persons.length > 1;
            return (
              <React.Fragment key={person.id}>
                <div
                  className={
                    "item-container " +
                    (isError ? "error-ratio" : "")
                  }
                >
                  <div className="item-wrap">
                    <div
                      className={
                        isMobile
                          ? "card-base-info-mobile"
                          : "card-base-info-desktop"
                      }
                    >
                      <div
                        className="highlight-text"
                        style={{ backgroundColor: person.color }}
                      >
                        <div className="text">{getPresentName(person.name)}</div>
                      </div>
                      <div className="base-info" style={{ minWidth: `${(maxLengthName() * 10) + 10}px` }}>
                        <div className="name">{person.name}</div>
                        <div className="description">{person.type}</div>
                      </div>
                      {!isMobile && (
                        <div className="range">
                          <Slider
                            included={false}
                            max={100}
                            min={0}
                            tipFormatter={formatter}
                            onChange={(e: any) => onRangeChange(e, person.id)}
                            value={person.percent}
                            className={
                              isError
                                ? "slider-wrap-error"
                                : ""
                            }
                            onAfterChange={(e: any) =>
                              saveAllocation(e, person.id)
                            }
                          />
                        </div>
                      )}
                      <div
                        className={
                          "percent " + (person.percent > 0 ? "bold" : "normal")
                        }
                        onClick={() => setCurrentInputShow(person.id)}
                      >
                        {currentInputShow === person.id ?
                          <InputField
                            inputProps={{
                              defaultValue: person.percent || 0,
                              onKeyUp: (e) => saveAllocationByInput(e.currentTarget.value, person.id, e.key === 'Enter' || e.keyCode === 13),
                              maxLength: 2,
                              autoFocus: true,
                            }}
                            wrapperClassName="input-percent-custom"
                          />
                          : `${person.percent || 0}%`
                        }
                      </div>

                    </div>
                    {isMobile && (
                      <div className="range width-full">
                        <Slider
                          tipFormatter={formatter}
                          onChange={(e: any) => onRangeChange(e, person.id)}
                          value={person.percent || 0}
                          className={
                            isError
                              ? "slider-wrap-error"
                              : ""
                          }
                          onAfterChange={(e: any) =>
                            saveAllocation(e, person.id)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
                {isError && (
                  <div className="error-text-ratio">
                    Please adjust the percentage
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <ModalStep
        show={isShowModalSplash}
        setShow={setIsShowModalSplash}
        options={optionsSplash}
      />
    </div>
  );
};

export default Allocation;
