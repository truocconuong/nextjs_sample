import { notification } from "antd";
import { SuccessIcon, WarningIcon, InfoIcon } from "../../../public/images";

// how to use
// notificationInfo("Hooray!", "Payment has been successfully processed. Please upload your signed Will.");

export const notificationSuccess = (messageBold?, message?) => {
  notification.success({
    className: "notification-success",
    icon: <SuccessIcon />,
    duration: 5,
    message: "",
    description: (
      <div>
        {messageBold && <b>{messageBold}&nbsp;</b>}
        {message}
      </div>
    ),
  });
};

export const notificationWarning = (messageBold?, message?) => {
  notification.warning({
    className: "notification-warning",
    icon: <WarningIcon />,
    duration: 5,
    message: "",
    description: (
      <div>
        {messageBold && <b>{messageBold}&nbsp;</b>}
        {message}
      </div>
    ),
  });
};

export const notificationInfo = (messageBold?, message?) => {
  notification.info({
    className: "notification-info",
    icon: <InfoIcon />,
    duration: 5,
    message: "",
    description: (
      <div>
        {messageBold && <b>{messageBold}&nbsp;</b>}
        {message}
      </div>
    ),
  });
};
