import MyAccountLayout from '@layout/MyAccount/MyAccountLayout';
import HeaderDashboard from '@module/MyAccount/HeaderDashboard';
import Layout, { Content } from 'antd/lib/layout/layout';
import React from 'react';
import AuthHoc from './AuthHoc';

const MyAccountScreen = () => {
    return <MyAccountLayout />;
};

export default  AuthHoc(MyAccountScreen);
