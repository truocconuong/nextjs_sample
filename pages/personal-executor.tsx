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
    if(categoryData?.executors){
      setFirstRender(false);
    }
  }, [categoryData?.executors])

  return localStorage.getItem("accessToken") ? <PersonalExecutor firstRender={firstRender} data={categoryData}/> : <PersonalExecutor firstRender={false} data={categoryData}/>
};

export default AuthHoc(PersonalExecutorScreen);
