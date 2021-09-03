import ModalSignIn, { IModalSignInProps } from "@module/SignIn/ModalSignIn";
import { isEmail } from "@util/index";
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
import { useDispatch } from "react-redux";
import { UserActions } from "@redux/actions";
import ModalOtp from "components/StartYourWill/Modal/ModalOtp";
import { useRouter } from "next/router";

export interface ISignInFormProps {
  isMobile: boolean;
  setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const SignInForm = (props: ISignInFormProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isMobile, setVisibleModal } = props;
  const [currentStep, setCurrentStep] = useState(1);
  const [isSignInFailed, setIsSignFailed] = useState<boolean>(false);
  const [isLoadingSignIn, setIsLoadingSignIn] = useState<boolean>(false);
  const [showModalOtp, setShowModalOtp] = useState(false);
  const [signInFormData, setSignInFormData] = useState<ISignInForm>({
    address: "",
    email: "",
  });
  const onGetStartedClick = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  const changeOtp = (otp) => {
    if (otp.length === 4) {
      dispatch(UserActions.validateOtp({email: signInFormData.email, otp}, (res) => {
        if(res?.access_token){
          localStorage.setItem("accessToken", res?.access_token);
          setShowModalOtp(false);
          router.push('/your-lagacy');
        }
      }))
    }
  };

  const onSignIn = () => {
    setIsLoadingSignIn(true);
    if (!signInFormData.email) {
      return;
    }
    dispatch(UserActions.signIn({ email: signInFormData.email }, (res: any) => {
      setIsLoadingSignIn(false);
      if (res) {
        setIsSignFailed(false);
        setShowModalOtp(true);
      } else {
        setIsSignFailed(true);
      }
    }))
  }

  const onChangeSignInFormValue = (key: string, value: string) => {
    if(isSignInFailed){
      setIsSignFailed(false);
    }
    const signInFormDataCopy = { ...signInFormData };
    signInFormDataCopy[key] = value;
    setSignInFormData(signInFormDataCopy);
  };
  const modalData: IModalSignInProps[] = [
    {
      id: 1,
      isMobile: isMobile,
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
    // {
    //   id: 2,
    //   isMobile: isMobile,
    //   icon: isMobile ? <SmileIconMobile /> : <SmileIcon />,
    //   header: "How would you like us to address you?",
    //   content: (
    //     <React.Fragment>
    //       <div className="content-title">
    //         This name is only a placeholder, and will be not be included in the
    //         actual will creation process
    //       </div>
    //       <div className="content-body">
    //         <div className="input-address">
    //           <InputField
    //             inputProps={{
    //               placeholder: "e.g. Robin",
    //               value: signInFormData.address,
    //               onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
    //                 onChangeSignInFormValue("address", e?.target?.value),
    //             }}
    //           />
    //         </div>
    //       </div>
    //     </React.Fragment>
    //   ),
    //   button: (
    //     <CustomButton
    //       size="large"
    //       className="btn-confirm"
    //       onClick={() => onGetStartedClick()}
    //       disabled={!signInFormData.address}
    //     >
    //       Continue
    //     </CustomButton>
    //   ),
    //   onCloseModal: () => setVisibleModal(false)
    // },
    {
      id: 2,
      isMobile: isMobile,
      icon: <InformationIcon />,
      header: "Sign In to iWills",
      content: (
        <React.Fragment>
          <div className="content-title">
            Update your financial assets and will regularly to protect your legacy and love ones.
          </div>
          <div className="content-body">
            <div className="input-address">
              <InputField
                inputProps={{
                  placeholder: "e.g. user@gmail.com",
                  value: signInFormData.email,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    onChangeSignInFormValue("email", e?.target?.value),
                }}
                isError={(signInFormData.email && !isEmail(signInFormData.email)) || isSignInFailed}
                displayErrorText={(signInFormData.email && !isEmail(signInFormData.email)) || isSignInFailed}
                errorTextStr={isSignInFailed ? "Email is not registered" : "Email is invalid."}
              />
            </div>
          </div>
        </React.Fragment>
      ),
      button: <CustomButton loading={isLoadingSignIn} onClick={onSignIn} type="dashed" size="large" icon={<SecurityIcon />} disabled={!signInFormData.email}>
        Sign In Securely
      </CustomButton>,
      onCloseModal: () => setVisibleModal(false)
    },
  ];
  return (
    <div className="sign-in-container">
      {modalData.map((item) => {
        if (item.id === currentStep) {
          return <ModalSignIn {...item} key={item.id} />;
        }
      })}
      {showModalOtp && (
        <ModalOtp
          showModal={showModalOtp}
          setShowModal={setShowModalOtp}
          email={signInFormData.email}
          changeOtp={changeOtp}
        />
      )}
    </div>
  );
};

export default SignInForm;
