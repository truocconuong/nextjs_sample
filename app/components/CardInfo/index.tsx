import React from "react";
export interface CardInfoDataPropsInterface {
    name: string;
    passport: string;
}
export interface CardInfoPropsInterface {
  data: CardInfoDataPropsInterface;
}
const CardInfo = (props: CardInfoPropsInterface) => {
  const { data } = props;
  return <div></div>;
};

export default CardInfo;
