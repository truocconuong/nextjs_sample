import { IBeneficiary, IData } from "@constant/data.interface";
import { PERSONAL_ALLOCATION } from "@constant/index";
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
import { Slider } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
export interface AllocationPersonalInterface {
  id: number;
  type: PERSONAL_ALLOCATION;
  name: string;
  percent: number;
  color: string;
}

const colorsMap = {
  [PERSONAL_ALLOCATION.FATHER]: "#FFE9BE",
  [PERSONAL_ALLOCATION.MOTHER]: "#FFD9D1",
  [PERSONAL_ALLOCATION.SON]: "#BAF0DF",
  [PERSONAL_ALLOCATION.DAUGHTER]: "#D3EDFF",
}
const Allocation = () => {
  const maxPercent = 100;
  const allocatePersonals: AllocationPersonalInterface[] = [
    {
      id: 1,
      type: PERSONAL_ALLOCATION.FATHER,
      name: "Ryan Kwek",
      percent: 0,
      color: "#FFE9BE",
    },
    {
      id: 2,
      type: PERSONAL_ALLOCATION.MOTHER,
      name: "Charlie Mok",
      percent: 0,
      color: "#FFD9D1",
    },
    {
      id: 3,
      type: PERSONAL_ALLOCATION.SON,
      name: "Gary Wu",
      percent: 0,
      color: "#BAF0DF",
    },
    {
      id: 4,
      type: PERSONAL_ALLOCATION.DAUGHTER,
      name: "Stacy Kwek",
      percent: 0,
      color: "#D3EDFF",
    },
  ];

  const [isMobile, setIsMobile] = useState(false);
  const [totalPercent, setTotalPercent] = useState(0);
  const [persons, setPersons] = useState<AllocationPersonalInterface[]>(
    allocatePersonals
  );
  const [isShowModalSplash, setIsShowModalSplash] = useState(true);

  const categoryData = useSelector(
    createSelector(
      (state: any) => state?.category,
      (category: IData) => {
        return category
      }
    )
  );
  
  useEffect(() => {
    const persons = toPersonsData();
    setPersons(persons);
  }, [categoryData])

  const toPersonsData = () => {
    const persons: AllocationPersonalInterface[] = categoryData?.beneficiaries?.map((beneficiary: IBeneficiary) => {
      return {
        color
      }
    })
  }

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

  const onRangeChange = (percent: any, id: number) => {
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
              <div className="title-mobile">{`${
                100 - totalPercent
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
                  return (
                    person.percent > 0 && (
                      <div
                        className="item"
                        key={person.id}
                        style={{
                          width: `${person.percent}%`,
                          backgroundColor: person.percent === maxPercent ? "#FFEBEC" : person.color,
                        }}
                      >
                        <div className={"char-represent"}>{person.percent === maxPercent ? "Error" : person.name[0]}</div>
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
                  <div className="icon">
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
                  <div className="title-desktop">{`${
                    100 - totalPercent
                  }% left to distribute`}</div>
                )}
                <div className="button">
                  <CustomButton
                    type="ghost"
                    size="large"
                    className="button-auto-distribute"
                    icon={<IconThunder />}
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
            return (
              <React.Fragment>
                <div className={"item-container "  + (person.percent === maxPercent ? "error-ratio" : "")}>
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
                        <div className="text">{person.name[0]}</div>
                      </div>
                      <div className="base-info">
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
                            className={person.percent === maxPercent ? "slider-wrap-error" : ""}
                          />
                        </div>
                      )}
                      <div
                        className={
                          "percent " + (person.percent > 0 ? "bold" : "normal")
                        }
                      >{`${person.percent}%`}</div>
                    </div>
                    {isMobile && (
                      <div className="range width-full">
                        <Slider
                          tipFormatter={formatter}
                          onChange={(e: any) => onRangeChange(e, person.id)}
                          value={person.percent}
                          className={person.percent === maxPercent ? "slider-wrap-error" : ""}
                        />
                      </div>
                    )}
                  </div>
                </div>
                { person.percent === maxPercent && <div className="error-text-ratio">Please adjust the percentage</div>}
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
