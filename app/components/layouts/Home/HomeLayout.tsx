import React from 'react';
import { Carousel, Row, Col, Typography, Button } from 'antd';
import ArrowCarousel from '@element/ArrowCarousel/ArrowCarousel';
import CustomButton from 'generals/Button';
import { PersonCarousel, Home_5167814 } from '@images/index'

function HomeLayout(props) {
  return (
    <div className="home-landing-pgae">
      <div className="home-carousel">
        <Carousel arrows prevArrow={<ArrowCarousel type="pre" />} nextArrow={<ArrowCarousel />}>
          <div>
            <Row justify={'space-around'} style={{ backgroundColor: '#ffd9d1' }}>
              <Col md={9} className='content'>
                <div className='minute'>
                  <Typography.Title level={1}>Protect your legacy in <span className='under_minute'>Minutes</span></Typography.Title>
                </div>
                <h4>Complete your Will anytime, anywhere</h4>
                <h5>Will-writing made affordable and accessible to everyone with someone who matters</h5>
                <CustomButton type="ghost" size='large'>Create Your Will</CustomButton>
              </Col>
              <Col className='img_slick'>
                <PersonCarousel />
              </Col>
            </Row>
          </div>
          <div>
            <Row justify={'space-around'} style={{ backgroundColor: '#E3F8F0' }}>
              <Col md={9} className='content'>
                <div className='minute'>
                  <Typography.Title level={1}>Protect your legacy in Minutes</Typography.Title>
                </div>
                <h4>Complete your Will anytime, anywhere</h4>
                <h5>Will-writing made affordable and accessible to everyone with someone who matters</h5>
                <CustomButton type="ghost" size='large'>Create Your Will</CustomButton>
              </Col>
              <Col className='img_slick'>
                <PersonCarousel />
              </Col>
            </Row>
          </div>
        </Carousel>
        <Row className='home-5167832'>
          <Col md={2} xs={24} sm={24}>
            <Home_5167814 />
          </Col>
          <Col md={18} xs={24} sm={24}>
            <h5>
              Most singaporeans ain’t aware of this at all!
            </h5>
            <h6>
              Writing a Will and leaving a legacy is commonly associated with vast fortune, however, even those without vast wealth will need to consider a writing a Will so that your loved ones' standards of living will not be disrupted in your absence.
            </h6>
          </Col>
          <Col>
            <Button>Learn More</Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HomeLayout;