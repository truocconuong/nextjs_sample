import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import {
  CloudAWS,
  Download,
  DownloadIcon,
  DownloadMobile,
  FileIcon,
  MakePayment,
  MakePaymentMobile,
  UploadFile,
  UploadSecure,
  UploadSecureMobile,
} from "../../public/images";
import CustomButton from "generals/Button";
import ModalSuccess from "components/StartYourWill/Modal/ModalSuccess";
import { useRouter } from "next/router";
import YourPersonalWill from "components/StartYourWill/YourPersonalWill";

function StartYourWill() {
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [renderPage, setRenderPage] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setRenderPage(true);
    } else router.push("/start-your-will");
  }, []);

  const width = useSelector(
    createSelector(
      (state: any) => state?.sizeBrowser,
      (sizeBrowser) => sizeBrowser?.width
    )
  );

  const makePayment = useSelector(
    createSelector(
      (state: any) => state?.startYourWill,
      (startYourWill) => startYourWill?.makePayment
    )
  );

  const renderIconTitle = () => {
    if (isUpload) {
      return width > 768 ? <UploadSecure /> : <UploadSecureMobile />;
    }
    return width > 768 ? <Download /> : <DownloadMobile />;
  };

  const handleDownloadWill = () => {
    setIsUpload(true);
  };

  const handleMakePayment = () => {
    router.push("/payment-summary");
  };

  return renderPage ? (
    <>
      <div className="start-your-will-container">
        {showModalSuccess && (
          <ModalSuccess
            showModal={showModalSuccess}
            setShowModal={setShowModalSuccess}
            title="Account Created"
            textNote="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun."
          />
        )}
        <Row
          className="keep-going"
          style={{ background: !isUpload ? "#E9FAF4" : "#FFD9D1" }}
        >
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={11}
            xl={11}
            xxl={11}
            className="left-header"
          >
            <div className="text-keep-going">
              {!isUpload ? "Your Will Is Ready" : "Upload & Secure"}
            </div>
            <div className="text-continue mt-8">
              {!isUpload
                ? "Let's sign and upload your Will!"
                : "Your privacy and security is our utmost importance"}
            </div>
            <div className="text mt-16 mb-40">
              <span>
                {!isUpload
                  ? "You've done all the hard work, so take a look at your completed will,"
                  : "Let’s complete your Will. All your information is saved as you go."}
              </span>
              &nbsp;
              <span className="remaining">
                {!isUpload
                  ? "dowload, and print it!"
                  : "Upload your signed will."}
              </span>
            </div>
            {!isUpload && (
              <CustomButton
                type="ghost"
                size="large"
                className="continue-btn"
                onClick={handleDownloadWill}
              >
                Download Will
              </CustomButton>
            )}
            {isUpload && (
              <div>
                <CustomButton
                  type="primary"
                  size="large"
                  className="continue-btn"
                  onClick={() => {
                    router.push("/lodge-will");
                  }}
                >
                  Upload Will Securely
                </CustomButton>
                {width > 768 && (
                  <div className="mt-24">
                    <CloudAWS />
                    <span className="text-cloud ml-8">
                      Cloud Infrastructure by AWS 256-bit system
                    </span>
                  </div>
                )}
              </div>
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
            {renderIconTitle()}
          </Col>
        </Row>

        <div className="body">
          <YourPersonalWill />
          <div className="download ">
            <Row>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={18}
                xl={18}
                xxl={18}
                className="center"
              >
                <span>
                  <DownloadIcon />
                </span>
                <span className="text-title">Preview & Download Your Will</span>
              </Col>
              <Col
                xs={0}
                sm={0}
                md={24}
                lg={6}
                xl={6}
                xxl={6}
                className="item-end"
              >
                {width > 768 && (
                  <Button className="download-btn" onClick={handleDownloadWill}>
                    Download Will
                  </Button>
                )}
              </Col>
            </Row>
            <Row className="optional-text mt-16" style={{ color: "#6670A2" }}>
              By writing a will, you will be able to take care of your loved
              ones when you are gone. Having a will allows you to distribute
              your assets according to your wishes, and also indicate your
              wishes you might have when you are gone.
            </Row>
            <Row className="optional-text mt-24" style={{ color: "#6670A2" }}>
              Last Edited: Tuesday 17 May 2021, 7:04 PM
            </Row>
          </div>

          <div className="download upload" style={{ background: "#fff" }}>
            <Col span={24} className="center">
              <span>
                <UploadFile />
              </span>
              <span className="text-title">Upload Your Signed Will</span>
            </Col>
            <Row className="optional-text mt-16" style={{ color: "#6670A2" }}>
              Once your Will has been signed, your Will is completed and you can
              upload your signed Will into the iWills platform for future
              reference. You should store the original Will in a safe location
              and inform the Executors of their roles and the location of the
              Will.
            </Row>
            <div className="drag-drop-file mt-24">
              <Row className="item-center">
                <FileIcon />
              </Row>
              <Row className="item-center optional-text mt-16">
                Drag and Drop files here
              </Row>
              <Row className="item-center text-file-support mt-8">
                File Supported: PDF only, (Max 3mb)
              </Row>
              <Row className="item-center mt-16">
                <Button className="upload-btn">Upload Will</Button>
              </Row>
            </div>

            {!makePayment && (
              <>
                <div className="make-overlay"></div>
                <div className="make-payment">
                  <Row>
                    <Col
                      xs={24}
                      sm={24}
                      md={18}
                      lg={18}
                      xl={18}
                      xxl={18}
                      className="center"
                    >
                      <Col style={{ paddingRight: 10 }}>
                        {width > 768 ? <MakePayment /> : <MakePaymentMobile />}
                      </Col>
                      <Col>
                        <div className="text-title">
                          Pay to upload Your Signed Will
                        </div>
                        <div className="text-note">
                          A secured interface with your data encrypted and your
                          Will stored safely to protect your privacy.
                        </div>
                      </Col>
                    </Col>
                    <Col
                      xs={24}
                      sm={24}
                      md={6}
                      lg={6}
                      xl={6}
                      xxl={6}
                      className="col-btn-pay"
                    >
                      <Button
                        className="make-payment-btn"
                        onClick={handleMakePayment}
                      >
                        Make Payment
                      </Button>
                    </Col>
                  </Row>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="body-1"></div>
    </>
  ) : (
    <></>
  );
}

export default StartYourWill;
