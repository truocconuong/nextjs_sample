import Button from "generals/Button";
import React, { useEffect, useState } from "react";
import { ProgressActions } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { isMobile } from "react-device-detect";
import "react-circular-progressbar/dist/styles.css";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { ProgressIcon } from "../../../public/images";
import { Col, Row } from "antd";
interface ProgressPropsInterface {
  textDescription?: string;
  textButton?: string;
}
const ProgressBar = (props: ProgressPropsInterface) => {
  const { textDescription, textButton } = props;
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    console.log("ismobile", isMobile);
    setMobile(isMobile);
  }, [isMobile]);
  const disabled = useSelector(
    createSelector(
      (state: any) => state?.ProgressBar,
      (progress) => progress?.disabled
    )
  );
  const dispatch = useDispatch();
  const percent = useSelector(
    createSelector(
      (state: any) => state?.progress,
      (progress) => progress?.percent
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
    <div className="progress-container">
      {mobile ? (
        <Row className="progress-mobile">
          <Col span={14} className="percent-container">
            <div className="text-percent">
              <span className="percent-completed">{`${percent}% Completed`}</span>
            </div>
          </Col>
          <Col span={8} className="btn-progress-container">
            <Button
              onClick={increaPercent}
              className={
                !disabled
                  ? "button-progress-active"
                  : "button-progress-disabled"
              }
              disabled={percent >= 100 || disabled}
            >
              {textButton || "Continue"}
            </Button>
          </Col>
        </Row>
      ) : (
        <React.Fragment>
          <div className="progress-wrap">
            <CircularProgressbarWithChildren
              value={percent}
              styles={buildStyles({
                pathColor: "#00B67A",
                trailColor: "#E0F6EF",
                backgroundColor: "white",
              })}
              strokeWidth={percent < 100 ? 10 : 0}
            >
              <ProgressIcon />
            </CircularProgressbarWithChildren>
          </div>
          <div className="text-percent">
            <span>{textDescription || "Your Will is"} </span>
            <span className="percent-completed">{`${percent}% Completed`}</span>
          </div>
          <Button
            onClick={increaPercent}
            className={
              !disabled ? "button-progress-active" : "button-progress-disabled"
            }
            disabled={percent >= 100 || disabled}
          >
            {textButton || "Continue"}
          </Button>
        </React.Fragment>
      )}
    </div>
  );
};

export default ProgressBar;
