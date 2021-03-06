import YourLegacyLayout from '@layout/YourLagacy/YourLegacyLayout';
import HeaderDashboard from '@module/MyAccount/HeaderDashboard';
import React from 'react';
import AuthHoc from './AuthHoc';

function YourLagacyScreen(props) {
    return (
        <div>
            <HeaderDashboard />
            <YourLegacyLayout />
        </div>
    );
}

export default AuthHoc(YourLagacyScreen);
