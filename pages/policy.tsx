import Layout, { Content, Header } from 'antd/lib/layout/layout';
import React from 'react';
import HeaderLanding from '@module/LandingPage/HeaderLanding';
import PolicyLayout from '@layout/Policy/PolicyLayout';

function Faq(props) {
  return (
    <Layout style-={{ backgroundColor: 'white' }}>
      <HeaderLanding />
      <Content>
        <PolicyLayout />
      </Content>
    </Layout>
  );
}

export default Faq;