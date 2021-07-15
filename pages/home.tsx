import Layout, {Content, Header} from 'antd/lib/layout/layout';
import React from 'react';
import HomeLayout from '@layout/Home/HomeLayout';

function Home(props) {
  return (
    <Layout>
      {/* <Header style={{height:'80px'}}></Header> */}
      <Content>
        <HomeLayout/>
      </Content>
    </Layout>
  );
}

export default Home;