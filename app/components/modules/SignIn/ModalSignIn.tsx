import CustomButton from "generals/Button";
import Modal from "generals/Modal";
import React from "react";
import { ReactElement } from "react";
import { CloseIcon } from "../../../../public/images";
export interface IModalSignInProps {
  isMobile: boolean;
  button: ReactElement;
  icon: ReactElement;
  header?: string | ReactElement;
  content?: ReactElement | ReactElement[];
  id: number;
  footer?: ReactElement | ReactElement[];
  onCloseModal: any;
}
const ModalSignIn = (props: IModalSignInProps) => {
  const {
    isMobile,
    button,
    icon,
    header,
    content,
    footer,
    onCloseModal,
  } = props;
  return (
    <Modal
      centered={!isMobile}
      visible={true}
      footer={<div className="btn-wrapper">{button}</div>}
      closable={false}
      className={
        " modal-information " +
        (isMobile ? "modal-mobile-sign-in " : "modal-desktop-sign-in ")
      }
      style={isMobile ? { position: "fixed", bottom: "0" } : {}}
    >
      <div className="modal-wrapper">
        <div className="content">
          <div className="icon">{icon}</div>
          <div className="header">{header}</div>
          <div className="content">{content}</div>
          <div className="footer">{footer}</div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSignIn;
