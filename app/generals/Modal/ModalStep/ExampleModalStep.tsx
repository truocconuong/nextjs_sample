import {
  TypesOfOwnershipImage,
  PersonalEstatesListingImage,
} from "@images/index";
import React from "react";
import {useState} from "react";
import ModalStep from ".";

const optionsSplash = [
  {
    image: <PersonalEstatesListingImage />,
    title: "Personal Estates Listing",
    contents: [
      {
        content:
          "Your loved ones may not be fully aware of all your possessions. It is a good practise to regularly update your assets in the Personal Estate Listing to ensure your beneficiaries can fully inherit your legacy.",
      },
    ],
  },
  {
    image: <TypesOfOwnershipImage />,
    title: "Types of Ownership",
    alignContents: "start",
    contents: [
      {
        subTitle: "Solely Ownership",
        content:
          "If you pass on with an outstanding mortgage and without life insurance, your family may be left without  a roof if they are unable to service the loan.",
      },
      {
        subTitle: "Joint Ownership",
        content:
          "Only real estate that is solely under your name will become part of your estate when you pass on. Jointly-owned properties will go to the survivor by default and will not be part of your estate.",
      },
    ],
  },
];

function ExampleModalStep(props) {
  const [isShowModalSplash, setIsShowModalSplash] = useState(false);

  return (
    <div>
      <ModalStep
        show={isShowModalSplash}
        setShow={setIsShowModalSplash}
        options={optionsSplash}
      />
    </div>
  );
}

export default ExampleModalStep;
