import ModalSignIn, { IModalSignInProps } from "@module/SignIn/ModalSignIn";
import CustomButton from "generals/Button";
import InputField from "generals/InputField";
import React from "react";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import {
  GetStartedIcon,
  InformationIcon,
  SecurityIcon,
  SmileIcon,
  SmileIconMobile,
} from "../../../../public/images";
export interface ISignInForm {
  address: string;
  email: string;
}

export interface ISignInFormProps {
   isMobile: boolean;
}
const SignInForm = (props: ISignInFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [visibleModal, setVisibleModal] = useState(true);
  const [signInFormData, setSignInFormData] = useState<ISignInForm>({
    address: "",
    email: "",
  });
  console.log("rendered");
  const onGetStartedClick = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    console.log("clicked");
  };

  const onSignUpClick = () => {
    if(!signInFormData.email){
        return;
    }
    setIsSignUpSuccess(true);
  }

  const onChangeSignInFormValue = (key: string, value: string) => {
    const signInFormDataCopy = { ...signInFormData };
    signInFormDataCopy[key] = value;
    setSignInFormData(signInFormDataCopy);
  };
  const modalData: IModalSignInProps[] = [
    {
      id: 1,
      isMobile: props.isMobile,
      button: (
        <CustomButton
          size="large"
          className="btn-confirm"
          onClick={() => onGetStartedClick()}
        >
          Let's Get Started
        </CustomButton>
      ),
      icon: <GetStartedIcon />,
      header: "Before you start, here are some important notes",
      content: (
        <React.Fragment>
          <div className="content-title">
            The wills created here in iWills platform is only applicable for the
            following users:
          </div>
          <div className="content-body">
            <ul>
              <li>Persons above the age of 21</li>
              <li>
                Singapore citizens and residents governed by Singapore
                legislation
              </li>
            </ul>
          </div>
        </React.Fragment>
      ),
      footer: (
        <div className="footer-container">
          <hr />
          <div className="footer-content">
            <p>
              By checking “Let’s Get Started", I hereby confirm that iWills and
              its related corporations, as well as their respective
              representatives and/or agents, can collect, use or disclose my
              personal data in the manner set forth in{" "}
              <a>iWills’ Data Protection Policy</a> and the <a>FAQs.</a>{" "}
            </p>
          </div>
        </div>
      ),
      onCloseModal: () => setVisibleModal(false)
    },
    {
      id: 2,
      isMobile: props.isMobile,
      icon: isMobile ? <SmileIconMobile /> : <SmileIcon />,
      header: "How would you like us to address you?",
      content: (
        <React.Fragment>
          <div className="content-title">
            This name is only a placeholder, and will be not be included in the
            actual will creation process
          </div>
          <div className="content-body">
            <div className="input-address">
              <InputField
                inputProps={{
                  placeholder: "e.g. Robin",
                  value: signInFormData.address,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    onChangeSignInFormValue("address", e?.target?.value),
                }}
              />
            </div>
          </div>
        </React.Fragment>
      ),
      button: (
        <CustomButton
          size="large"
          className="btn-confirm"
          onClick={() => onGetStartedClick()}
          disabled={!signInFormData.address}
        >
          Continue
        </CustomButton>
      ),
      onCloseModal: () => setVisibleModal(false)
    },
    {
      id: 3,
      isMobile: props.isMobile,
      icon: <InformationIcon />,
      header: "Bernard, let’s protect your information",
      content: (
        <React.Fragment>
          <div className="content-title">
            Your privacy and data security are important to us. All your
            personal information will be securely encrypted and protected.
          </div>
          <div className="content-body">
            <div className="input-address">
              <InputField
                inputProps={{
                  placeholder: "e.g. user@gmail.com",
                  value: signInFormData.email,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    onChangeSignInFormValue("email", e?.target?.value),
                    disabled: isSignUpSuccess
                }}
              />
            </div>
          </div>
        </React.Fragment>
      ),
      button: isSignUpSuccess ? (
        <CustomButton type="dashed" size="large" icon={<SecurityIcon />} disabled={isSignUpSuccess}>
          Sign In Securely
        </CustomButton>
      ) : (
        <CustomButton
          size="large"
          className="btn-confirm"
          onClick={onSignUpClick}
          disabled={!signInFormData.email}
        >
          Sign Up
        </CustomButton>
      ),
      onCloseModal: () => setVisibleModal(false)
    },
  ];
  return (
    <div className="sign-in-container">
      {visibleModal && modalData.map((item) => {
        if (item.id === currentStep) {
          return <ModalSignIn {...item} key={item.id} />;
        }
      })}
    </div>
  );
};

export default SignInForm;
