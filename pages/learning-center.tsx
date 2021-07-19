import LearningCenter from '@layout/LearningCenter';
import HeaderLanding from '@module/LandingPage/HeaderLanding';
import Layout, { Content } from 'antd/lib/layout/layout';
import React from 'react';

function LearningCenterScreen(props) {
    return (
        <Layout style-={{ backgroundColor: 'white' }}>
            <HeaderLanding />
            <Content>
                <LearningCenter />
            </Content>
        </Layout>
    );
}

export default LearningCenterScreen;