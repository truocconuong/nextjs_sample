import { Col, Row } from "antd";
import React, { useState } from "react";
import {
  IWill,
  IWillMobile,
  Logo,
  LogoMobile,
  MenuIcon,
} from "../../../public/images";
import { isMobile } from "react-device-detect";
import { useEffect } from "react";
import ProgressBar from "generals/Progress";

const NavigationBar = () => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    console.log("ismobile", isMobile);
    setMobile(isMobile);
  }, [isMobile]);

  return (
    <div className="navigation-bar-container">
      <div className={"navigation-bar-wrapper border-bottom" + (mobile ? " flex-column pd-7" : " flex-row")}>
        {mobile ? (
          <>
            <Row className="row-wrapper">
              <Col span={8} className="logo-will-container mobile">
                <Row className="will-container">
                  <div className="logo">
                    <LogoMobile />
                  </div>
                  <div className="will">
                    <IWillMobile />
                  </div>
                </Row>
              </Col>
              <Col span={10} offset={2} className="container-back-mobile">
                <div className="back-container">
                  <div className="back" onClick={() => {}}>
                    Dashboard
                  </div>
                  <div className="icon-menu">
                    <MenuIcon />
                  </div>
                </div>
              </Col>
            </Row>
            <ProgressBar />
          </>
        ) : (
          <Row className="row-wrapper">
            <Col
              span={6}
              className="logo-will-container"
              xs={6}
              md={6}
              xl={6}
              xxl={6}
            >
              <Row className="will-container">
                <div className="logo">
                  <Logo />
                </div>
                <div className="will">
                  <IWill />
                </div>
              </Row>
            </Col>
            <Col
              span={10}
              className="progress-container"
              xs={10}
              md={8}
              xl={10}
              xxl={10}
            >
              <ProgressBar />
            </Col>
            <Col span={3} offset={4} xs={5} md={4} xl={3} xxl={3}>
              <div className="back-container">
                <div className="back" onClick={() => {}}>
                  Return to Dashboard
                </div>
                <div className="icon-menu">
                  <MenuIcon />
                </div>
              </div>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
