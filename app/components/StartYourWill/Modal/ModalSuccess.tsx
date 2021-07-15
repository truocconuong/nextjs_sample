import React from "react";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import {
  SuccessMobileInModal,
  SuccessInModal,
} from "../../../../public/images";

function ModalSuccess(props) {
  const { showModal, setShowModal, title, textNote, handleReturn } = props;

  const width = useSelector(
    createSelector(
      (state: any) => state?.sizeBrowser,
      (sizeBrowser) => sizeBrowser?.width
    )
  );

  return (
    <Modal
      maskClosable={false}
      footer={null}
      visible={showModal}
      onCancel={() => setShowModal(false)}
      className="modal-start-your-will background"
      width={500}
      style={{ padding: "0px 16px" }}
      closable={false}
    >
      <div className="success-modal">
        <div className="item-center mt-40">
          {width > 500 ? <SuccessInModal /> : <SuccessMobileInModal />}
        </div>
        <div className="text-title mt-24 mb-24">{title}</div>
        <div className="text-will">{textNote}</div>
        <div className="item-center mt-40 mb-8">
          <Button className="return-btn" onClick={() => handleReturn()}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    </Modal>
  );
}
export default ModalSuccess;
