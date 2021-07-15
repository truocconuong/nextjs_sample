import Layout, { Content, Header } from 'antd/lib/layout/layout';
import React from 'react';
import HomeLayout from '@layout/Home/HomeLayout';
import FaqLayout from '@layout/Faq/FaqLayout';

function Faq(props) {
  return (
    <Layout style-={{ backgroundColor: 'white' }}>
      <Header style={{ height: '80px' }}></Header>
      <Content>
        <FaqLayout />
      </Content>
    </Layout>
  );
}

export default Faq;