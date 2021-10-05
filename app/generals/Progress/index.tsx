import Button from "generals/Button";
import React from "react";
import { ProgressActions } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "react-circular-progressbar/dist/styles.css";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { ProgressIcon } from "../../../public/images";
import { Row } from "antd";
import router from "next/router";
import { getAmountPercentCompleted } from "../../../utils/helpers/Tool.util";
import { createSelector } from "reselect";
import { IData } from "@constant/data.interface";
interface ProgressPropsInterface {
  textDescription?: string;
  textButton?: string;
  disabled: boolean;
  percent: number;
  amountPercent: number;
  isMobile?: boolean;
  routerPush?: string;
  pushable?: boolean;
}
const ProgressBar = (props: ProgressPropsInterface) => {
  const {
    textDescription,
    textButton,
    disabled,
    percent,
    isMobile,
    routerPush,
    pushable
  } = props;

  const dispatch = useDispatch();
  const categoryData = useSelector(
    createSelector(
      (state: any) => state?.category,
      (category: IData) => {
        return category;
      }
    )
  );
  const increaPercent = () => {
    if (disabled) {
      return;
    }
    dispatch(
      ProgressActions.setPercent(
        {
          percent: getAmountPercentCompleted(categoryData),
        },
        () => { }
      )
    );
    pushable && router.push(routerPush);
    dispatch(
      ProgressActions.setDisabled(
        {
          disabled: true,
        },
        () => { }
      )
    );
  };

  return (
    <div className="progress-container">
      {isMobile ? (
        <Row className="progress-mobile">
          <div className="percent-container">
            <div className="text-percent-mobile">
              <span className="percent-completed">{`${percent}% Completed`}</span>
            </div>
          </div>
          <div className="btn-progress-container">
            <Button
              onClick={increaPercent}
              type="primary"
              disabled={disabled}
            >
              {textButton || "Continue"}
            </Button>
          </div>
        </Row>
      ) : (
        <React.Fragment>
          <div className="progress-container-wrap">
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
            <div style={{ width: "fit-content" }}>
              <Button
                onClick={increaPercent}
                type="primary"
                disabled={disabled}
              >
                {textButton || "Continue"}
              </Button>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ProgressBar;
