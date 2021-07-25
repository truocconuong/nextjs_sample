import CustomButton from '@generals/Button';
import { SmileComplete } from '@images/index';
import { Row, Typography } from 'antd';
import React from 'react';

const CompleteScreen = () => {
    return (
        <div className='complete-screen'>
            <div className='body'>
                <Row className='content'>
                    <SmileComplete />
                    <Typography.Title style={{ color: '#001064' }} level={3}>
                        Congratulations!
                    </Typography.Title>
                    <p>
                        Orem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt.
                    </p>
                    <CustomButton
                        borderLarge
                        fontWeightLarge
                        size='large'
                        // onClick={handleCreateYourWill}
                    >
                        Return to Dashboard
                    </CustomButton>
                </Row>
            </div>
        </div>
    );
};

export default CompleteScreen;
