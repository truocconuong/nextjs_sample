import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { SignUpEmail, SignUpEmailMobile } from "../../../../public/images";
import InputField from "@generals/InputField";
import { isEmail } from "@util/index";

function ModalSignUpEmail(props) {
  const { showModal, setShowModal, onSignUpEmail, name, emailProps } = props;
  const [email, setEmail] = useState("");

  const handleSignUp = () => {
    onSignUpEmail(email);
    setShowModal(false);
  };

  useEffect(() => {
    setEmail(emailProps);
  }, []);

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
              placeholder: "e.g. user@gmail.com",
              value: email,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value),
            }}
            isError={email && !isEmail(email)}
            displayErrorText={email && !isEmail(email)}
            errorTextStr="Email is invalid."
          />
        </div>
        <div className="item-center mt-24 mb-8">
          <Button
            className="continue-btn"
            onClick={handleSignUp}
            disabled={(email && !isEmail(email)) || !email ? true : false}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </Modal>
  );
}
export default ModalSignUpEmail;
