import React, { useState } from "react";
import { Button, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useRouter } from "next/router";

import { HandIcon, KeepGoing, KeepGoingMobile } from "../../public/images";
import CustomButton from "generals/Button";
import ModalSignUpEmail from "components/StartYourWill/Modal/ModalSignUpEmail";
import ModalOtp from "components/StartYourWill/Modal/ModalOtp";
import ModalSuccess from "components/StartYourWill/Modal/ModalSuccess";
import YourPersonalWill from "components/StartYourWill/YourPersonalWill";
import AuthHoc from "../AuthHoc";
import { sendOTP, signUpEmail, verifyOTP } from "@redux/actions/startYourWill";

function StartYourWill() {
  const [start, setStart] = useState(true);
  const [asContinue, SetAsContinue] = useState(false);
  const [showModalSignUpEmail, setShowModalSignUpEmail] = useState(false);
  // const [email, setEmail] = useState("");
  const [showModalOtp, setShowModalOtp] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const width = useSelector(
    createSelector(
      (state: any) => state?.sizeBrowser,
      (sizeBrowser) => sizeBrowser?.width
    )
  );

  const name = useSelector(
    createSelector(
      (state: any) => state?.startYourWill,
      (startYourWill) => startYourWill?.name
    )
  );

  const category = useSelector(
    createSelector(
      (state: any) => state?.category,
      (category) => category
    )
  );

  const checkDisplayCreate = (category) => {
    const token = localStorage.getItem("accessToken");
    let donePersonalParticulars = false;
    let doneExecutor = false;
    let doneBenefit = false;
    let doneEstateDistribute = false;
    if (
      category?.email &&
      category?.full_legal_name &&
      category?.nric &&
      category?.postal_code &&
      category?.address_line_1 &&
      category?.address_line_2 &&
      category?.unit_number
    ) {
      donePersonalParticulars = true;
    }
    if (category?.executors.length >= 1) {
      doneExecutor = true;
    }
    if (category?.beneficiaries.length >= 1) {
      doneBenefit = true;
    }

    if (category?.beneficiaries?.length >= 2) {
      let percent = 0;
      category?.beneficiaries?.map((item) => {
        if (item.percent !== 100) {
          percent += item.percent;
        }
      });
      if (percent === 100) doneEstateDistribute = true;
    }
    return (
      !token &&
      donePersonalParticulars &&
      doneExecutor &&
      doneBenefit &&
      doneEstateDistribute
    );
  };

  const handleStart = () => {
    setStart(false);
    SetAsContinue(true);
  };

  const renderTitle = () => {
    if (start) {
      return `Hello, ${name}`;
    }
    if (asContinue) return "Let’s Keep Going!";
  };

  const renderTextContinue = () => {
    if (start) {
      return "Start drafting your Will!";
    }
    if (asContinue) return "Continue drafting your Will!";
  };

  const onSignUpEmail = () => {
    dispatch(
      signUpEmail(category, (response) => {
        if (response.success) {
          setShowModalSignUpEmail(false);
          dispatch(
            sendOTP({ email: category?.email }, (responseOTP) => {
              if (responseOTP.success) {
                setShowModalOtp(true);
              }
            })
          );
        }
      })
    );
  };

  const changeOtp = (otp) => {
    if (otp.length === 4) {
      setTimeout(() => {
        dispatch(
          verifyOTP({ email: category?.email, otp }, (response) => {
            if (response.success) {
              const token = response?.data?.access_token;
              localStorage.setItem("accessToken", token);
              setShowModalOtp(false);
              setShowModalSuccess(true);
            }
          })
        );
      }, 1000);
    }
  };

  const handleReturnDashboard = () => {
    router.push("/start-your-will-upload");
  };

  return (
    <div className="start-your-will-container">
      {showModalSignUpEmail && (
        <ModalSignUpEmail
          showModal={showModalSignUpEmail}
          setShowModal={setShowModalSignUpEmail}
          name={name}
          onSignUpEmail={onSignUpEmail}
          email={category?.email || ""}
        />
      )}
      {showModalOtp && (
        <ModalOtp
          showModal={showModalOtp}
          setShowModal={setShowModalOtp}
          email={category?.email || ""}
          changeOtp={changeOtp}
        />
      )}
      {showModalSuccess && (
        <ModalSuccess
          showModal={showModalSuccess}
          setShowModal={setShowModalSuccess}
          title="Account Created"
          textNote="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun."
          handleReturn={handleReturnDashboard}
        />
      )}
      <Row className="create-acc">
        <Col
          xs={15}
          sm={15}
          md={18}
          lg={18}
          xl={18}
          xxl={18}
          className="center"
        >
          <span>
            {width > 768 ? <HandIcon /> : "✋"}
            <span className="text ml-8">
              Don’t lose your information{" "}
              {width > 768 && ", let’s create your iWills account"}
            </span>
          </span>
        </Col>
        <Col xs={9} sm={9} md={6} lg={6} xl={6} xxl={6}>
          {checkDisplayCreate(category) && (
            <span
              className="text right"
              style={{ cursor: "pointer" }}
              onClick={() => setShowModalSignUpEmail(true)}
            >
              Create Account
            </span>
          )}
        </Col>
      </Row>

      <Row className="keep-going">
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={11}
          xl={11}
          xxl={11}
          className="left-header"
        >
          <div className="text-keep-going">{renderTitle()}</div>
          <div className="text-continue mt-8">{renderTextContinue()}</div>
          <div className="text mt-16 mb-40">
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </span>
            &nbsp;
            {!start && <span className="remaining">1 sections remaining</span>}
          </div>
          {start && (
            <CustomButton
              type="ghost"
              size="large"
              className="continue-btn"
              onClick={handleStart}
            >
              Get Started
            </CustomButton>
          )}
          {asContinue && (
            <CustomButton
              type="ghost"
              size="large"
              className="continue-btn"
              onClick={() => setShowModalSignUpEmail(true)}
            >
              Continue Drafting Your Will
            </CustomButton>
          )}
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={13}
          xl={13}
          xxl={13}
          className="right-header"
        >
          {width > 768 ? <KeepGoing /> : <KeepGoingMobile />}
        </Col>
      </Row>

      <div className="body">
        <YourPersonalWill />
      </div>
    </div>
  );
}

export default AuthHoc(StartYourWill);
