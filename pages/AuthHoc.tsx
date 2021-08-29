import { IData } from '@constant/data.interface';
import { CategoryActions, MasterDataActions, ProgressActions } from '@redux/actions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { getAmountPercentCompleted } from '../utils/helpers/Tool.util';

const AuthHoc = (WrappedComponent: any) => {
  const FuncComponent = ({ children, ...props }) => {
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
        dispatch(CategoryActions.getCategoriesData(token));
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
