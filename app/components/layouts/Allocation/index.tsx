import { PERSONAL_ALLOCATION } from "@constant/index";
import CustomButton from "@generals/Button";
import ModalStep from "@generals/Modal/ModalStep";
import {
  IconDistribute,
  IconEstateDistributionDesktop,
  IconThunder,
  TipIcon,
} from "@images/index";
import { Slider } from "antd";
import React, { useState } from "react";
export interface AllocationPersonalInterface {
  id: number;
  type: PERSONAL_ALLOCATION;
  name: string;
  percent: number;
  className: string;
  color: string;
}
const Allocation = () => {
  const allocatePersonals: AllocationPersonalInterface[] = [
    {
      id: 1,
      type: PERSONAL_ALLOCATION.FATHER,
      name: "Ryan Kwek",
      percent: 0,
      className: "father",
      color: "#FFE9BE",
    },
    {
      id: 2,
      type: PERSONAL_ALLOCATION.MOTHER,
      name: "Charlie Mok",
      percent: 0,
      className: "mother",
      color: "#FFD9D1",
    },
    {
      id: 3,
      type: PERSONAL_ALLOCATION.SON,
      name: "Gary Wu",
      percent: 0,
      className: "son",
      color: "#BAF0DF",
    },
    {
      id: 4,
      type: PERSONAL_ALLOCATION.DAUGHTER,
      name: "Stacy Kwek",
      percent: 0,
      className: "daughter",
      color: "#D3EDFF",
    },
  ];
  const [remainPercent, setRemainPercent] = useState(100);
  const [persons, setPersons] = useState<AllocationPersonalInterface[]>(
    allocatePersonals
  );
  const [isShowModalSplash, setIsShowModalSplash] = useState(true);
  const optionsSplash = [
    {
      image: <IconEstateDistributionDesktop />,
      title: "Estate Distribution",
      contents: [
        {
          content:
            "Decide how you would like to distribute your residuary estate, after netting off your gifts, debts and taxes, by percentages to your beneficiaries.",
        },
      ],
    },
    {
      image: <IconDistribute />,
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

  const formatter = (value: number) => {
    return `${value}%`;
  };

  const onRangeChange = (percent: any, id: number) => {
    const personsCopy = [...persons];
    const remainPersons = [...persons].filter(person => person.id !== id);
    const totalPercent = remainPersons.reduce(function (acc, obj) { return acc + obj.percent; }, 0);
    if(percent > (100 - totalPercent)){
      return;
    }
    const index = personsCopy.findIndex(
      (person: AllocationPersonalInterface) => person.id === id
    );
    personsCopy[index].percent = percent;
    setPersons(personsCopy);
    console.log("remain", 100 - totalPercent)
    setRemainPercent(100 - totalPercent)
  };
  return (
    <div className="allocation-container">
      <div className="allocation-desktop">
        <div className="allocation-ratio">
          <div className="allocation-ratio-wrap">
            <div className="ratio-wrap">
              <div className="ratio-back"></div>
              <div className="ratio-front">
                {persons.map((person: AllocationPersonalInterface) => {
                  console.log(person.id === persons.length && remainPercent === 0)
                  return (
                    person.percent > 0 &&
                    <div
                      className={"item " + (person.id === persons.length && remainPercent === 0 ? "border-right-none" : "")}
                      key={person.id}
                      style={{
                        width: `${person.percent}%`,
                        backgroundColor: person.color,
                      }}
                    >
                      <div className="char-represent">{person.name[0]}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="description-wrap">
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
                <div className="title">100% left to distribute</div>
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
        <div className="allocation-distribute-ratio">
          {persons.map((person: AllocationPersonalInterface) => {
            return (
              <div className="item-container">
                <div className="item-wrap">
                  <div className="card-base-info">
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
                    <div className="range">
                      <Slider
                        tipFormatter={formatter}
                        onChange={(e: any) => onRangeChange(e, person.id)}
                        value={person.percent}
                      />
                    </div>
                    <div className="percent">{`${person.percent}%`}</div>
                  </div>
                </div>
              </div>
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
