import React, { ReactElement } from "react";
import { Modal as ModalAntd, ModalProps } from 'antd';
interface ModalPropsInterface extends ModalProps {
  children: ReactElement | ReactElement[];
}
const Modal = (props: ModalPropsInterface) => {
  return (
    <div className="modal-container">
      <ModalAntd
        {...props}
        className={props.className + " custom-modal"}
      >
        {props.children}
      </ModalAntd>
    </div>
  );
};

export default Modal;
