export enum METHOD {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
}

export enum PERSONAL_ALLOCATION {
  FATHER = "Father",
  MOTHER = "Mother",
  SON = "Son",
  DAUGHTER = "Daughter",
  GRANDCHILD = "Grandchild",
  NEPHEW = "Nephew",
  NIECE = "Niece",
  OTHERS = "Others",
}

export enum MASTERDATA_TYPE {
  RELATIONSHIP = "RELATIONSHIP",
  BANK = "BANK",
  ASSET = "ASSET",
  INVESTMENT = "INVESTMENT",
  TYPE_PROPERTY = "TYPE_PROPERTY",
}

export const MAX_LENGTH_NAME = 255;
export const MAX_LENGTH_FILE_NAME = 20;

export enum VALUABLES_TYPE {
  WATCH = "Watch",
  JEWELLERY = "Jewellery",
  MOTOR_VEHICLE = "Motor Vehicle",
  REAL_ESTATE = "Real Estate",
  PET = "Pet",
  SAFE_BOX = "Safe Box",
}
