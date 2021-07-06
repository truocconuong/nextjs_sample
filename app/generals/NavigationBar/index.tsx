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
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const NavigationBar = () => {
  const [mobile, setMobile] = useState(false);
  const disabledBtn = useSelector(
    createSelector(
      (state: any) => state?.progress,
      (progress) => progress?.disabled
    )
  );
  const isShowProgressBar = useSelector(
    createSelector(
      (state: any) => state?.progress,
      (progress) => progress?.isShowProgressBar
    )
  );

  const textButtonProgress = useSelector(
    createSelector(
      (state: any) => state?.progress,
      (progress) => progress?.textButtonProgress
    )
  );

  const percent = useSelector(
    createSelector(
      (state: any) => state?.progress,
      (progress) => progress?.percent
    )
  );

  const amountPercentIncreament = useSelector(
    createSelector(
      (state: any) => state?.progress,
      (progress) => progress?.amountPercentIncreament
    )
  );

  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);

  return (
    <div className="navigation-bar-container">
      <div className={"navigation-bar-wrapper border-bottom" + (mobile ? " flex-column pd-7 height-80" : " flex-row height-100")}>
        {mobile ? (
          <>
            <div className="row-wrapper">
              <div className="row-child-wrapper">
                <div className="logo-will-container mobile">
                  <Row className="will-container">
                    <div className="logo">
                      <LogoMobile />
                    </div>
                    <div className="will">
                      <IWillMobile />
                    </div>
                  </Row>
                </div>
                <div className="container-back-mobile">
                  <div className="container-back-wrap">
                    <div className="back" onClick={() => {}}>
                      Dashboard
                    </div>
                    <div className="icon-menu">
                      <MenuIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isShowProgressBar && (
              <ProgressBar
                disabled={disabledBtn}
                textButton={textButtonProgress}
                percent={percent}
                amountPercent={amountPercentIncreament}
              />
            )}
          </>
        ) : (
          <div className="row-wrapper">
            <div className="row-child-wrapper">
              <div className="logo-will-container">
                <div className="will-container">
                  <div className="logo">
                    <Logo />
                  </div>
                  <div className="will">
                    <IWill />
                  </div>
                </div>
              </div>
              <div className="progress-container">
                {isShowProgressBar && (
                  <ProgressBar
                    disabled={disabledBtn}
                    textButton={textButtonProgress}
                    percent={percent}
                    amountPercent={amountPercentIncreament}
                  />
                )}
              </div>
              <div className="back-container">
                <div className="back-wrapper">
                  <div className="back" onClick={() => {}}>
                    Return to Dashboard
                  </div>
                  <div className="icon-menu">
                    <MenuIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
