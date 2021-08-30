import React, { useState } from 'react';
import { Carousel, Row, Col, Typography, Button, Collapse } from 'antd';
import ArrowCarousel from '@element/ArrowCarousel/ArrowCarousel';
import CustomButton from 'generals/Button';
import {
  Home_5167814,
  Convenience,
  Secured,
  Simple,
  Affor,
  Home_5168374,
  Home_5167844,
  Home_5168635,
  HomeStep1,
  HomeStep1Mini,
  HomeStep2,
  HomeStep2Mini,
  HomeStep3,
  HomeStep3Mini,
  DidYouKnow,
  DidYouKnowMini,
  HomeShield,
  HomeNote,
  DropdownCollapse,
  DropupCollapse,
  HomeTwitter,
} from '@images/index';
import Link from 'next/link';
import FooterLanding from '@module/LandingPage/FooterLanding';
import ModalBeforeStart from 'components/StartYourWill/Modal/ModalBeforeStart';
import ModalContinueYourWill from 'components/StartYourWill/Modal/ModalContinueYourWill';
const { Panel } = Collapse;

function HomeLayout(props) {
  const [showModalBeforeStart, setShowModalBeforeStart] = useState(false);
  const [showModalContinueYourWill, setShowModalContinueYourWill] = useState(
    false
  );

  const handleCreateYourWill = () => {
    setShowModalBeforeStart(true);
  };

  const handleStartModelBefore = () => {
    setShowModalBeforeStart(false);
    setShowModalContinueYourWill(true);
  };

  return (
    <div className='home-landing-page'>
      {showModalBeforeStart && (
        <ModalBeforeStart
          showModal={showModalBeforeStart}
          setShowModal={setShowModalBeforeStart}
          handleStart={handleStartModelBefore}
        />
      )}
      {showModalContinueYourWill && (
        <ModalContinueYourWill
          showModal={showModalContinueYourWill}
          setShowModal={setShowModalContinueYourWill}
        />
      )}
      <div className='home-carousel'>
        <Carousel
          arrows
          prevArrow={<ArrowCarousel type='pre' />}
          nextArrow={<ArrowCarousel />}
        >
          <div>
            <Row
              justify={'space-around'}
              style={{ backgroundColor: '#ffd9d1' }}
            >
              <Col lg={9} md={24} className='content'>
                <div className='minute'>
                  <Typography.Title level={1}>
                    Protect your legacy in{' '}
                    <span className='under_minute'>Minutes</span>
                  </Typography.Title>
                </div>
                <h4>Complete your Will anytime, anywhere</h4>
                <h5>
                  Will-writing made affordable and accessible to everyone with
                  someone who matters
                </h5>
                <CustomButton
                  size='large'
                  borderLarge
                  fontWeightLarge
                  onClick={handleCreateYourWill}
                >
                  Create Your Will
                </CustomButton>
              </Col>
              <Col className='img_slick'>
                <img src='/images/person_carousel.png' alt='' />
              </Col>
            </Row>
          </div>
          <div>
            <Row
              justify={'space-around'}
              style={{ backgroundColor: '#E3F8F0' }}
            >
              <Col lg={9} md={24} className='content'>
                <div className='minute'>
                  <Typography.Title level={1}>
                    Protect your legacy in Minutes
                  </Typography.Title>
                </div>
                <h4>Complete your Will anytime, anywhere</h4>
                <h5>
                  Will-writing made affordable and accessible to everyone with
                  someone who matters
                </h5>
                <CustomButton
                  borderLarge
                  fontWeightLarge
                  size='large'
                  onClick={handleCreateYourWill}
                >
                  Create Your Will
                </CustomButton>
              </Col>
              <Col className='img_slick'>
                <img src='/images/person_carousel.png' alt='' />
              </Col>
            </Row>
          </div>
          <div>
            <Row
              justify={'space-around'}
              style={{ backgroundColor: '#FFE9BE' }}
            >
              <Col lg={9} md={24} className='content'>
                <div className='minute'>
                  <Typography.Title level={1}>
                    Protect your legacy in Minutes
                  </Typography.Title>
                </div>
                <h4>Complete your Will anytime, anywhere</h4>
                <h5>
                  Will-writing made affordable and accessible to everyone with
                  someone who matters
                </h5>
                <CustomButton
                  size='large'
                  borderLarge
                  fontWeightLarge
                  onClick={handleCreateYourWill}
                >
                  Create Your Will
                </CustomButton>
              </Col>
              <Col className='img_slick'>
                <img src='/images/person_carousel.png' alt='' />
              </Col>
            </Row>
          </div>
        </Carousel>
        <Row className='home-5167832'>
          <Col lg={2} md={24} xs={24} sm={24}>
            <Home_5167814 />
          </Col>
          <Col lg={15} md={24} xs={24} sm={24}>
            <h5>Most singaporeans ain’t aware of this at all!</h5>
            <h6>
              Writing a Will and leaving a legacy is commonly associated with
              vast fortune, however, even those without vast wealth will need to
              consider a writing a Will so that your loved ones' standards of
              living will not be disrupted in your absence.
            </h6>
          </Col>
          <Col>
            <Button>Learn More</Button>
          </Col>
        </Row>
      </div>
      <div className='home-5168517'>
        <Typography.Title level={3}>
          Empowering you to manage your Will and legacy at your fingertips
        </Typography.Title>
        <Row justify='space-between' className='list-benefit'>
          <Col xl={6} md={12}>
            <Convenience />
          </Col>
          <Col xl={6} md={12}>
            <Secured />
          </Col>
          <Col xl={6} md={12}>
            <Simple />
          </Col>
          <Col xl={6} md={12}>
            <Affor />
          </Col>
        </Row>
      </div>
      <div className='home-5168517-carousel'>
        <Typography.Title level={3}>
          Empowering you to manage your Will and legacy at your fingertips
        </Typography.Title>
        <Carousel>
          <Convenience />
          <Secured />
          <Simple />
          <Affor />
        </Carousel>
      </div>
      <Row className='mask-group' style={{}}>
        <Col className='mask-left'>
          <Typography.Title level={3}>
            <span className='simple'>Simple</span> Pricing Structure
          </Typography.Title>
          <p>All you need to do is simply to create, upload & manage.</p>
          <CustomButton
            borderLarge
            fontWeightLarge
            size='large'
            onClick={handleCreateYourWill}
          >
            Create Your Will
          </CustomButton>
        </Col>
        <Col className='mask-right'>
          <Home_5168374 />
          <p>
            The platform fees is to help us cover our cost incurred from
            maintaining a secured and safe environment for you to regularly
            review and onClick={handleCreateYourWill} create your Will and
            manage your legacy.
          </p>
          <h6>Benefits Platform Services:</h6>
          <div className='klkl55T'>
            <span className='jsTK77'>Free regular updating</span>
            <span> of Will as data entered will be encrypted and stored</span>
          </div>
          <span className='kk47tXa'>
            Free uploading of signed Will into the platform
          </span>
          <div>
            <span>
              Access to Legacy Planner Dashboard to manage your legacy
            </span>
          </div>
          <CustomButton
            borderLarge
            fontWeightLarge
            size='large'
            onClick={handleCreateYourWill}
          >
            Create Your Will
          </CustomButton>
        </Col>
      </Row>
      <div className='home_5167844'>
        <div className='HijK2l'>
          <Home_5167844 />
        </div>
        <div className='g2KuLzz'>
          <Home_5168635 />
          <h4>
            Smart, savvy way of creating and managing your Will in 3 simple
            steps
          </h4>
          <h5>All you need to do is simply to create, upload & manage.</h5>
        </div>
      </div>
      <Row className='jjRTz9U2' justify={'space-around'}>
        <Col className='kZ7t2Rf2'>
          <HomeStep1 />
          <HomeStep1Mini />
        </Col>
        <Col md={{ span: 18 }} xl={{ span: 7 }} className='home-kz12'>
          <h5>Step 1</h5>
          <h3>Will Creation</h3>
          <h6>
            Seamless and simple Will writing experience with relevant insights
            to guide you.{' '}
          </h6>
          <h4>
            <h4 className='home-kz12-h4'>Express document toggle </h4>
            for drafting of Basic Will in minutes.
          </h4>
        </Col>
      </Row>
      <Row
        className='jjRTz9U2'
        style={{ flexDirection: 'row-reverse' }}
        justify={'space-around'}
      >
        <Col className='kZ7t2Rf2'>
          <img
            src='/images/home_step2.png'
            alt='img'
            width='636'
            height='390'
          />
          <img
            src='/images/home_step2_mini.png'
            width='343'
            height='225'
            alt='img'
          />
        </Col>
        <Col md={18} xl={7} className='home-kz12'>
          <h5>Step 2</h5>
          <h3>Upload Securely</h3>
          <h6>
            A secured interface with your data encrypted and your Will stored
            safely to protect your privacy.{' '}
          </h6>
          <h4 style={{ backgroundColor: '#E0F6EF' }}>
            <h4 className='home-kz12-h4'>256-Bit Security System </h4>
            for quick Will crafting, so go and finish the Will fast!
          </h4>
        </Col>
      </Row>
      <Row className='jjRTz9U2' justify={'space-around'}>
        <Col className='kZ7t2Rf2'>
          <HomeStep3 />
          <HomeStep3Mini />
        </Col>
        <Col md={18} lg={18} xl={{ span: 7 }} className='home-kz12'>
          <h5>Step 3</h5>
          <h3>Manage Your Will</h3>
          <h6>
            Access and update your Will anytime, and manage your legacy with
            your personalised dashboard.
          </h6>
          <h4 style={{ backgroundColor: '#FAECEC' }}>
            <h4 className='home-kz12-h4'>Plan and manage </h4>your legacy
            holistically.
          </h4>
        </Col>
      </Row>
      <Row align='middle' justify='space-between' className='did-you-know'>
        <Col md={5} xl={8} xs={24} className='lkk4KUz'>
          <HomeShield />
        </Col>
        <Col className='kj2klk3'>
          <DidYouKnow />
          <DidYouKnowMini />
        </Col>
      </Row>
      <Row className='home-kzmd2LD' justify='space-between'>
        <Col md={24} className='home-adu2Vj'>
          <HomeNote />
        </Col>
        <Col md={10} className='home-frequently'>
          <Typography.Title level={3}>
            Frequently Asked Questions
          </Typography.Title>
          <CustomButton borderLarge fontWeightLarge size='large'>
            View All FAQs
          </CustomButton>
        </Col>
        <Col md={12}>
          <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIconPosition={'right'}
            expandIcon={({ isActive }) =>
              isActive ? <DropupCollapse /> : <DropdownCollapse />
            }
            className='home-collapse'
          >
            <Panel
              header='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ?'
              key='1'
              className='site-collapse-custom-panel'
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Id
                volutpat lacus laoreet non. Ac turpis egestas sed tempus urna et
                pharetra pharetra. Scelerisque varius morbi enim nunc faucibus a
                pellentesque sit. Elementum curabitur vitae nunc sed.{' '}
              </p>
            </Panel>
            <Panel
              header='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ?'
              key='2'
              className='site-collapse-custom-panel'
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Panel>
            <Panel
              header='Lorem ipsum dolor sit amet'
              key='3'
              className='site-collapse-custom-panel'
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod ? Ac turpis egestas sed tempus urna et pharetra
                pharetra. Scelerisque varius morbi enim nunc faucibus a
                pellentesque sit. Elementum curabitur vitae nunc sed.
              </p>
            </Panel>
          </Collapse>
        </Col>
        <CustomButton borderLarge fontWeightLarge size='large'>
          View All FAQs
        </CustomButton>
      </Row>
      <FooterLanding />
    </div>
  );
}

export default HomeLayout;
