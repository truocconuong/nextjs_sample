import AboutUs from '@layout/AboutUs';
import HeaderLanding from '@module/LandingPage/HeaderLanding';
import Layout, { Content } from 'antd/lib/layout/layout';
import React from 'react';

function AboutUsScreen(props) {
    return (
        <Layout style-={{ backgroundColor: 'white' }}>
            <HeaderLanding />
            <Content>
                <AboutUs />
            </Content>
        </Layout>
    );
}

export default AboutUsScreen;