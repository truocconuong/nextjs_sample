import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import CustomCheckbox from "generals/CustomCheckbox";
import { useRouter } from "next/router";
import {
  IssuesIcon,
  NoteIcon,
  PenIcon,
  SmallInfoIcon,
  SmallInfoMobileIcon,
} from "../../../../public/images";
import ModalSignUpEmail from "../Modal/ModalSignUpEmail";
import ModalOtp from "../Modal/ModalOtp";
import ModalSuccess from "../Modal/ModalSuccess";
import { sendOTP, signUpEmail, verifyOTP } from "@redux/actions/startYourWill";

function YourPersonalWill() {
  const router = useRouter();
  const [showModalSignUpEmail, setShowModalSignUpEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [showModalOtp, setShowModalOtp] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [donePersonalParticulars, setDonePersonalParticulars] = useState(false);
  const [doneExecutor, setDoneExecutor] = useState(false);
  const [doneBenefit, setDoneBenefit] = useState(false);
  const [doneEstateDistribute, setDoneEstateDistribute] = useState(false);
  const [donePersonalEstatesList, setDonePersonalEstatesList] = useState(false);
  const [doneCreateAcc, setDoneCreateAcc] = useState(false);
  // const [otp, setOTP] = useState("");

  const dispatch = useDispatch();

  const width = useSelector(
    createSelector(
      (state: any) => state?.sizeBrowser,
      (sizeBrowser) => sizeBrowser?.width
    )
  );

  const category = useSelector(
    createSelector(
      (state: any) => state?.category,
      (category) => category
    )
  );

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setDoneCreateAcc(true);
    }
  }, []);

  const name = useSelector(
    createSelector(
      (state: any) => state?.startYourWill,
      (startYourWill) => startYourWill?.name
    )
  );

  useEffect(() => {
    setEmail(category?.email || "");
    if (
      category?.email &&
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
    if (
      category?.properties.length >= 1 &&
      category?.bank_accounts.length >= 1 &&
      category?.insurance_policies.length >= 1 &&
      category?.investments.length >= 1 &&
      category?.business_interests.length >= 1 &&
      category?.valuables.length >= 1
    ) {
      setDonePersonalEstatesList(true);
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

  const onSignUpEmail = () => {
    dispatch(
      signUpEmail(category, (response) => {
        if (response.success) {
          setShowModalSignUpEmail(false);
          dispatch(
            sendOTP({ email }, (responseOTP) => {
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
          verifyOTP({ email, otp }, (response) => {
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

  const onEditPersonalParticular = () => {
    router.push("/personal-information");
  };

  const onEditExecutorDetail = () => {
    router.push("/personal-executor");
  };

  const onEditBeneficiaryDetail = () => {
    router.push("/personal-beneficiary");
  };

  const handleMovePersonalDetail = () => {
    router.push("/personal-estates-listing/property");
  };

  const onEditDistribution = () => {
    router.push("/allocation");
  };

  return (
    <div>
      {showModalSuccess && (
        <ModalSuccess
          showModal={showModalSuccess}
          setShowModal={setShowModalSuccess}
          title="Account Created"
          textNote="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun."
          handleReturn={handleReturnDashboard}
        />
      )}
      {showModalSignUpEmail && (
        <ModalSignUpEmail
          showModal={showModalSignUpEmail}
          setShowModal={setShowModalSignUpEmail}
          name={name}
          onSignUpEmail={onSignUpEmail}
          email={email}
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
      {(!donePersonalParticulars ||
        !doneExecutor ||
        !doneBenefit ||
        !doneEstateDistribute ||
        !doneCreateAcc) && (
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
          {!donePersonalParticulars && (
            <>
              <Row>
                <Col span={18} className="center text-fix-now">
                  Personal Particulars
                </Col>
                <Col span={6} className="item-end">
                  {width > 600 && (
                    <Button
                      className="button-fix"
                      onClick={onEditPersonalParticular}
                    >
                      Fix Now
                    </Button>
                  )}
                </Col>
              </Row>
            </>
          )}
          {!doneExecutor && (
            <>
              <hr />
              <Row>
                <Col span={18} className="center text-fix-now">
                  Executor Details
                </Col>
                <Col span={6} className="item-end">
                  {width > 600 && (
                    <Button
                      className="button-fix"
                      onClick={onEditExecutorDetail}
                    >
                      Fix Now
                    </Button>
                  )}
                </Col>
              </Row>
            </>
          )}
          {!doneBenefit && (
            <>
              <hr />
              <Row>
                <Col span={18} className="center text-fix-now">
                  Beneficiary Details
                </Col>
                <Col span={6} className="item-end">
                  {width > 600 && (
                    <Button
                      className="button-fix"
                      onClick={onEditBeneficiaryDetail}
                    >
                      Fix Now
                    </Button>
                  )}
                </Col>
              </Row>
            </>
          )}
          {!doneEstateDistribute && (
            <>
              <hr />
              <Row>
                <Col span={18} className="center text-fix-now">
                  Estate Distribution
                </Col>
                <Col span={6} className="item-end">
                  {width > 600 && (
                    <Button className="button-fix" onClick={onEditDistribution}>
                      Fix Now
                    </Button>
                  )}
                </Col>
              </Row>
            </>
          )}
          {/* {!donePersonalEstatesList && (
            <>
              <Row>
                <Col span={18} className="center text-fix-now">
                  Personal Estates Listing
                </Col>
                <Col span={6} className="item-end">
                  {width > 600 && (
                    <Button
                      className="button-fix"
                      onClick={handleMovePersonalDetail}
                    >
                      Fix Now
                    </Button>
                  )}
                </Col>
              </Row>
              <hr />
            </>
          )} */}
          {donePersonalParticulars &&
            doneExecutor &&
            doneBenefit &&
            doneEstateDistribute &&
            !doneCreateAcc && (
              <>
                <hr />
                <Row>
                  <Col span={18} className="center ">
                    <span
                      className="text-fix-now"
                      onClick={() =>
                        width > 600 ? {} : setShowModalSignUpEmail(true)
                      }
                    >
                      Create Your Account
                    </span>
                  </Col>
                  <Col span={6} className="item-end">
                    {width > 600 && (
                      <Button
                        className="button-fix"
                        onClick={() => setShowModalSignUpEmail(true)}
                      >
                        Fix Now
                      </Button>
                    )}
                  </Col>
                </Row>
              </>
            )}
        </div>
      )}

      <div className="your-personal-will">
        <Row className="center">
          <NoteIcon />
          <span className="text-title">Your Personal Will</span>
        </Row>
        <Row className="text-note ">
          By writing a will, you will be able to take care of your loved ones
          when you are gone. Having a will allows you to distribute your assets
          according to your wishes, and also indicate your wishes you might have
          when you are gone.
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
                checked={donePersonalParticulars}
                onChange={() => {}}
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
              <Button className="edit-btn" onClick={onEditPersonalParticular}>
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
                checked={doneExecutor}
                onChange={() => {}}
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
              <Button className="edit-btn" onClick={onEditExecutorDetail}>
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
                checked={doneBenefit}
                onChange={() => {}}
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
              <Button className="edit-btn" onClick={onEditBeneficiaryDetail}>
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
                checked={doneEstateDistribute}
                onChange={() => {}}
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
              <Button className="edit-btn" onClick={onEditDistribution}>
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
                checked={donePersonalEstatesList}
                onChange={() => {}}
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
              <Button className="edit-btn" onClick={handleMovePersonalDetail}>
                <PenIcon /> <span className="ml-8">Edit</span>
              </Button>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default YourPersonalWill;
