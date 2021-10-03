import LodgeWillLayout from '@layout/LodgeWill/LodgeWillLayout';
import React from 'react';
import AuthHoc from './AuthHoc';

const LodgeWillScreen = () => {
    return <LodgeWillLayout />;
};

export default AuthHoc(LodgeWillScreen);
