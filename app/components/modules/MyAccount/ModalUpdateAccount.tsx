import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { SignUpEmail, SignUpEmailMobile } from '../../../../public/images';
import InputField from '@generals/InputField';

function ModalUpdateAccount(props) {
    const { showModal, setShowModal, onUpdate, type } = props;
    const [value, setValue] = useState('');

    const handleSignUp = () => {
        onUpdate(value);
        setShowModal(false);
    };

    const width = useSelector(
        createSelector(
            (state: any) => state?.sizeBrowser,
            (sizeBrowser) => sizeBrowser?.width
        )
    );

    return (
        <Modal
            maskClosable={true}
            footer={null}
            visible={showModal}
            onCancel={() => setShowModal(false)}
            className='modal-start-your-will'
            width={500}
            style={{ padding: '0px 16px' }}
        >
            <div className='modal-continue-your-will'>
                <div className='item-center'>
                    {width > 500 ? <SignUpEmail /> : <SignUpEmailMobile />}
                </div>
                <div className='text-title mt-24 mb-24'>
                    Update your {type === 'email' ? 'email' : 'phone number'}
                </div>
                <div className='text-will'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore
                </div>
                <div className='mt-24 mb-40'>
                    <InputField
                        inputProps={{
                            placeholder: `${
                                type === 'email'
                                    ? 'Your new email address'
                                    : 'Your new phone number'
                            }`,
                            value: value,
                            onChange: (
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setValue(e.target.value),
                        }}
                    />
                </div>
                <div className='item-center mt-24 mb-8'>
                    <Button
                        className='continue-btn'
                        onClick={handleSignUp}
                        disabled={value ? false : true}
                    >
                        Update
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
export default ModalUpdateAccount;
