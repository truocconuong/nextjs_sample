import React from "react";
import { Button, Col, Modal, Row } from "antd";

import { DotIcon, FaceIcon, FaceMobileIcon } from "../../../../public/images";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
function ModalBeforeStart(props) {
  const { showModal, setShowModal, handleStart } = props;

  const width = useSelector(
    createSelector(
      (state: any) => state?.sizeBrowser,
      (sizeBrowser) => sizeBrowser?.width
    )
  );

  return (
    <Modal
      maskClosable={true}
      footer={null}
      visible={showModal}
      onCancel={() => setShowModal(false)}
      className="modal-start-your-will"
      width={500}
      style={{ padding: "0px 16px" }}
    >
      <div className="modal-before-start">
        <div className="item-center">
          {width > 500 ? <FaceIcon /> : <FaceMobileIcon />}
        </div>
        <div className="text-title mt-24 mb-24">
          Before you start, here are some important notes
        </div>
        <div className="text-will">
          The wills created here in iWills platform is only applicable for the
          following users:
        </div>
        <Row className="mt-24 ">
          <Col span={1}>
            <DotIcon />
          </Col>
          <Col span={23}>
            <mark>Persons above the age of 21</mark>
          </Col>
        </Row>
        <Row className="mt-8 mb-40 ">
          <Col span={1}>
            <DotIcon />
          </Col>
          <Col span={23}>
            <mark>
              Singapore citizens and residents governed by Singapore legislation
            </mark>
          </Col>
        </Row>
        <hr />
        <div className="text-note mt-24">
          By checking “Let’s Get Started", I hereby confirm that iWills and its
          related corporations, as well as their respective representatives
          and/or agents, can collect, use or disclose my personal data in the
          manner set forth in &nbsp;
          <span className="text-link">iWills’ Data Protection Policy</span> and
          the <span className="text-link">FAQs.</span>
        </div>
        <div className="item-center mt-24 mb-8">
          <Button className="let-get-btn" onClick={handleStart}>
            Let’s Get Started
          </Button>
        </div>
      </div>
    </Modal>
  );
}
export default ModalBeforeStart;
