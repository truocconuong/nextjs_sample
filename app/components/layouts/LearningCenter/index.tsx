import React from 'react';
import * as antd from 'antd'
const { Typography, Row, Col, List } = antd;
const { Title } = Typography;

import { FightingIcon } from '../../../../public/images';
import Paragraph from 'antd/lib/typography/Paragraph';
import { RightOutlined } from '@ant-design/icons';

function LearningCenter(props) {
    return (
        <div className="learning-center">
            <section className="lc-header">
                <FightingIcon />
                <Title className="header-title">Learning Center</Title>
                <Paragraph className="header-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aliquid vitae impedit qui provident, ratione vel nesciunt praesentium ipsam dolore, mollitia nisi ducimus totam. Debitis et ullam id atque expedita?
                </Paragraph>
            </section>
            <section className="lc-content">
                <Row gutter={16}>
                    <Col className="gutter-row" lg={{ span: 8 }}  >
                        <div className="lc-content__card">
                            <div className="card-img">
                                <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" alt="" />
                            </div>
                            <div className="card-content">
                                <Paragraph className="card-content__title">Medium length headline</Paragraph>
                                <Paragraph className="card-content__description">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
                                </Paragraph>
                            </div>
                            <div className="card-read-more">
                                <span >Read more</span>
                                <RightOutlined />
                            </div>
                        </div>
                    </Col>
                    <Col className="gutter-row" lg={{ span: 8 }}>
                        <div className="lc-content__card">
                            <div className="card-img">
                                <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" alt="" />
                            </div>
                            <div className="card-content">
                                <Paragraph className="card-content__title">Medium length headline</Paragraph>
                                <Paragraph className="card-content__description">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
                                </Paragraph>
                            </div>
                            <div className="card-read-more">
                                <span >Read more</span>
                                <RightOutlined />
                            </div>
                        </div>
                    </Col>

                    <Col className="gutter-row" lg={{ span: 8 }}>
                        <div className="lc-content__card">
                            <div className="card-img">
                                <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" alt="" />
                            </div>
                            <div className="card-content">
                                <Paragraph className="card-content__title">Medium length headline</Paragraph>
                                <Paragraph className="card-content__description">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
                                </Paragraph>
                            </div>
                            <div className="card-read-more">
                                <span >Read more</span>
                                <RightOutlined />
                            </div>
                        </div>
                    </Col>

                    <Col className="gutter-row" lg={{ span: 8 }}>
                        <div className="lc-content__card">
                            <div className="card-img">
                                <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" alt="" />
                            </div>
                            <div className="card-content">
                                <Paragraph className="card-content__title">Medium length headline</Paragraph>
                                <Paragraph className="card-content__description">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
                                </Paragraph>
                            </div>
                            <div className="card-read-more">
                                <span >Read more</span>
                                <RightOutlined />
                            </div>
                        </div>
                    </Col>
                    <Col className="gutter-row" lg={{ span: 8 }}>
                        <div className="lc-content__card">
                            <div className="card-img">
                                <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" alt="" />
                            </div>
                            <div className="card-content">
                                <Paragraph className="card-content__title">Medium length headline</Paragraph>
                                <Paragraph className="card-content__description">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
                                </Paragraph>
                            </div>
                            <div className="card-read-more">
                                <span >Read more</span>
                                <RightOutlined />
                            </div>
                        </div>
                    </Col>
                    <Col className="gutter-row" lg={{ span: 8 }}>
                        <div className="lc-content__card">
                            <div className="card-img">
                                <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" alt="" />
                            </div>
                            <div className="card-content">
                                <Paragraph className="card-content__title">Medium length headline</Paragraph>
                                <Paragraph className="card-content__description">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
                                </Paragraph>
                            </div>
                            <div className="card-read-more">
                                <span >Read more</span>
                                <RightOutlined />
                            </div>
                        </div>
                    </Col>
                </Row >
            </section >
        </div >
    );
}

export default LearningCenter;