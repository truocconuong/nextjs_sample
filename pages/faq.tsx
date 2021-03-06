import Layout, { Content, Header } from 'antd/lib/layout/layout';
import React from 'react';
import FaqLayout from '@layout/Faq/FaqLayout';
import HeaderLanding from '@module/LandingPage/HeaderLanding';

function Faq(props) {
  return (
    <Layout style-={{ backgroundColor: 'white' }}>
      <HeaderLanding />
      <Content>
        <FaqLayout />
      </Content>
    </Layout>
  );
}

export default Faq;