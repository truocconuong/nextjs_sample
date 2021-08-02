import { IData } from "@constant/data.interface";
import PersonalExecutor from "@layout/PersonalExecutor";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import AuthHoc from "./AuthHoc";

const PersonalExecutorScreen = () => {
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const categoryData = useSelector(
    createSelector(
      (state: any) => state?.category,
      (category: IData) => {
        return category
      }
    )
  );

  useEffect(() => {
    console.log("set data render", categoryData)
    if(categoryData?.executors){
      setFirstRender(false);
    }
  }, [categoryData?.executors])

  const guestData = useSelector(
    createSelector(
      (state: any) => state.data,
      (globalData: any) => {
        return globalData
      }
    )
  );

  console.log("guest", guestData)

  return localStorage.getItem("accessToken") ? <PersonalExecutor firstRender={firstRender} data={categoryData}/> : <PersonalExecutor firstRender={false} data={guestData}/>
};

export default AuthHoc(PersonalExecutorScreen);
