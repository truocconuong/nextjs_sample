import CustomButton from '@generals/Button';
import { HomeIconClose, HomeIconLogoHeader, HomeIconLogoHeaderMini, MenuMobile } from '@images/index';
import { Col, Drawer, Row } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
function HeaderLanding(props) {
  const [isShowModal, setIsShowModal] = useState(false);
  const refDrawer = useRef();
  const openShowModal = () => {
    setIsShowModal(true);
  }
  const closeShowModal = () => {
    setIsShowModal(false);
  }
  return (
    <Header className='header-landing'>
      <Row justify='space-between' align='middle' className="header-large">
        <Col>
          <HomeIconLogoHeader />
        </Col>
        <Col>
          <Row justify='space-between' align='middle'>
            <Col>
              <Link href="/learning-center">
                <a>Learning Center</a>
              </Link>
            </Col>
            <Col>
              <Link href="/about">
                <a>About Us</a>
              </Link>
            </Col>
            <Col>
              <Link href="/faq">
                <a>FAQ</a>
              </Link>
            </Col>
            <Col>
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </Col>
            <Col>
              <Link href="/">
                <a>Sign In</a>
              </Link>
            </Col>
            <Col>
              <CustomButton borderLarge fontWeightLarge size='large'>Create Your Will</CustomButton>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify='space-between' align='middle' className='header-small' ref={refDrawer}>
        <Col>
          <HomeIconLogoHeaderMini />
        </Col>
        <Col>
          <MenuMobile onClick={openShowModal} />
          {isShowModal && <Drawer
            placement={'top'}
            onClose={closeShowModal}
            visible={isShowModal}
            key={'top'}
            closeIcon={<HomeIconClose />}
            title={<HomeIconLogoHeaderMini />}
            height={575}
            getContainer={refDrawer?.current}
          >
            <Row className="drawer-content">
              <Col>
                <Link href="/learning-center">
                  <a>Learning Center</a>
                </Link>
              </Col>
              <Col>
                <Link href="/about">
                  <a>About Us</a>
                </Link>
              </Col>
              <Col>
                <Link href="/faq">
                  <a>FAQ</a>
                </Link>
              </Col>
              <Col>
                <Link href="/contact">
                  <a>Contact</a>
                </Link>
              </Col>
              <Col style={{ border: 0 }}>
                <Link href="/">
                  <a>Sign In</a>
                </Link>
              </Col>
              <Col style={{ border: 0 }}>
                <CustomButton borderLarge fontWeightLarge size='large' width="100%">Create Your Will</CustomButton>
              </Col>
            </Row>
          </Drawer>
          }
        </Col>
      </Row >
    </Header >
  );
}

export default HeaderLanding;