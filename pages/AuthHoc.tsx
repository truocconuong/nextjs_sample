import { IData, IResponseGetProfile } from '@constant/data.interface';
import { NotificationWarning } from '@generals/notifications';
import { CategoryActions, MasterDataActions, ProgressActions } from '@redux/actions';
import { getProfile } from '@redux/actions/profile';
import router, { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { getAmountPercentCompleted } from '../utils/helpers/Tool.util';

const AuthHoc = (WrappedComponent: any) => {
  const FuncComponent = ({ children, ...props }) => {
    const router = useRouter();
    const dispatch = useDispatch();

  const categoryData = useSelector(
    createSelector(
      (state: any) => state?.category,
      (category: IData) => {
        return category;
      }
    )
  );
    useEffect(() => {
      dispatch(MasterDataActions.getMasterData());
      const token = localStorage.getItem('accessToken');
      if (token) {
        dispatch(CategoryActions.getCategoriesData(token, (res) => {
          if(res?.statusCode === 401){
            localStorage.removeItem("accessToken");
            NotificationWarning("Your session has expired, please login again!");
            dispatch(CategoryActions.resetCategoryData());
            if(router?.pathname !== "/home"){
              router?.push("/home");
            }
          }else {
            if(router?.pathname === "/" || router?.pathname === "/home"){
              router?.push("/your-lagacy");
            }
          }
        }));
      }
      dispatch(
        ProgressActions.setPercent(
          {
            percent: getAmountPercentCompleted(categoryData),
          },
          () => {}
        )
      );
    }, []);
    return <WrappedComponent {...props}>{children}</WrappedComponent>;
  };
  return FuncComponent;
};

export default AuthHoc;
