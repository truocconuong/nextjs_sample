import { CategoryActions, MasterDataActions } from '@redux/actions';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const AuthHoc = (WrappedComponent: any) => {
  const FuncComponent = ({ children, ...props }) => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(MasterDataActions.getMasterData());
      const token = localStorage.getItem('accessToken');
      if (token) {
        dispatch(CategoryActions.getCategoriesData(token));
      }
    }, []);
    return <WrappedComponent {...props}>{children}</WrappedComponent>;
  };
  return FuncComponent;
};

export default AuthHoc;
