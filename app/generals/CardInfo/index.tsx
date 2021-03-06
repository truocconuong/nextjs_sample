import CustomButton from "generals/Button";
import React from "react";
import { EditIcon, DeleteIcon } from "../../../public/images";
export interface CardInfoDataPropsInterface {
  name: string;
  description: string;
  id: string;
}
export interface CardInfoPropsInterface extends CardInfoDataPropsInterface {
  isMobile: boolean;
  hightlightColor: string;
  onEditCard: (e: any, id: string) => void;
  canDelete?: boolean;
  onDeleteCardItem?: (key: string) => void;
  hightlightText?: string | number;
}
const CardInfo = (props: CardInfoPropsInterface) => {
  const {
    name,
    description,
    isMobile,
    hightlightColor,
    onEditCard,
    id,
    canDelete,
    onDeleteCardItem,
    hightlightText
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
            <div className="text">{hightlightText || name[0]}</div>
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
                onClick={(e) => onEditCard(e, id)}
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
                onClick={(e) => onDeleteCardItem(id)}
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
