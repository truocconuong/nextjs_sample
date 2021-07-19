import Layout, { Content, Header } from 'antd/lib/layout/layout';
import React from 'react';
import HeaderLanding from '@module/LandingPage/HeaderLanding';
import ContactLayout from '@layout/Contact/ContactLayout';

function Contact(props) {
  return (
    <Layout style-={{ backgroundColor: 'white' }}>
      <HeaderLanding />
      <Content>
        <ContactLayout />
      </Content>
    </Layout>
  );
}

export default Contact;