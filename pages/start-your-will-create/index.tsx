import React, { useEffect, useState } from "react";
import { Col, Row, Spin } from "antd";
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
import { checkDoneAllOption } from "@util/index";

function StartYourWill() {
  const [showModalSignUpEmail, setShowModalSignUpEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [showModalOtp, setShowModalOtp] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [donePersonalParticulars, setDonePersonalParticulars] = useState(false);
  const [doneExecutor, setDoneExecutor] = useState(false);
  const [doneBenefit, setDoneBenefit] = useState(false);
  const [doneEstateDistribute, setDoneEstateDistribute] = useState(false);
  const [doneCreateAcc, setDoneCreateAcc] = useState(false);
  const [renderPage, setRenderPage] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (checkDoneAllOption(category)) {
      router.push("/start-your-will");
      return;
    }
    if (!starYourWillData?.name && !token) {
      router.push("/");
      return;
    }
    setRenderPage(true);
  }, []);

  const width = useSelector(
    createSelector(
      (state: any) => state?.sizeBrowser,
      (sizeBrowser) => sizeBrowser?.width
    )
  );

  const starYourWillData = useSelector(
    createSelector(
      (state: any) => state?.startYourWill,
      (startYourWill) => startYourWill
    )
  );

  useEffect(() => {
    if (starYourWillData?.doneCreateAcc) {
      setDoneCreateAcc(true);
    }
  }, [starYourWillData?.doneCreateAcc]);

  const category = useSelector(
    createSelector(
      (state: any) => state?.category,
      (category) => category
    )
  );

  useEffect(() => {
    setEmail(category?.email_personal || "");
    const token = localStorage.getItem("accessToken");
    if (token) {
      setDoneCreateAcc(true);
    }
    if (
      category?.email_personal &&
      category?.full_legal_name &&
      category?.nric &&
      category?.postal_code &&
      category?.address_line_1 &&
      category?.address_line_2 &&
      category?.unit_number
    ) {
      setDonePersonalParticulars(true);
    }
    if (category?.executors.length >= 1) {
      setDoneExecutor(true);
    }
    if (category?.beneficiaries.length >= 1) {
      setDoneBenefit(true);
    }

    if (category?.beneficiaries?.length >= 2) {
      let percent = 0;
      category?.beneficiaries?.map((item) => {
        if (item.percent !== 100) {
          percent += item.percent;
        }
      });
      if (percent === 100) setDoneEstateDistribute(true);
    }
  }, [category]);

  const checkDisplayCreate = () => {
    return (
      donePersonalParticulars &&
      doneExecutor &&
      doneBenefit &&
      doneEstateDistribute
    );
  };

  const handleDraftYourWill = () => {
    if (!donePersonalParticulars) {
      router.push("/personal-information");
      return;
    }
    if (!doneExecutor) {
      router.push("/personal-executor");
      return;
    }
    if (!doneBenefit) {
      router.push("/personal-beneficiary");
      return;
    }
    if (!doneEstateDistribute) {
      router.push("/allocation");
      return;
    }
    return null;
  };

  const countOptionNotDone = () => {
    let num = 0;
    if (!donePersonalParticulars) {
      num += 1;
    }
    if (!doneExecutor) {
      num += 1;
    }
    if (!doneBenefit) {
      num += 1;
    }
    if (!doneEstateDistribute) {
      num += 1;
    }
    return num;
  };

  const checkStart = () => {
    return (
      !donePersonalParticulars &&
      !doneExecutor &&
      !doneBenefit &&
      !doneEstateDistribute
    );
  };

  const renderTitle = () => {
    if (checkDisplayCreate()) {
      return "You???re Almost There!";
    }
    if (checkStart()) {
      return `Hello, ${starYourWillData?.name || category?.full_legal_name}`;
    }
    return "Let???s Keep Going!";
  };

  const renderTextContinue = () => {
    if (checkDisplayCreate()) {
      return `Let's create your account!`;
    }
    if (checkStart()) {
      return "Start drafting your Will!";
    }
    return "Continue drafting your Will!";
  };

  const onSignUpEmail = (emailRes) => {
    dispatch(
      sendOTP({ email: emailRes }, (responseOTP) => {
        if (responseOTP.success) {
          setShowModalSignUpEmail(false);
          setEmail(emailRes);
          setShowModalOtp(true);
        }
      })
    );
  };

  const changeOtp = (otp) => {
    if (otp.length === 4) {
      setTimeout(() => {
        let param = {};
        if (
          donePersonalParticulars ||
          doneExecutor ||
          doneBenefit ||
          doneEstateDistribute
        ) {
          param = {
            ...category,
            email: email,
            otp,
            full_legal_name: starYourWillData?.name,
          };
        } else
          param = {
            email: email,
            otp,
            full_legal_name: starYourWillData?.name,
          };
        dispatch(
          signUpEmail(param, (response) => {
            if (response.success) {
              const token = response?.data?.access_token;
              localStorage.setItem("accessToken", token);
              setShowModalOtp(false);
              setDoneCreateAcc(true);
              setShowModalSuccess(true);
            }
          })
        );
      }, 1000);
    }
  };

  const handleReturnDashboard = () => {
    if (
      donePersonalParticulars &&
      doneExecutor &&
      doneBenefit &&
      doneEstateDistribute
    ) {
      router.push("/start-your-will");
    }
    setShowModalSuccess(false);
  };

  const handleChangeEmail = () => {
    setShowModalOtp(false);
    setShowModalSignUpEmail(true);
  };

  return renderPage ? (
    <div className="start-your-will-container">
      {showModalSignUpEmail && (
        <ModalSignUpEmail
          showModal={showModalSignUpEmail}
          setShowModal={setShowModalSignUpEmail}
          name={starYourWillData?.name}
          onSignUpEmail={onSignUpEmail}
          emailProps={email}
        />
      )}
      {showModalOtp && (
        <ModalOtp
          showModal={showModalOtp}
          setShowModal={setShowModalOtp}
          email={email}
          changeOtp={changeOtp}
          onChangeEmail={handleChangeEmail}
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
      {!doneCreateAcc && (
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
              {width > 768 ? <HandIcon /> : "???"}
              <span className="text ml-8">
                Don???t lose your information{" "}
                {width > 768 && ", let???s create your iWills account"}
              </span>
            </span>
          </Col>
          <Col xs={9} sm={9} md={6} lg={6} xl={6} xxl={6}>
            <span
              className="text right"
              style={{ cursor: "pointer" }}
              onClick={() => setShowModalSignUpEmail(true)}
            >
              Create Account
            </span>
          </Col>
        </Row>
      )}

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
            {(donePersonalParticulars ||
              doneExecutor ||
              doneBenefit ||
              doneEstateDistribute) &&
              !checkDisplayCreate() && (
                <span className="remaining">
                  {countOptionNotDone()}&nbsp;sections remaining
                </span>
              )}
          </div>
          {checkDisplayCreate() ? (
            <CustomButton
              type="ghost"
              size="large"
              className="continue-btn"
              onClick={() => setShowModalSignUpEmail(true)}
            >
              Create Your Account
            </CustomButton>
          ) : (
            <CustomButton
              type="ghost"
              size="large"
              className="continue-btn"
              onClick={handleDraftYourWill}
            >
              {checkStart() ? "Get Started" : "Continue Drafting Your Will"}
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
  ) : (
    <Row
      justify="center"
      align="middle"
      style={{ height: "80vh", width: "100%" }}
    >
      <Spin size="large" />
    </Row>
  );
}

export default AuthHoc(StartYourWill);
