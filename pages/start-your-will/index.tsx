import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Input, Progress, Row, Spin, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import {
  CloseIconUpload,
  CloudAWS,
  Download,
  DownloadIcon,
  DownloadMobile,
  FileIcon,
  LodgeForm,
  LodgeKey,
  LodgeKeyMini,
  MakePayment,
  MakePaymentMobile,
  RemoveIcon,
  SmallInfoIcon,
  SmallInfoMobileIcon,
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
  generatePDF,
  removeFileUpload,
  setDownloaded,
  setUploaded,
  uploadFile,
} from "@redux/actions/startYourWill";
import AuthHoc from "../AuthHoc";
import moment from "moment";
import { getCategoriesData } from "@redux/actions/category";
import CustomCheckbox from "@generals/CustomCheckbox";
import _ from "lodash";
import { checkDoneAllOption } from "@util/index";
import InputField from "@generals/InputField";
import { UserActions } from "@redux/actions";
// import Link from "next/link";

const { Dragger } = Upload;

function StartYourWill() {
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [renderPage, setRenderPage] = useState(false);
  const [pdfName, setPdfName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [lodgeWillCheckbox, setLodgeWillCheckbox] = useState(false);
  const [percent, setPercent] = useState(0);
  const [fileUpload, setFileUpload] = useState(new FormData());

  const downloadRef = useRef(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoadingConfirmWill, setIsLoadingConfirmWill] = useState<boolean>(
    false
  );
  const [isErrorVerify, setIsErrorVerify] = useState<boolean>(false);
  const [isVerifySuccessfully, setIsVerifySuccessfully] = useState<boolean>(
    false
  );
  const [errorConfirmString, setErrorConfirmString] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const category = useSelector(
    createSelector(
      (state: any) => state?.category,
      (category) => category
    )
  );

  useEffect(() => {
    if (checkDoneAllOption(category)) {
      setRenderPage(true);
    } else router.push("/start-your-will-create");
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
    if (percent === 33) {
      setTimeout(() => {
        setPercent(percent + 33);
      }, 200);
    }
    if (percent === 66) {
      setTimeout(() => {
        setPercent(percent + 34);
      }, 100);
    }
    if (percent === 100) {
      dispatch(
        uploadFile(fileUpload, (response) => {
          if (response.success) {
            getCategories();
            dispatch(setUploaded(true));
            setPdfName("file_upload");
          }
          setPercent(0);
          setUploading(false);
        })
      );
    }
  }, [percent]);

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

  // const handleDownloadWill = () => {
  //   dispatch(setDownloaded(true));
  // };

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
        setTimeout(() => {
          setPercent(percent + 33);
        }, 400);
        setFileUpload(formData);
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
          setPercent(0);
        }
      })
    );
  };

  const downloadWillSecurely = () => {
    downloadRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const renderPercentUpload = () => {
    if (percent === 0) return "";
    if (percent === 33) return "1/3";
    if (percent === 66) return "2/3";
    if (percent === 100) return "3/3";
  };

  const handleCloseUpload = () => {
    setUploading(false);
    setPercent(0);
    setFileUpload(new FormData());
    if (!pdfName) {
      setPdfName("");
    }
  };
  const handleConfirmWill = () => {
    setIsLoadingConfirmWill(true);
    const token = localStorage.getItem("accessToken") || "";
    if (!token) {
      return;
    }
    dispatch(
      UserActions.updateLodgeWill(
        { will_registry: inputValue },
        token,
        (res) => {
          if (res !== true) {
            setErrorConfirmString(res);
            updateMessage(false);
          } else {
            updateMessage(true);
          }
          setIsLoadingConfirmWill(false);
        }
      )
    );
  };

  const updateMessage = (isSuccess: boolean) => {
    setIsErrorVerify(!isSuccess);
    setIsVerifySuccessfully(isSuccess);
  };

  return renderPage ? (
    <>
      <div className="start-your-will-container lodge-will-banner">
        <div className="meter animate">
          <span style={{ width: "50%" }}></span>
        </div>
        {showModalSuccess && (
          <ModalSuccess
            showModal={showModalSuccess}
            setShowModal={setShowModalSuccess}
            title="Account Created"
            textNote="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun."
          />
        )}
        {starYourWillData?.uploaded ? (
          <div className="lodge-will-banner">
            <Row align="middle" justify="center" className="lodge-banner">
              <Col
                xl={{ span: 7, order: 1 }}
                sm={{ span: 24, order: 2 }}
                xs={{ span: 24, order: 2 }}
              >
                <h1>Awesome Work!</h1>
                <p>
                  You???ve successfully uploaded your Will into our secure cloud
                  infastructure. Next, you can consider notifying the Wills
                  Registry that your Will has been made.
                </p>
                <h2>Benefits of lodging Will:</h2>
                <h3>
                  Faciliation of Will through Singpass Will Registry & iWills
                  Benefits of lodging at Singpass Will registry
                </h3>
                <Row className="lodge-btn">
                  <Col>
                    <a href="https://google.com" target="_blank">
                      <CustomButton type="ghost" className="btn-login">
                        Login Wills Registry
                      </CustomButton>
                    </a>
                  </Col>
                  <Col>
                    <CustomButton
                      borderLarge
                      fontWeightLarge
                      className="btn-skip"
                      onClick={() => router.push("/complete")}
                    >
                      Skip This Step
                    </CustomButton>
                  </Col>
                </Row>
              </Col>
              <Col xl={{ offset: 2, order: 2 }} className="lodge-banner-svg">
                <LodgeKey />
                <LodgeKeyMini />
              </Col>
            </Row>
          </div>
        ) : (
          <Row
            className="keep-going"
            style={{
              background: !starYourWillData?.downloaded ? "#E9FAF4" : "#FFD9D1",
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
                {!starYourWillData?.downloaded
                  ? "Your Will Is Ready"
                  : "Upload & Secure"}
              </div>
              <div className="text-continue mt-8">
                {!starYourWillData?.downloaded
                  ? "Let's sign and upload your Will!"
                  : "Your privacy and security is our utmost importance"}
              </div>
              <div className="text mt-16 mb-40">
                <span>
                  {!starYourWillData?.downloaded
                    ? "You've done all the hard work, so take a look at your completed will,"
                    : "Let???s complete your Will. All your information is saved as you go."}
                </span>
                &nbsp;
                <span className="remaining">
                  {!starYourWillData?.downloaded
                    ? "dowload, and print it!"
                    : "Upload your signed will."}
                </span>
              </div>
              {!starYourWillData?.downloaded && (
                // <Link href="/preview-pdf">
                //   <a target="_blank">
                <CustomButton
                  type="ghost"
                  size="large"
                  className="continue-btn"
                  onClick={handlePreView}
                >
                  Download Will
                </CustomButton>
                //   </a>
                // </Link>
              )}
              {starYourWillData?.downloaded && (
                <div>
                  <CustomButton
                    type="ghost"
                    size="large"
                    className="continue-btn"
                    onClick={downloadWillSecurely}
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
        )}
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
                  // <Link href="/preview-pdf">
                  //   <a target="_blank">
                  <Button className="download-btn" onClick={handlePreView}>
                    Download Will
                  </Button>
                  //   </a>
                  // </Link>
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
              <Col span={24} className="center" ref={downloadRef}>
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
              {/* <Spin spinning={uploading}> */}
              {uploading && (
                <div className="uploading">
                  <Row>
                    <Col className="center" span={22}>
                      <Col>
                        <Uploading />
                      </Col>
                      <Col style={{ paddingLeft: 16 }}>
                        <div className="text-pdf">
                          Uploading In Progress...&nbsp;{renderPercentUpload()}
                        </div>
                        <div
                          className="text-upload-day"
                          style={{ color: " #A0A5BE" }}
                        >
                          Storing your will document into our secure cloud
                        </div>
                      </Col>
                    </Col>
                    <Col span={2} className="item-end">
                      {percent !== 100 && (
                        <span
                          onClick={handleCloseUpload}
                          className="close-upload "
                        >
                          <CloseIconUpload />
                        </span>
                      )}
                    </Col>
                  </Row>

                  <Row className="mt-8">
                    <Progress
                      strokeColor={{
                        "0%": "#108ee9",
                        "100%": "#87d068",
                      }}
                      showInfo={false}
                      percent={percent}
                    />
                  </Row>
                </div>
              )}
              {/* </Spin> */}
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
          {starYourWillData?.uploaded && (
            <div className="personal-will-cuong">
              <div
                className="download lodge-form"
                style={{ background: "#fff" }}
              >
                <Row align="middle" justify={"space-between"}>
                  <Col className="center">
                    <span>
                      <LodgeForm />
                    </span>
                    <span className="text-title">Lodge Your Will</span>
                  </Col>
                  <Col>
                    <p>Optional</p>
                  </Col>
                </Row>
                <Row
                  className="optional-text mt-16"
                  style={{ color: "#6670A2" }}
                >
                  Though It is not compulsory to register your Will with the
                  Wills Registry, you should consider notifying the Wills
                  Registry that your Will has been made to help your loved ones
                  locate your Will.
                </Row>
                <Row className="complete-this-form">
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
                        // disable
                        checked={lodgeWillCheckbox}
                        onChange={setLodgeWillCheckbox}
                      />
                    </Col>
                    <Col className="ml-16">
                      <div className="text-fix-now center">
                        <div>
                          Lodge Will into Singapore Will{" "}
                          <span className="registry">
                            Registry
                            {width > 768 ? (
                              <SmallInfoIcon />
                            ) : (
                              <SmallInfoMobileIcon />
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="text-note-per">
                        Estimation of 10 minutes to complete
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
                      <a href="https://google.com" target="_blank">
                        <Button
                          className="complete-this"
                          // onClick={onEditPersonalParticular}
                        >
                          Complete This
                        </Button>
                      </a>
                    )}
                  </Col>
                </Row>
                <div className="paste-your">
                  <h3>
                    Paste your Will Registry verified number below and click
                    ???confirm??? to proceed
                  </h3>
                  <Row justify="space-between">
                    <Col xs={24} md={16} lg={18}>
                      <InputField
                        inputProps={{
                          placeholder: "0000-0000-0000",
                          value: inputValue,
                          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                            setInputValue(e?.target?.value),
                        }}
                        isError={isErrorVerify}
                        errorTextStr={errorConfirmString}
                        displayErrorText={isErrorVerify}
                        wrapperClassName="wrapper-class"
                        displaySupportText={isVerifySuccessfully}
                        supportText="Verify Will Successfully!"
                      />
                    </Col>
                    <Col className="btn-lodge-confirm" md={{ offset: "2" }}>
                      <CustomButton
                        onClick={handleConfirmWill}
                        loading={isLoadingConfirmWill}
                      >
                        Confirm
                      </CustomButton>
                    </Col>
                  </Row>
                </div>
              </div>
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
      style={{ height: "80vh", width: "100%" }}
    >
      <Spin size="large" />
    </Row>
  );
}

export default AuthHoc(StartYourWill);
