import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { SignUpEmail, SignUpEmailMobile } from "../../../../public/images";
import InputField from "@generals/InputField";

function ModalSignUpEmail(props) {
  const { showModal, setShowModal, onSignUpEmail, name, email } = props;
  // const [email, setEmail] = useState("");

  const handleSignUp = () => {
    onSignUpEmail();
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
      className="modal-start-your-will"
      width={500}
      style={{ padding: "0px 16px" }}
    >
      <div className="modal-continue-your-will">
        <div className="item-center">
          {width > 500 ? <SignUpEmail /> : <SignUpEmailMobile />}
        </div>
        <div className="text-title mt-24 mb-24">
          {name}, let’s protect your information
        </div>
        <div className="text-will">
          Your privacy and data security are important to us. All your personal
          information will be securely encrypted and protected.
        </div>
        <div className="mt-24 mb-40">
          <InputField
            inputProps={{
              placeholder: "Your preferred name",
              value: email,
              disabled: true,
              // onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              //   setEmail(e.target.value),
            }}
          />
        </div>
        <div className="item-center mt-24 mb-8">
          <Button
            className="continue-btn"
            onClick={handleSignUp}
            disabled={email ? false : true}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </Modal>
  );
}
export default ModalSignUpEmail;
