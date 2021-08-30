import React, { useEffect, useState } from "react";
import { Button, Col, Row, Spin, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import {
  CloudAWS,
  Download,
  DownloadIcon,
  DownloadMobile,
  FileIcon,
  MakePayment,
  MakePaymentMobile,
  RemoveIcon,
  UploadDone,
  UploadFile,
  Uploading,
  UploadSecure,
  UploadSecureMobile,
} from "../../public/images";
import CustomButton from "generals/Button";
import ModalSuccess from "components/StartYourWill/Modal/ModalSuccess";
import { useRouter } from "next/router";
import YourPersonalWill from "components/StartYourWill/YourPersonalWill";
import {
  removeFileUpload,
  setDownloaded,
  uploadFile,
} from "@redux/actions/startYourWill";
import AuthHoc from "../AuthHoc";
import moment from "moment";
import { getCategoriesData } from "@redux/actions/category";

const { Dragger } = Upload;

function StartYourWill() {
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [renderPage, setRenderPage] = useState(false);
  const [pdfName, setPdfName] = useState("");
  const [uploading, setUploading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
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

  const starYourWillData = useSelector(
    createSelector(
      (state: any) => state?.startYourWill,
      (startYourWill) => startYourWill
    )
  );

  const category = useSelector(
    createSelector(
      (state: any) => state?.category,
      (category) => category
    )
  );

  useEffect(() => {
    setUploading(false);
    if (category) {
      setPdfName(category?.pdf_upload_url || "");
    }
  }, [category]);

  const renderIconTitle = () => {
    if (starYourWillData?.uploaded) {
      return width > 768 ? <UploadSecure /> : <UploadSecureMobile />;
    }
    return width > 768 ? <Download /> : <DownloadMobile />;
  };

  const handlePreView = () => {
    router.push("/preview-pdf");
    dispatch(setDownloaded(true));
  };

  const handleDownloadWill = () => {
    dispatch(setDownloaded(true));
  };

  const handleMakePayment = () => {
    router.push("/payment-summary");
  };

  const getCategories = () => {
    const token = localStorage.getItem("accessToken");
    dispatch(getCategoriesData(token));
  };

  const props = {
    accept: ".pdf",
    name: "file",
    transformFile(file) {
      if (file) {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        dispatch(
          uploadFile(formData, (response) => {
            if (response.success) {
              getCategories();
            } else setUploading(false);
          })
        );
      }
    },
    fileList: [],
    multiple: false,
  };

  const handleRemoveFile = () => {
    dispatch(
      removeFileUpload((response) => {
        if (response.success) {
          getCategories();
        }
      })
    );
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
          style={{
            background: !starYourWillData?.uploaded ? "#E9FAF4" : "#FFD9D1",
          }}
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
              {!starYourWillData?.uploaded
                ? "Your Will Is Ready"
                : "Upload & Secure"}
            </div>
            <div className="text-continue mt-8">
              {!starYourWillData?.uploaded
                ? "Let's sign and upload your Will!"
                : "Your privacy and security is our utmost importance"}
            </div>
            <div className="text mt-16 mb-40">
              <span>
                {!starYourWillData?.uploaded
                  ? "You've done all the hard work, so take a look at your completed will,"
                  : "Let’s complete your Will. All your information is saved as you go."}
              </span>
              &nbsp;
              <span className="remaining">
                {!starYourWillData?.uploaded
                  ? "dowload, and print it!"
                  : "Upload your signed will."}
              </span>
            </div>
            {!starYourWillData?.uploaded && (
              <a
                href={`${process.env.NEXT_PUBLIC_API_URL}${category?.will_pdf_link}`}
              >
                <CustomButton
                  type="ghost"
                  size="large"
                  className="continue-btn"
                  onClick={handleDownloadWill}
                >
                  Download Will
                </CustomButton>
              </a>
            )}
            {starYourWillData?.uploaded && (
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
                  <Button className="download-btn" onClick={handlePreView}>
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
            <Row
              className="optional-text mt-24"
              style={{ color: "#6670A2", fontSize: 16 }}
            >
              Last Edited:&nbsp;
              {moment(new Date(category.created_at)).format("LLLL")}
            </Row>
          </div>

          {starYourWillData?.downloaded && (
            <div className="download upload" style={{ background: "#fff" }}>
              <Col span={24} className="center">
                <span>
                  <UploadFile />
                </span>
                <span className="text-title">Upload Your Signed Will</span>
              </Col>
              <Row className="optional-text mt-16" style={{ color: "#6670A2" }}>
                Once your Will has been signed, your Will is completed and you
                can upload your signed Will into the iWills platform for future
                reference. You should store the original Will in a safe location
                and inform the Executors of their roles and the location of the
                Will.
              </Row>
              {!pdfName
                ? !uploading && (
                    <Dragger {...(props as any)}>
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
                    </Dragger>
                  )
                : !uploading && (
                    <div className="upload-done">
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
                          <Col>
                            <UploadDone />
                          </Col>
                          <Col style={{ paddingLeft: 16 }}>
                            <div className="text-pdf">
                              {category?.pdf_upload_url?.replace(
                                "/upload-pdf/",
                                ""
                              )}
                            </div>
                            <div className="text-upload-day">
                              Uploaded:&nbsp;
                              {moment(
                                new Date(category.time_upload_pdf)
                              ).format("LLLL")}
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
                          className="remove-col"
                        >
                          <Button
                            className="remove-btn"
                            onClick={handleRemoveFile}
                          >
                            <RemoveIcon />
                            <span className="ml-8">Remove</span>
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  )}
              <Spin spinning={uploading}>
                {uploading && (
                  <div className="upload-done">
                    <Row>
                      <Col className="center">
                        <Col>
                          <Uploading />
                        </Col>
                        <Col style={{ paddingLeft: 16 }}>
                          <div className="text-pdf">Uploading...</div>
                          <div
                            className="text-upload-day"
                            style={{ color: " #A0A5BE" }}
                          >
                            Storing your will document into our secure cloud
                          </div>
                        </Col>
                      </Col>
                    </Row>
                  </div>
                )}
              </Spin>
              {!starYourWillData?.makePayment && (
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
                          {width > 768 ? (
                            <MakePayment />
                          ) : (
                            <MakePaymentMobile />
                          )}
                        </Col>
                        <Col>
                          <div className="text-title">
                            Pay to upload Your Signed Will
                          </div>
                          <div className="text-note">
                            A secured interface with your data encrypted and
                            your Will stored safely to protect your privacy.
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
          )}
        </div>
      </div>
      <div className="body-1"></div>
    </>
  ) : (
    <Row
      justify="center"
      align="middle"
      style={{ height: "50%", width: "100%" }}
    >
      <Spin size="large" />
    </Row>
  );
}

export default AuthHoc(StartYourWill);
