import React from 'react';
import { Carousel, Row, Col, Typography, Button, Collapse } from 'antd';
import { DropdownCollapse, DropupCollapse, PolicyDocument, PolicyDocumentMini } from '@images/index'
import Link from 'next/link'
import FooterLanding from '@module/LandingPage/FooterLanding';
const { Panel } = Collapse;

function PolicyLayout(props) {
  return (
    <div className='faq-landing'>
      <Row align='middle' justify='center' className='faq-1'>
        <Col xl={{ span: 7, order: 1 }} sm={{ span: 24, order: 2 }} xs={{ span: 24, order: 2 }}>
          <h1>Frequently Asked Questions</h1>
          <p>Here are some commonly posted questions and our replies</p>
        </Col>
        <Col xl={{ offset: 2, order: 2 }} className='faq-svg-1'>
          <PolicyDocument />
          <PolicyDocumentMini />
        </Col>
      </Row>
      <div className='home-landing-page'>
        <Row justify='center' className='home-kzmd2LD'>
          <Col xl={18} sm={24}>
            <Collapse
              bordered={false}
              defaultActiveKey={['1']}
              expandIconPosition={'right'}
              expandIcon={({ isActive }) => isActive ? <DropupCollapse /> : <DropdownCollapse />}
              className="home-collapse"
            >
              <Panel header="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ?" key="1" className="site-collapse-custom-panel">
                <h6>(i) What happens when someone passes on without a Will in Singapore?</h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id volutpat lacus laoreet non.
                  Ac turpis egestas sed tempus urna et pharetra pharetra. Scelerisque varius morbi enim nunc faucibus a pellentesque sit. Elementum curabitur vitae nunc sed. </p>
                <h6>(ii) How will having a Will help when someone passes on in Singapore?</h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <h6>(iii) What are the benefits of establishing a Will? </h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ? Ac turpis egestas sed tempus urna et pharetra pharetra. Scelerisque varius morbi enim nunc faucibus a pellentesque sit. Elementum curabitur vitae nunc sed.</p>
              </Panel>
              <Panel header="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ?" key="2" className="site-collapse-custom-panel">
                <h6>(ii) How will having a Will help when someone passes on in Singapore?</h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </Panel>
              <Panel header="Lorem ipsum dolor sit amet" key="3" className="site-collapse-custom-panel">
                <h6>(iii) What are the benefits of establishing a Will? </h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ? Ac turpis egestas sed tempus urna et pharetra pharetra. Scelerisque varius morbi enim nunc faucibus a pellentesque sit. Elementum curabitur vitae nunc sed.</p>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </div>
      <FooterLanding />
    </div>
  );
}

export default PolicyLayout;