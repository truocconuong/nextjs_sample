import {IData} from "@constant/data.interface";
import PersonalBeneficiary from "@layout/PersonalBeneficiary";
import React from "react";
import {useState} from "react";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {createSelector} from "reselect";
import AuthHoc from "./AuthHoc";

const PersonalBeneficiaryScreen = () => {
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const categoryData = useSelector(
    createSelector(
      (state: any) => state?.category,
      (category: IData) => {
        return category;
      }
    )
  );

  useEffect(() => {
    if (categoryData?.executors) {
      setFirstRender(false);
    }
  }, [categoryData?.executors]);

  return localStorage.getItem("accessToken") ? (
    <PersonalBeneficiary firstRender={firstRender} data={categoryData} />
  ) : (
    <PersonalBeneficiary firstRender={false} data={categoryData} />
  );
};

export default AuthHoc(PersonalBeneficiaryScreen);
