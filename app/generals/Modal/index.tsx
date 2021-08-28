import React, { ReactElement } from "react";
import { Modal as ModalAntd, ModalProps } from 'antd';
import { IconExit } from "@images/index";
interface ModalPropsInterface extends ModalProps {
  children: ReactElement | ReactElement[];
  onClose?: any;
  closable?: boolean;
}
const Modal = (props: ModalPropsInterface) => {
  const {onClose, closable} = props;
  return (
    <div className="modal-container">
      <ModalAntd
        {...props}
        closable={closable}
        closeIcon={<div onClick={onClose}><IconExit /></div>}
        className={props.className + " custom-modal"}
      >
        {props.children}
      </ModalAntd>
    </div>
  );
};

export default Modal;
