import CustomButton from '@generals/Button';
import { LodgeKeyMini, LodgeKey } from '@images/index';
import PersonalWill from '@module/PersonalWill/PersonalWill';
import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

function LodgeWillLayout(props) {
    const router = useRouter();
    return (
        <div>
            <div className='lodge-will-banner'>
                <Row align='middle' justify='center' className='lodge-banner'>
                    <Col
                        xl={{ span: 7, order: 1 }}
                        sm={{ span: 24, order: 2 }}
                        xs={{ span: 24, order: 2 }}
                    >
                        <h1>Awesome Work!</h1>
                        <p>
                            You’ve successfully uploaded your Will into our
                            secure cloud infastructure. Next, you can consider
                            notifying the Wills Registry that your Will has been
                            made.
                        </p>
                        <h2>Benefits of lodging Will:</h2>
                        <h3>
                            Faciliation of Will through Singpass Will Registry &
                            iWills Benefits of lodging at Singpass Will registry
                        </h3>
                        <Row className='lodge-btn'>
                            <Col>
                                <CustomButton
                                    type='ghost'
                                    className='btn-login'
                                >
                                    Login Wills Registry
                                </CustomButton>
                            </Col>
                            <Col>
                                <CustomButton
                                    borderLarge
                                    fontWeightLarge
                                    className='btn-skip'
                                    onClick={() => router.push('/complete')}
                                >
                                    Skip This Step
                                </CustomButton>
                            </Col>
                        </Row>
                    </Col>
                    <Col
                        xl={{ offset: 2, order: 2 }}
                        className='lodge-banner-svg'
                    >
                        <LodgeKey />
                        <LodgeKeyMini />
                    </Col>
                </Row>
                <PersonalWill />
            </div>
        </div>
    );
}

export default LodgeWillLayout;
