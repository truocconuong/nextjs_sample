import Layout, {Content, Header} from 'antd/lib/layout/layout';
import React from 'react';
import HomeLayout from '@layout/Home/HomeLayout';
import HeaderLanding from '@module/LandingPage/HeaderLanding';
import AuthHoc from './AuthHoc';

function Home(props) {
  return (
    <Layout style-={{ backgroundColor: 'white' }}>
      <HeaderLanding />
      <Content>
        <HomeLayout />
      </Content>
    </Layout>
  );
}

export default  AuthHoc(Home);