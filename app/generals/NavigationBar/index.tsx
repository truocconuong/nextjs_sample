import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import {
  IWill,
  IWillMobile,
  Logo,
  LogoMobile,
  MenuIcon,
} from "../../../public/images";

import ProgressBar from "generals/Progress";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import SignInForm from "@layout/SignIn";
import router from "next/router";

const NavigationBar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const width = useSelector(
    createSelector(
      (state: any) => state?.sizeBrowser,
      (sizeBrowser) => sizeBrowser?.width
    )
  );
  
  const [isShowSignIn, setIsShowSignIn] = useState(false);

  useEffect(() => {
    setIsMobile(width < 884)
  }, [width])
  
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

  const routerPush = useSelector(
    createSelector(
      (state: any) => state?.progress,
      (progress) => progress?.router
    )
  );

  const pushable = useSelector(
    createSelector(
      (state: any) => state?.progress,
      (progress) => progress?.pushable
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

  const returnToDashBoard = () => {
    router.push('/start-your-will');
  }

  return (
    <React.Fragment>
      <nav className="navigation-bar-container">
        <div
          className={
            "navigation-bar-wrapper border-bottom" +
            (isMobile ? " flex-column pd-7 height-80" : " flex-row height-100")
          }
        >
          {isMobile ? (
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
                      <div className="back-wrapper">
                      </div>
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
                  isMobile={isMobile}
                  routerPush={routerPush}
                  pushable={pushable}
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
                {isShowProgressBar && (
                  <ProgressBar
                    disabled={disabledBtn}
                    textButton={textButtonProgress}
                    percent={percent}
                    amountPercent={amountPercentIncreament}
                    isMobile={isMobile}
                    routerPush={routerPush}
                    pushable={pushable}
                  />
                )}
                <div className="back-container">
                  <div className="back-wrapper">
                    <div className="back" onClick={returnToDashBoard}>
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
           {isShowSignIn && <SignInForm isMobile={isMobile}/>}
        </div>
      </nav>
      <div className={isMobile ? "height-150" : "height-100"}></div>
    </React.Fragment>
  );
};

export default NavigationBar;
