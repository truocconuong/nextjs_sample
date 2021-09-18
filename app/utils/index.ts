export function isEmail(email: string) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

export function isValidName(name: string) {
  const regex = /^[a-zA-Z0-9@\s]+$/;
  return regex.test(String(name).toLowerCase());
}

export function isValidNric(nric: string) {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(String(nric).toLowerCase());
}

export function isNumber(value: string) {
  const regex = /^[0-9]+$/;
  return regex.test(value);
}

export const limitLength = (str, length) => str.substring(0, length);

const extract = (str, pattern) => (str.match(pattern) || []).pop() || "";

export const extractAlpha = (str) => extract(str, "[a-zA-Z]+");

export const checkDoneAllOption = (category) => {
  let check1 = false;
  let check2 = false;
  let check3 = false;
  let check4 = false;
  let check5 = false;
  const token = localStorage.getItem("accessToken");
  if (token) {
    check1 = true;
  }
  if (
    category?.email_personal &&
    category?.full_legal_name &&
    category?.nric &&
    category?.postal_code &&
    category?.address_line_1 &&
    category?.address_line_2 &&
    category?.unit_number
  ) {
    check2 = true;
  }
  if (category?.executors.length >= 1) {
    check3 = true;
  }
  if (category?.beneficiaries.length >= 1) {
    check4 = true;
  }

  if (category?.beneficiaries?.length >= 2) {
    let percent = 0;
    category?.beneficiaries?.map((item) => {
      if (item.percent !== 100) {
        percent += item.percent;
      }
    });
    if (percent === 100) check5 = true;
  }
  return check1 && check2 && check3 && check4 && check5;
};

export function isValidPhoneNumber(phone: string) {
  const regex = /\+65[6|8|9]\d{7}/;
  return regex.test(String(phone).toLowerCase());
}
