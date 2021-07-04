import { Button, Col, Progress, Row } from "antd";
import React, { useState } from "react";
import {
  IWill,
  IWillMobile,
  Logo,
  LogoMobile,
  MenuIcon,
  ProgressIcon,
} from "../../../public/images";
import "react-circular-progressbar/dist/styles.css";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
import { ProgressActions } from "../../../redux/actions";
import { createSelector } from "reselect";
import { isMobile } from "react-device-detect";
import { useEffect } from "react";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState(false);
  const percent = useSelector(
    createSelector(
      (state: any) => state?.progress,
      (progress) => progress?.percent
    )
  );

  useEffect(() => {
    console.log("ismobile", isMobile);
    setMobile(isMobile);
  }, [isMobile]);

  const isShowProgressBar = useSelector(
    createSelector(
      (state: any) => state?.progress,
      (progress) => progress?.isShowProgressBar
    )
  );

  const disabled = useSelector(
    createSelector(
      (state: any) => state?.progress,
      (progress) => progress?.disabled
    )
  );

  const increaPercent = () => {
    if (percent >= 100 || disabled) {
      return;
    }
    dispatch(
      ProgressActions.saveProgress({
        percent: percent + 10,
      })
    );
  };

  return (
    <div className="navigation-bar-container">
      <div className={"navigation-bar-wrapper " +  (!mobile ? "border" : "")}>
        {mobile ? (
          <>
            <Row className="row-wrapper border">
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
              <Col span={12} offset={2} className="container-back-mobile">
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
            <Row className="row-wrapper container-mobile mobile">
              <Col span={12}>
                <div className="text-percent">
                  <span className="percent-completed">{`${percent}% Completed`}</span>
                </div>
              </Col>
              <Col span={8} className="logo-will-container mobile"></Col>
            </Row>
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
              <CircularProgressbarWithChildren
                value={percent}
                styles={buildStyles({
                  pathColor: "#00B67A",
                  trailColor: "#E0F6EF",
                })}
                className="progress-bar"
                strokeWidth={percent < 100 ? 10 : 0}
              >
                <ProgressIcon />
              </CircularProgressbarWithChildren>
              <div className="text-percent">
                <span>Your Will is </span>
                <span className="percent-completed">{`${percent}% Completed`}</span>
              </div>
              <Button
                onClick={increaPercent}
                className="button-progress-active"
                disabled={percent >= 100 || disabled}
              >
                Save & Continue
              </Button>
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
