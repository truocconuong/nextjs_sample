import CustomButton from '@generals/Button';
import {
    HomeIconClose,
    HomeIconLogoHeader,
    HomeIconLogoHeaderMini,
    IconSignOut,
    MenuMobile,
} from '@images/index';
import { CategoryActions } from '@redux/actions';
import { Col, Drawer, Row } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import ModalBeforeStart from 'components/StartYourWill/Modal/ModalBeforeStart';
import ModalContinueYourWill from 'components/StartYourWill/Modal/ModalContinueYourWill';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import ModalLogout from './ModalLogOut';
function HeaderDashboard(props) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isShowModal, setIsShowModal] = useState(false);
    const [showModalLogout, setShowModalLogout] = useState(false);
    const refDrawer = useRef();
    const openShowModal = () => {
        setIsShowModal(true);
    };
    const closeShowModal = () => {
        setIsShowModal(false);
    };

    const onHandleLogOut = () => {
        localStorage.removeItem("accessToken");
        dispatch(CategoryActions.resetCategoryData());
        router.push("/");
        setShowModalLogout(false);
    };

    return (
        <Header className='header-landing'>
            {showModalLogout && (
                <ModalLogout
                    showModal={showModalLogout}
                    setShowModal={setShowModalLogout}
                    onHandle={onHandleLogOut}
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
                                router.pathname == '/your-lagacy'
                                    ? 'active'
                                    : ''
                            }
                        >
                            <Link href='/your-lagacy'>
                                <a>Dashboard</a>
                            </Link>
                        </Col>
                        <Col
                            className={
                                router.pathname == '/my-account' ? 'active' : ''
                            }
                        >
                            <Link href='/my-account'>
                                <a>Account</a>
                            </Link>
                        </Col>
                        <Col>
                            <Link href='#'>
                                <div onClick={() => setShowModalLogout(true)}>
                                    <a>Sign out</a>
                                    <IconSignOut
                                        style={{
                                            marginLeft: '16px',
                                            marginTop: '-5px',
                                        }}
                                    />
                                </div>
                            </Link>
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
                                        router.pathname == '/your-lagacy'
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    <Link href='/your-lagacy'>
                                        <a>Dashboard</a>
                                    </Link>
                                </Col>
                                <Col
                                    className={
                                        router.pathname == '/my-account'
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    <Link href='/my-account'>
                                        <a>Account</a>
                                    </Link>
                                </Col>
                                <Col onClick={() => setShowModalLogout(true)}>
                                    <Link href='#'>
                                        <a>Sign out</a>
                                    </Link>
                                </Col>
                            </Row>
                        </Drawer>
                    )}
                </Col>
            </Row>
        </Header>
    );
}

export default HeaderDashboard;
