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
  const { isMobile, button, icon, header, content, footer, onCloseModal } = props;
  return (
    // <Modal
    //       centered={true}
    //       visible={true}
    //       footer={null}
    //       closable={false}
    //       className={
    //         " modal-information " +
    //         (isMobile ? "modal-mobile " : "modal-desktop ")
    //       }
    //       style={isMobile ? { position: "fixed", bottom: "0" } : {}}
    //     >
    //       <div className="modal-information-wrapper">
    //         <div className="title">Personal Information</div>
    //         <div className="content">
    //           <p>
    //             A Testator is someone who makes a will. In this case, you are
    //             the Testator.
    //           </p>
    //           <p>
    //             You can ensure the completeness of data by opting to retrieve
    //             your personal data from MyInfo using your Singpass.
    //           </p>
    //           <div className="btn-wrapper">
    //             <CustomButton
    //               size="large"
    //               className="btn-confirm"
    //               onClick={() => {}}
    //             >
    //               Understood
    //             </CustomButton>
    //           </div>
    //         </div>
    //       </div>
    //     </Modal>
        <Modal
        centered={!isMobile}
        visible={true}
        footer={null}
        closeIcon={<CloseIcon onClick={onCloseModal}/>}
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
          <div className="footer">{footer}</div>
          <div className="btn-wrapper">{button}</div>
        </div>
      </Modal>
  );
};

export default ModalSignIn;
