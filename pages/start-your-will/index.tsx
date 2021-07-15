import React, { useState } from "react";
import { Button, Col, Row } from "antd";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import {
  HandIcon,
  IssuesIcon,
  KeepGoing,
  KeepGoingMobile,
  NoteIcon,
  PenIcon,
  SmallInfoIcon,
  SmallInfoMobileIcon,
} from "../../public/images";
import CustomButton from "generals/Button";
import CustomCheckbox from "generals/CustomCheckbox";
import ModalBeforeStart from "components/StartYourWill/Modal/ModalBeforeStart";
import ModalContinueYourWill from "components/StartYourWill/Modal/ModalContinueYourWill";
import ModalSignUpEmail from "components/StartYourWill/Modal/ModalSignUpEmail";
import ModalOtp from "components/StartYourWill/Modal/ModalOtp";
import ModalSuccess from "components/StartYourWill/Modal/ModalSuccess";
import { useRouter } from "next/router";

function StartYourWill() {
  const [personalParticular, setPersonalParticular] = useState(true);
  const [executor, setExecutor] = useState(true);
  const [beneficiary, setBeneficiary] = useState(true);
  const [estateDis, setEstateDis] = useState(false);
  const [personalEstate, setPersonalEstate] = useState(true);
  const [start, setStart] = useState(true);
  const [asContinue, SetAsContinue] = useState(false);
  const [showModalSignUpEmail, setShowModalSignUpEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [showModalOtp, setShowModalOtp] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const router = useRouter();
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

  const onSignUpEmail = (email) => {
    setEmail(email);
    setShowModalSignUpEmail(false);
    setShowModalOtp(true);
  };

  const changeOtp = (otp) => {
    if (otp.length === 4) {
      setTimeout(() => {
        setShowModalOtp(false);
        setShowModalSuccess(true);
      }, 1000);
    }
  };

  const handleReturnDashboard = () => {
    router.push("/start-your-will-upload");
  };

  return (
    <div className="start-your-will-container">
      {/* <ModalBeforeStart showModal={showModal} setShowModal={setShowModal} /> */}
      {/* <ModalContinueYourWill
        showModal={showModalA}
        setShowModal={setShowModalA}
      /> */}
      {showModalSignUpEmail && (
        <ModalSignUpEmail
          showModal={showModalSignUpEmail}
          setShowModal={setShowModalSignUpEmail}
          name={name}
          onSignUpEmail={onSignUpEmail}
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
          <span
            className="text right"
            style={{ cursor: "pointer" }}
            onClick={() => setShowModalSignUpEmail(true)}
          >
            Create Account
          </span>
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
        {!start && (
          <div className="fix-issues">
            <Row className="center">
              <IssuesIcon />
              <span className="text-title">Fix these issues</span>
            </Row>
            <Row className="text-note ">
              You won’t be able to upload your will until you complete these
              information
            </Row>
            <hr />
            <Row>
              <Col span={18} className="center text-fix-now">
                Estate Distribution
              </Col>
              <Col span={6} className="item-end">
                {width > 500 && <Button className="button-fix">Fix Now</Button>}
              </Col>
            </Row>
            <hr />
            <Row>
              <Col span={18} className="center text-fix-now">
                Create Your Account
              </Col>
              <Col span={6} className="item-end">
                {width > 500 && (
                  <Button
                    className="button-fix"
                    onClick={() => setShowModalSignUpEmail(true)}
                  >
                    Fix Now
                  </Button>
                )}
              </Col>
            </Row>
          </div>
        )}

        <div className="your-personal-will">
          <Row className="center">
            <NoteIcon />
            <span className="text-title">Your Personal Will</span>
          </Row>
          <Row className="text-note ">
            By writing a will, you will be able to take care of your loved ones
            when you are gone. Having a will allows you to distribute your
            assets according to your wishes, and also indicate your wishes you
            might have when you are gone.
          </Row>
          <hr />
          <Row>
            <Col
              xs={24}
              sm={18}
              md={18}
              lg={18}
              xl={18}
              xxl={18}
              className="center"
            >
              <Col>
                <CustomCheckbox
                  disable
                  checked={personalParticular}
                  onChange={setPersonalParticular}
                />
              </Col>
              <Col className="ml-16">
                <div className="text-fix-now center">
                  Personal Particulars &nbsp;
                  {width > 768 ? <SmallInfoIcon /> : <SmallInfoMobileIcon />}
                </div>
                <div className="text-note-per">
                  Estimation of 3-5 minutes to complete
                </div>
              </Col>
            </Col>
            <Col
              xs={0}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              xxl={6}
              className="item-end center"
            >
              {width > 600 && (
                <Button className="edit-btn">
                  <PenIcon /> <span className="ml-8">Edit</span>
                </Button>
              )}
            </Col>
          </Row>

          <hr />
          <Row>
            <Col
              xs={24}
              sm={18}
              md={18}
              lg={18}
              xl={18}
              xxl={18}
              className="center"
            >
              <Col>
                <CustomCheckbox
                  disable
                  checked={executor}
                  onChange={setExecutor}
                />
              </Col>
              <Col className="ml-16">
                <div className="text-fix-now center">
                  Executor Details &nbsp;
                  {width > 768 ? <SmallInfoIcon /> : <SmallInfoMobileIcon />}
                </div>
                <div className="text-note-per">
                  Estimation of 3-5 minutes to complete
                </div>
              </Col>
            </Col>
            <Col
              xs={0}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              xxl={6}
              className="item-end center"
            >
              {width > 600 && (
                <Button className="edit-btn">
                  <PenIcon /> <span className="ml-8">Edit</span>
                </Button>
              )}
            </Col>
          </Row>

          <hr />
          <Row>
            <Col
              xs={24}
              sm={18}
              md={18}
              lg={18}
              xl={18}
              xxl={18}
              className="center"
            >
              <Col>
                <CustomCheckbox
                  disable
                  checked={beneficiary}
                  onChange={setBeneficiary}
                />
              </Col>
              <Col className="ml-16">
                <div className="text-fix-now center">
                  Beneficiary Details &nbsp;
                  {width > 768 ? <SmallInfoIcon /> : <SmallInfoMobileIcon />}
                </div>
                <div className="text-note-per">
                  Estimation of 3-5 minutes to complete
                </div>
              </Col>
            </Col>
            <Col
              xs={0}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              xxl={6}
              className="item-end center"
            >
              {width > 600 && (
                <Button className="edit-btn">
                  <PenIcon /> <span className="ml-8">Edit</span>
                </Button>
              )}
            </Col>
          </Row>

          <hr />
          <Row>
            <Col
              xs={24}
              sm={18}
              md={18}
              lg={18}
              xl={18}
              xxl={18}
              className="center"
            >
              <Col>
                <CustomCheckbox
                  disable
                  checked={estateDis}
                  onChange={setEstateDis}
                />
              </Col>
              <Col className="ml-16">
                <div className="text-fix-now center">
                  Estate Distribution &nbsp;
                  {width > 768 ? <SmallInfoIcon /> : <SmallInfoMobileIcon />}
                </div>
                <div className="text-note-per">
                  Estimation of 3-5 minutes to complete
                </div>
              </Col>
            </Col>
            <Col
              xs={0}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              xxl={6}
              className="item-end center"
            >
              {width > 600 && (
                <Button className="edit-btn">
                  <PenIcon /> <span className="ml-8">Edit</span>
                </Button>
              )}
            </Col>
          </Row>
          <Row className="option center">
            <span className="optional-text ml-16">
              <span>Optional</span> — You can still complete your Will without
              filling out this section out 😉
            </span>
          </Row>

          <Row>
            <Col
              xs={24}
              sm={18}
              md={18}
              lg={18}
              xl={18}
              xxl={18}
              className="center"
            >
              <Col>
                <CustomCheckbox
                  disable
                  checked={personalEstate}
                  onChange={setPersonalEstate}
                />
              </Col>
              <Col className="ml-16">
                <div className="text-fix-now center">
                  Personal Estates Listing &nbsp;
                  {width > 768 ? <SmallInfoIcon /> : <SmallInfoMobileIcon />}
                </div>
                <div className="text-note-per">
                  Estimation of 3-5 minutes to complete
                </div>
              </Col>
            </Col>
            <Col
              xs={0}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              xxl={6}
              className="item-end center"
            >
              {width > 600 && (
                <Button className="edit-btn">
                  <PenIcon /> <span className="ml-8">Edit</span>
                </Button>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default StartYourWill;
