export interface IExecutor {
  full_legal_name: string;
  relationship_id: string;
  email: string;
  nric: string;
  id?: string;
  created_at?: string;
  updated_at?: string;
  is_delete?: boolean;
  user_id?: string;
  type?: string;
}

export interface IBeneficiary {
  full_legal_name?: string;
  relationship_id?: string;
  email?: string;
  percent?: number;
  nric?: string;
  id?: string;
}

export interface ISetPercent {
  id: string;
  percent: number;
}

export interface IProperty {
  id: string;
  country: string;
  is_solely: boolean;
  is_joint: boolean;
  postal_code: string;
  address_line_1: string;
  address_line_2: string;
  unit_number: string;
  tenure: number;
  current_bank_loan_id: string;
  type_id: string;
  remaining_loan_tenure: number;
  joint_name: string;
  joint_contact: string;
  loan_start_date: string;
  loan_end_date: string;
  year_loan_taken: number;
  interest_rate: number;
  outstanding_loan_amount: number;
  is_delete: boolean;
}

export interface IBankAccount {
  id: string;
  bank_id: string;
  account_no: string;
  is_solely: boolean;
  current_balance: number;
  account_holder: string;
}

export interface IInsurancePolicy {
  id: string;
  insurance_company: string;
  is_non_nomivated: boolean;
  policy_name: string;
  policy_no: string;
  current_value: number;
  converage: number;
  beneficiary_name: string;
  is_nominated?: boolean;
}

export interface IInvestment {
  id: string;
  type_id: string;
  financial_institutions: string;
  account_no: string;
  capital_outlay: number;
  current_market_value: number;
}

export interface IBusinessInterest {
  id: string;
  company_name: string;
  company_uen: string;
  position: string;
  estimated_current_market_value: number;
  percentage_share: number;
}

export interface IValuable {
  id: string;
  type_id: string;
  brand: string;
  model: string;
  serial_no: string;
}

export interface IPersonalInformation {
  email: string;
  full_legal_name: string;
  nric: string;
  postal_code: string;
  address_line_1: string;
  address_line_2: string;
  unit_number: string;
}

export interface IData {
  id?: string;
  email: string;
  full_legal_name: string;
  nric: string;
  postal_code: string;
  address_line_1: string;
  address_line_2: string;
  unit_number: string;
  executors: IExecutor[];
  beneficiaries: IBeneficiary[];
  properties: IProperty[];
  bank_accounts: IBankAccount[];
  insurance_policies: IInsurancePolicy[];
  investments: IInvestment[];
  business_interests: IBusinessInterest[];
  valuables: IValuable[];
}

export interface IMasterdata {
  id: string;
  name: string;
  value: string;
  is_enable: boolean;
  updated_at: string;
  created_at: string;
}

export interface RelationshipInterface {
  id: number;
  name: string;
}
