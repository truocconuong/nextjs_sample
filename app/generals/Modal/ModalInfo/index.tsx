import React, { ReactNode } from "react";
import {Modal} from "antd";
import {CloseIcon} from "../../../../public/images";
import CustomButton from "generals/Button";

interface IProps {
  show?: boolean, 
  handleOk?: () => void,  
  handleCancel?: () => void,
  title?: string, 
  content?: ReactNode,
  contentButton?: string
}

function ModalInfo(props: IProps) {
  const {show, handleOk, handleCancel, title, content, contentButton} = props;
  return (
    <div>
      <Modal
        centered
        title={title}
        visible={show}
        onCancel={handleCancel}
        cancelButtonProps={{style: {display: "none"}}}
        className="modal-info"
        closeIcon={<CloseIcon />}
        footer={[
          <div style={{width: "fit-content"}}>
            <CustomButton onClick={handleOk} borderLarge fontWeightLarge>
              {contentButton || "Understood"}
            </CustomButton>
          </div>,
        ]}
      >
        <span>{content}</span>
      </Modal>
    </div>
  );
}

export default ModalInfo;
