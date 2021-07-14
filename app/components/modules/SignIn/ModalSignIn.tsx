import Modal from "generals/Modal";
import React from "react";
import { ReactElement } from "react";
export interface IModalSignInProps {
  isMobile: boolean;
  button: ReactElement;
  icon: ReactElement;
  header: string | ReactElement;
  content: ReactElement | ReactElement[];
  id: number;
}
const ModalSignIn = (props: IModalSignInProps) => {
  const { isMobile, button, icon, header, content } = props;
  return (
    <Modal
      centered={true}
      visible={true}
      footer={null}
      closable={false}
      className={
        " modal-signin-container " +
        (isMobile ? "modal-mobile " : "modal-desktop ")
      }
      style={isMobile ? { position: "fixed", bottom: "0" } : {}}
    >
      <div className="modal-wrapper">
        <div className="icon">{icon}</div>
        <div className="header">{header}</div>
        <div className="content">{content}</div>
        <div className="btn-wrapper">{button}</div>
      </div>
    </Modal>
  );
};

export default ModalSignIn;
