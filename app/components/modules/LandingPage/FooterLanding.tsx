import { LinkedinFooter, FacebookFooter, TwitterFooter, HomeTwitter } from '@images/index';
import { Col, Row, Typography } from 'antd';
import CustomButton from 'generals/Button';
import Link from 'next/link';
import React from 'react';

function FooterLanding(props) {
  return (
    <div className='home-landing-page'>
      <div className='landing-footer'>
        <div className="home-secure">
          <Typography.Title level={3}>Secure yourself, your loved ones & future now!</Typography.Title>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
          <CustomButton borderLarge fontWeightLarge size='large'>Create Your Will</CustomButton>
        </div>
        <Row className="home-twitter">
          <Col offset={2}>
            <HomeTwitter />
          </Col>
          <Col>
            <Typography.Title level={3}>
              Learn more with us @iwillstwitter
            </Typography.Title>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
          </Col>
        </Row>
        <Row className="home-contact">
          <Col xs={24} sm={24} md={12}>
            <Row className="compani-policy">
              <Col span={12}>
                <h5>Company</h5>
                <Link href='/faq'>Read FAQ</Link>
              </Col>
              <Col span={12}>
                <h5>Policies</h5>
                <Link href='/faq'>Terms of Use</Link>
                <Link href='/policy'>Privacy Policy</Link>
                <Link href='/protection'>Data Protection</Link>
              </Col>
            </Row>
          </Col>
          <Col className="home-social">
            <h5>Social</h5>
            <div className="social-icon">
              <div>
                <FacebookFooter />
                <span>Facebook</span>
              </div>
              <div>
                <TwitterFooter />
                <span>Twitter</span>
              </div>
              <div>
                <LinkedinFooter />
                <span>Linkedin</span>
              </div></div>
          </Col>
        </Row>
        <div className="home-footer">
          <h5>© 2020 iWills Singapore Pte Ltd. All rights reserved.</h5>
          <p>The Online Will Generator utilises a basic Will template and has been prepared upon the advice and with the assistance of Hin Tat Augustine & Partners and does not necessarily deal with every important topic or nor cover every aspect of the topics with which it deals. The Online Will Generator is intended for general use only and does not contain or convey any legal or other advice. You should seek legal advice from appropriately qualified lawyers for more specific Will requirements (e.g. Islamic law, persons under 21, not residing in Singapore etc.). You may refer to the Ministry of Law for more information. OCBC Bank does not act as adviser to you. OCBC Bank gives no warranty as to the accuracy or completeness of the Online Will Generator, and is not responsible for or liable to any person for any loss or damage arising from any reliance thereon.</p>
        </div>
      </div>
    </div>
  );
}

export default FooterLanding;