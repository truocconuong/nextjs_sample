import CustomButton from '@generals/Button';
import {
    HomeIconClose,
    HomeIconLogoHeader,
    HomeIconLogoHeaderMini,
    MenuMobile,
} from '@images/index';
import SignInForm from '@layout/SignIn';
import { Col, Drawer, Row } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import ModalBeforeStart from 'components/StartYourWill/Modal/ModalBeforeStart';
import ModalContinueYourWill from 'components/StartYourWill/Modal/ModalContinueYourWill';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
function HeaderLanding(props) {
    const router = useRouter();
    const [isShowModal, setIsShowModal] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const refDrawer = useRef();
    const openShowModal = () => {
        setIsShowModal(true);
    };
    const closeShowModal = () => {
        setIsShowModal(false);
    };

    const [showModalBeforeStart, setShowModalBeforeStart] = useState(false);
    const [showModalSignIn, setIsShowModalSignIn] = useState(false);
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


    const width = useSelector(
        createSelector(
            (state: any) => state?.sizeBrowser,
            sizeBrowser => sizeBrowser?.width
        )
    );

    useEffect(() => {
        setIsMobile(width < 768);
    }, [width]);

    const onSignIn = () => {
        setIsShowModalSignIn(true);
    }

    return (
        <Header className='header-landing'>
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
            <Row
                justify='space-between'
                align='middle'
                className='header-large'
            >
                <Col onClick={() => router.push('/')}>
                    <HomeIconLogoHeader />
                </Col>
                <Col>
                    <Row justify='space-between' align='middle'>
                        <Col
                            className={
                                router.pathname == '/learning-center'
                                    ? 'active'
                                    : ''
                            }
                        >
                            <Link href='/learning-center'>
                                <a>Learning Center</a>
                            </Link>
                        </Col>
                        <Col
                            className={
                                router.pathname == '/about' ? 'active' : ''
                            }
                        >
                            <Link href='/about'>
                                <a>About Us</a>
                            </Link>
                        </Col>
                        <Col
                            className={
                                router.pathname == '/faq' ? 'active' : ''
                            }
                        >
                            <Link href='/faq'>
                                <a>FAQ</a>
                            </Link>
                        </Col>
                        <Col
                            className={
                                router.pathname == '/contact' ? 'active' : ''
                            }
                        >
                            <Link href='/contact'>
                                <a>Contact</a>
                            </Link>
                        </Col>
                        <Col>
                            <div onClick={onSignIn}>
                                <a>Sign In</a>
                            </div>
                        </Col>
                        <Col>
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
                </Col>
            </Row>
            <Row
                justify='space-between'
                align='middle'
                className='header-small'
                ref={refDrawer}
            >
                <Col onClick={() => router.push('/')}>
                    <HomeIconLogoHeaderMini />
                </Col>
                <Col>
                    <MenuMobile onClick={openShowModal} />
                    {isShowModal && (
                        <Drawer
                            placement={'top'}
                            onClose={closeShowModal}
                            visible={isShowModal}
                            key={'top'}
                            closeIcon={<HomeIconClose />}
                            title={<HomeIconLogoHeaderMini />}
                            height={575}
                            getContainer={refDrawer?.current}
                        >
                            <Row className='drawer-content'>
                                <Col
                                    className={
                                        router.pathname == '/learning-center'
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    <Link href='/learning-center'>
                                        <a>Learning Center</a>
                                    </Link>
                                </Col>
                                <Col
                                    className={
                                        router.pathname == '/about'
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    <Link href='/about'>
                                        <a>About Us</a>
                                    </Link>
                                </Col>
                                <Col
                                    className={
                                        router.pathname == '/faq'
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    <Link href='/faq'>
                                        <a>FAQ</a>
                                    </Link>
                                </Col>
                                <Col
                                    className={
                                        router.pathname == '/contact'
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    <Link href='/contact'>
                                        <a>Contact</a>
                                    </Link>
                                </Col>
                                <Col style={{ border: 0 }}>
                                    <div onClick={onSignIn}>
                                        <a>Sign In</a>
                                    </div>
                                </Col>
                                <Col style={{ border: 0 }}>
                                    <CustomButton
                                        borderLarge
                                        fontWeightLarge
                                        size='large'
                                        width='100%'
                                        onClick={handleCreateYourWill}
                                    >
                                        Create Your Will
                                    </CustomButton>
                                </Col>
                            </Row>
                        </Drawer>
                    )}
                </Col>
            </Row>
            {showModalSignIn && <SignInForm isMobile={isMobile} setVisibleModal={setIsShowModalSignIn} />}
        </Header>
    );
}

export default HeaderLanding;
