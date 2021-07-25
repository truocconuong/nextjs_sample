import React, { useState } from 'react';
import { Modal, Row } from 'antd';
import CustomButton from '@generals/Button';

function ModalLogout(props) {
    const { showModal, setShowModal, onHandle } = props;
    const style = {
        h1: {
            fontFamily: 'Recoleta-Medium',
            fontSize: '24px',
            lineHeight: '125%',
            letterSpacing: '-0.5px',
            color: '#001064',
            marginBottom: '16px',
        },
        h2: {
            fontFamily: 'Graphik',
            fontSize: '16px',
            lineHeight: '155%',
            letterSpacing: ' -0.5px',
            color: '#6670A2',
            marginBottom: '40px',
        },
    };
    return (
        <Modal
            maskClosable={true}
            footer={null}
            visible={showModal}
            onCancel={() => setShowModal(false)}
            className='modal-start-your-will'
            width={500}
            style={{ padding: '0px 16px', marginTop: '20vh' }}
        >
            <div className='modal-log-out'>
                <h1 style={style.h1}>Log out</h1>
                <h2 style={style.h2}>
                    All your data and information are saved and secured, are you
                    sure you want to log out of iWills?
                </h2>
                <Row justify={'center'}>
                    <CustomButton onClick={onHandle}>Log out</CustomButton>
                </Row>
            </div>
        </Modal>
    );
}
export default ModalLogout;
