import Button from "generals/Button";
import React, { useEffect, useState } from "react";
import { ProgressActions } from "../../../redux/actions";
import { useDispatch } from "react-redux";
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
  disabled: boolean;
  percent: number;
  amountPercent: number;
}
const ProgressBar = (props: ProgressPropsInterface) => {
  const {
    textDescription,
    textButton,
    disabled,
    percent,
    amountPercent,
  } = props;
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);

  const dispatch = useDispatch();

  const increaPercent = () => {
    if (percent >= 100 || disabled) {
      return;
    }
    let valuePercent = percent + amountPercent;
    if (valuePercent > 100) {
      valuePercent = 100;
    }
    dispatch(
      ProgressActions.setPercent(
        {
          percent: valuePercent,
        },
        () => {}
      )
    );
  };

  return (
    <div className="progress-container">
      {mobile ? (
        <Row className="progress-mobile">
          <div className="percent-container">
            <div className="text-percent-mobile">
              <span className="percent-completed">{`${percent}% Completed`}</span>
            </div>
          </div>
          <div className="btn-progress-container">
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
          </div>
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
