import { IData } from '@constant/data.interface';
import { IconEditMyAccount, LodgeForm } from '@images/index';
import HeaderDashboard from '@module/MyAccount/HeaderDashboard';
import ModalUpdateAccount from '@module/MyAccount/ModalUpdateAccount';
import { UserActions } from '@redux/actions';
import { Button, Col, Row } from 'antd';
import ModalOtp from 'components/StartYourWill/Modal/ModalOtp';
import ModalSignUpEmail from 'components/StartYourWill/Modal/ModalSignUpEmail';
import ModalSuccess from 'components/StartYourWill/Modal/ModalSuccess';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

function MyAccountLayout(props) {
  const categoryData = useSelector(
    createSelector(
      (state: any) => state?.category,
      (category: IData) => {
        return category;
      }
    )
  );
  const [showModalUpdateEmail, setShowModalUpdateEmail] = useState(false);
  const [showModalUpdatePhone, setShowModalUpdatePhone] = useState(false);
  const [email, setEmail] = useState<string>(categoryData?.email);
  const [phone, setPhone] = useState(categoryData?.phone);
  const [showModalOtp, setShowModalOtp] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const dispatch = useDispatch();

  const onUpdateEmail = (email: string) => {
    setEmail(email);
    const token = localStorage.getItem('accessToken');
    if (token)
      dispatch(UserActions.updateInforUser({ email }, token, () => {}));
    setShowModalUpdateEmail(false);
    setShowModalOtp(true);
  };

  const onUpdatePhone = (phone) => {
    const token = localStorage.getItem('accessToken');
    if (token)
      dispatch(UserActions.updateInforUser({ email }, token, () => {}));
    setPhone(phone);
    setShowModalUpdatePhone(false);
  };

  const changeOtp = (otp) => {
    if (otp.length === 4) {
      setTimeout(() => {
        setShowModalOtp(false);
        setShowModalSuccess(true);
      }, 1000);
    }
  };

  const handleReturnSuccess = () => {
    setShowModalSuccess(false);
  };
  return (
    <>
      <HeaderDashboard />
      <Row className='my-account' justify='center'>
        {showModalUpdateEmail && (
          <ModalUpdateAccount
            showModal={showModalUpdateEmail}
            setShowModal={setShowModalUpdateEmail}
            onUpdate={onUpdateEmail}
            type={'email'}
          />
        )}
        {showModalUpdatePhone && (
          <ModalUpdateAccount
            showModal={showModalUpdatePhone}
            setShowModal={setShowModalUpdatePhone}
            onUpdate={onUpdatePhone}
            type={'phone'}
          />
        )}
        {showModalOtp && (
          <ModalOtp
            showModal={showModalOtp}
            setShowModal={setShowModalOtp}
            email={email}
            changeOtp={changeOtp}
          />
        )}
        {showModalSuccess && (
          <ModalSuccess
            showModal={showModalSuccess}
            setShowModal={setShowModalSuccess}
            title='Account Created'
            textNote='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun.'
            handleReturn={handleReturnSuccess}
          />
        )}
        <Col lg={12} md={14} sm={20} xs={22}>
          <h1>Hello, {categoryData?.full_legal_name.split(' ')[0]}</h1>
          <Row className='content'>
            <Col span={24} style={{ marginBottom: '24px' }}>
              <Row align='middle'>
                <LodgeForm />
                <span className='jnsadj'>Account Settings</span>
              </Row>
            </Col>
            <Col span={24}>
              <h3>
                By writing a will, you will be able to take care of your loved
                ones when you are gone. Having a will allows you to distribute
                your assets according to your wishes.
              </h3>
            </Col>
            <Col span={24} className='infor-account'>
              <h4>Your Full Legal Name</h4>
              <h5>{categoryData?.full_legal_name}</h5>
            </Col>
            <Col span={24} className='infor-account'>
              <Row justify='space-between' align='middle'>
                <Col>
                  <h4>Email</h4>
                  <h5>{email}</h5>
                </Col>
                <Col>
                  <Button onClick={() => setShowModalUpdateEmail(true)}>
                    <IconEditMyAccount />
                    Edit
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col span={24} className='infor-account'>
              <Row justify='space-between' align='middle'>
                <Col>
                  <h4>Phone Number</h4>
                  <h5>{phone}</h5>
                </Col>
                <Col>
                  <Button onClick={() => setShowModalUpdatePhone(true)}>
                    <IconEditMyAccount />
                    Edit
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default MyAccountLayout;
