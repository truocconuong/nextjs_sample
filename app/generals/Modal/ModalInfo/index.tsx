import React from "react";
import {Modal} from "antd";
import { CloseIcon } from "../../../../public/images";
import CustomButton from "generals/Button";

function ModalInfo(props) {
    const {show, handleOk, title, content} = props;
  return (
    <div>
      <Modal
        centered
        title={title}
        visible={show}
        onCancel={handleOk}
        cancelButtonProps={{style: {display: "none"}}}
        className="modal-info"
        closeIcon={<CloseIcon />}
        footer={[
            <CustomButton onClick={handleOk} type="ghost">Understood</CustomButton>
        ]}
      >
        <span>{content}</span>
      </Modal>
    </div>
  );
}

export default ModalInfo;
