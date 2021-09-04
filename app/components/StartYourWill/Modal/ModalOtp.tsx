import React, { useState } from "react";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import OtpInput from "react-otp-input";

import { Otp, OtpMobile } from "../../../../public/images";

function ModalOtp(props) {
  const { showModal, setShowModal, changeOtp, email, onChangeEmail } = props;
  const [otp, setOtp] = useState("");

  const width = useSelector(
    createSelector(
      (state: any) => state?.sizeBrowser,
      (sizeBrowser) => sizeBrowser?.width
    )
  );

  const handleChangeOtp = (otp) => {
    changeOtp(otp);
    setOtp(otp);
  };

  return (
    <Modal
      maskClosable={true}
      footer={null}
      visible={showModal}
      onCancel={() => setShowModal(false)}
      className="modal-start-your-will"
      width={500}
      style={{ padding: "0px 16px" }}
    >
      <div className="modal-continue-your-will">
        <div className="item-center">
          {width > 500 ? <Otp /> : <OtpMobile />}
        </div>
        <div className="text-title mt-24 mb-24">
          Awesome! let’s verify your email now
        </div>
        <div className="text-will">
          Secure your email with the 4-digit OTP verification code sent to your
          registered email address
        </div>
        <div className="item-center mt-24 mb-16">
          <span className="email-otp ">{email}</span>
        </div>
        <div className="input-otp item-center">
          <OtpInput
            value={otp}
            onChange={handleChangeOtp}
            numInputs={4}
            separator={<span>{"  "}</span>}
            isInputNum
            disabledStyle
            inputStyle={{ width: 90 }}
          />
        </div>
        <div className="do-not-receive-email mt-24 mb-24">
          Didn’t receive email OTP, Click here to re-send a new OTP for
          verification
        </div>
        <div className="change-email mt-40 mb-8" onClick={onChangeEmail}>
          Change Email
        </div>
      </div>
    </Modal>
  );
}
export default ModalOtp;
