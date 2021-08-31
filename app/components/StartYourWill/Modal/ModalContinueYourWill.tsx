import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ThreeFaceIcon, ThreeFaceMobileIcon } from "@images/index.js";
import InputField from "@generals/InputField";
import { setNameStart } from "../../../../redux/actions/startYourWill";
import { useRouter } from "next/router";

function ModalContinueYourWill(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { showModal, setShowModal } = props;
  const [name, setName] = useState("");

  const handleContinue = () => {
    dispatch(setNameStart(name));
    setShowModal(false);
    router.push("/start-your-will-create");
  };

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
      <div className="modal-continue-your-will">
        <div className="item-center">
          {width > 500 ? <ThreeFaceIcon /> : <ThreeFaceMobileIcon />}
        </div>
        <div className="text-title mt-24 mb-24">
          How would you like us to address you?
        </div>
        <div className="text-will">
          This name is only a placeholder, and will be not be included in the
          actual will creation process
        </div>
        <div className="mt-24 mb-40">
          <InputField
            inputProps={{
              placeholder: "Your preferred name",
              value: name,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value),
            }}
          />
        </div>
        <div className="item-center mt-24 mb-8">
          <Button
            className="continue-btn"
            onClick={handleContinue}
            disabled={name ? false : true}
          >
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
}
export default ModalContinueYourWill;
