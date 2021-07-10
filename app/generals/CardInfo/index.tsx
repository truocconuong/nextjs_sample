import CustomButton from "generals/Button";
import React from "react";
import { EditIcon, DeleteIcon } from "../../../public/images";
export interface CardInfoDataPropsInterface {
  name: string;
  description: string;
  id: number;
}
export interface CardInfoPropsInterface extends CardInfoDataPropsInterface {
  isMobile: boolean;
  hightlightColor: string;
  onEditCard: (e: any) => void;
  canDelete?: boolean;
}
const CardInfo = (props: CardInfoPropsInterface) => {
  const {
    name,
    description,
    isMobile,
    hightlightColor,
    onEditCard,
    id,
    canDelete
  } = props;
  return (
    <div
      className={
        "card-info-container " +
        (isMobile ? "container-mobile" : "container-desktop")
      }
    >
      <div className="card-info-wrapper">
        <div className="card-base-info">
          <div
            className="highlight-text"
            style={{ backgroundColor: hightlightColor }}
          >
            <div className="text">{name[0]}</div>
          </div>
          <div className="base-info">
            <div className="name">{name}</div>
            <div className="description">{description}</div>
          </div>
        </div>
        <div className="card-action">
          <div className="action-wrapper">
            <div className="action-edit">
              <CustomButton
                className="btn-edit"
                onClick={(e) => onEditCard(e)}
                icon={
                  <div className="edit-wrapper">
                    <EditIcon />
                  </div>
                }
              >
                Edit
              </CustomButton>
            </div>
            { canDelete &&
              <div className="action-delete">
              <CustomButton
                className="btn-delete"
                onClick={(e) => onEditCard(id)}
                icon={
                  <div className="delete-wrapper">
                    <DeleteIcon />
                  </div>
                }
              ></CustomButton>
            </div>
            }
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
