import React, {useRef, useEffect, useState, ReactNode, CSSProperties} from "react";
import {Carousel, Modal} from "antd";
import CustomButton from "generals/Button";

interface IContent {
  subTitle?: string;
  content: string;
}

interface IOptions {
  image?: ReactNode;
  title?: string;
  alignContents?: string;
  contents: IContent[]
}

interface IProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  options: IOptions[]
}

function ModalStep(props: IProps) {
  const {options, show, setShow} = props;
  const slider = useRef(null);

  const [totalContent, setTotalContent] = useState(0);
  const [isFinal, setIsFinal] = useState(false);

  useEffect(() => {
    setTotalContent(options.length);
    if (options.length === 1) setIsFinal(true);
  }, []);

  const handleNext = () => {
    if (isFinal) {
      setShow(false);
      return;
    }
    slider.current.next();
  };

  const handleBeforeChange = index => {
    if (index + 2 === totalContent) {
      setIsFinal(true);
    }
  };

  return (
    <Modal
      className="modal-step"
      closable={false}
      centered
      visible={show}
      footer={[
        <div style={{width: "fit-content", marginBottom: `${options.length === 1 && '-30px'}`}}>
          <CustomButton onClick={handleNext} borderLarge fontWeightLarge>
            {isFinal ? "Continue" : "Next"}
          </CustomButton>
        </div>,
      ]}
    >
      <Carousel
        beforeChange={index => handleBeforeChange(index)}
        dotPosition="bottom"
        ref={slider}
      >
        {options.map((item, index) => {
          return (
            <div className="carousel__child" key={index}>
              <div className="carousel__child--image">{item.image}</div>
              <div className="carousel__child--title">{item.title}</div>
              {item.contents.map(subitem => {
                return (
                  <div className="carousel__child--contents" style={item?.alignContents && {textAlign: 'start'}}>
                    {subitem?.subTitle && <div className="carousel__child--subtitle">{subitem?.subTitle}</div>}
                    <div className="carousel__child--content">{subitem?.content}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </Carousel>
    </Modal>
  );
}

export default ModalStep;
