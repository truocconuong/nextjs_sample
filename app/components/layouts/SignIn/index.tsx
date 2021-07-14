import ModalSignIn, { IModalSignInProps } from "@module/SignIn/ModalSignIn";
import CustomButton from "generals/Button";
import React from "react";
import { useState } from "react";
import { GetStartedIcon } from "../../../../public/images";

const SignInForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  console.log("rendered");
  const onGetStartedClick = () => {
      setCurrentStep(2)
    console.log("clicked");
  };

  const modalData: IModalSignInProps[] = [
    {
      id: 1,
      isMobile: false,
      button: (
        <CustomButton
          size="large"
          className="btn-confirm"
          onClick={() => onGetStartedClick()}
        >
          Understood
        </CustomButton>
      ),
      icon: <GetStartedIcon />,
      header: "",
      content: <p>aaa</p>
    },
    {
        id: 2,
        isMobile: false,
        button: (
          <CustomButton
            size="large"
            className="btn-confirm"
            onClick={() => onGetStartedClick()}
          >
            Understood
          </CustomButton>
        ),
        icon: null,
        header: "",
        content: <p>aaa</p>
      },
  ];
  return (
    <div className="sign-in-container">
        {
            modalData.map(item => {
                if(item.id === currentStep){
                    return <ModalSignIn {...item} key={item.id}/>
                }
            })
        }
   
    </div>
  );
};

export default SignInForm;
