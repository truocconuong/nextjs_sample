import React from 'react';
import * as antd from 'antd'
const { Typography, Row, Col, List } = antd;
const { Title } = Typography;

import { TwoPeopleAbout, Convenience, FightingIcon, GroupSmile, BackgroundAbout, Secured, Simple, SmileDocument, Affor } from '@images/index';
import Paragraph from 'antd/lib/typography/Paragraph';
import { RightOutlined } from '@ant-design/icons';
import FooterLanding from '@module/LandingPage/FooterLanding';

function AboutUs(props) {
    return (
        <div className="about-us">
            <section className="au-header">
                <SmileDocument />
                <Title className="header-title">Your lifetime personal legacy planner</Title>
                <Paragraph className="header-description">
                    We exist to empower you in your legacy planning and Will-writing journey.
                </Paragraph>
            </section>
            <section className="au-content">
                <div className="au-content-section">
                    <Row gutter={16}>
                        <Col sm={{ span: 16 }} md={{ span: 12 }}>
                            <GroupSmile />
                        </Col>
                        <Col sm={{ span: 16 }} md={{ span: 12 }} >
                            <div className="au-content__title">
                                Vision & Mission
                            </div>
                            <div className="au-content__sub-title">
                                Vision
                            </div>
                            <div className="au-content__sub-desc">
                                Democratising Legacy Planning, Protecting Legacies.
                            </div>

                            <div className="au-content__sub-title">
                                Mission
                            </div>
                            <div className="au-content__sub-desc">
                                <p>
                                    We make Will-Writing accessible and affordable for everyone.
                                </p>
                                <p>
                                    We seek to provide a simple to use platform to help you manage your legacy. We strive to bring forth a holistic end to end legacy planning journey for you.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="au-content-section">
                    <Row justify="space-between" gutter={16}>
                        <Col sm={{ span: 16 }} md={{ span: 12 }}>
                            <div className="au-content__title">
                                Our Team
                            </div>
                            <div className="au-content__sub-desc">
                                <p className="maker-color"><strong> iWills was created by</strong> wealth management practitioners and experts, Ivan Cham and Bernard Soo.</p>
                                <p> Ivan has more than 15 years experience in the financial industry building banking technologies and digital projects for banks, and also managed assets for ultra-high net worth individuals across Asia. Through his career in private banking, retail banking and asset management, he has build many wealth management platforms to help customers manage their wealth.</p>
                                <p>
                                    Bernard has more than 17 years banking experience and spent the earlier part of his career helping bank customer with their financial planning needs and portfolio management. During his stint heading the Wealth Proposition initiatives for the banks he worked for, he advocates financial literacy, designing customer wealth propositions to address customer pain points and building wealth management digital platforms to empower customers in managing their wealth.
                                </p>
                            </div>
                        </Col>
                        <Col sm={{ span: 16 }} md={{ span: 12 }}>
                            <TwoPeopleAbout />
                        </Col>
                    </Row>
                </div>
            </section>
            <section className="section-action">
                <div className='home-5168517'>
                    <Typography.Title level={3}>Empowering you to manage your Will and legacy at your fingertips</Typography.Title>
                    <Row justify="space-between" className="list-benefit">
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
            </section>
            <FooterLanding />
        </div >
    );
}

export default AboutUs;