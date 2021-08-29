import { IData } from "@constant/data.interface";
const categoryField = ["beneficiaries", "business_interests", "executors", "insurance_policies", "investments", "properties", "valuables", "bank_accounts", "full_legal_name", "estalisting"];
export const getAmountPercentCompleted = (categories: IData) => {
    if(!categories){
        return 0;
    }
    let percent = 0;
    categoryField.forEach((item: string) => {
        if(item === "estalisting") {
            percent += isDoneEstalisted(categories) ? Math.round(100/categoryField.length) : 0;
        }else {
            if(categories[item]?.length > 0){
                percent += Math.round(100/categoryField.length);
            }
        }
       
    })
    return percent;
}

export const isDoneEstalisted = (category: IData) => {
    if (category?.beneficiaries?.length >= 2) {
        let percent = 0;
        category?.beneficiaries?.map((item) => {
          if (item.percent !== 100) {
            percent += item.percent;
          }
        });
        return percent === 100;
    }
    return false;
}

export const isEmptyObject = (obj: object) => {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}