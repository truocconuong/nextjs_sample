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
  outstanding_loan_amount: number | string;
  is_delete: boolean;
}

export interface IBankAccount {
  id?: string;
  bank: string;
  account_no: string;
  is_solely: boolean;
  is_joint: boolean;
  current_balance: number | string;
  account_holder: string;
  is_delete: boolean;
  user_id?: string;
}

export interface IInsurancePolicy {
  id: string;
  insurance_company: string;
  is_non_nomivated: boolean;
  policy_name: string;
  policy_no: string;
  current_value: number | string;
  converage: number | string;
  beneficiary_name: string;
  is_nominated: boolean;
  is_delete: boolean;
}

export interface IInvestment {
  id: string;
  type_id: string;
  financial_institutions: string;
  account_no: string;
  capital_outlay: number | string;
  current_market_value: number | string;
  is_delete: boolean;
}

export interface IBusinessInterest {
  id: string;
  company_name: string;
  company_uen: string;
  position: string;
  estimated_current_market_value: number;
  percentage_share: number;
  is_delete: boolean;
}

export interface IValuable {
  id: string;
  type_id: string;
  brand?: string;
  model?: string;
  serial_no?: string;
  plate_no?: string;
  country_name?: string;
  address_line_1?: string;
  address_line_2?: string;
  postal_code?: string;
  pet_name?: string;
  pet_breed?: string;
  pet_registration_number?: string;
  safe_box_detail?: string;
  is_delete?: boolean;
}

export interface IPersonalInformation {
  email_personal: string;
  full_legal_name: string;
  nric: string;
  postal_code: string;
  address_line_1: string;
  address_line_2: string;
  unit_number: string;
}

export interface IUserInformation {
  full_legal_name?: string;
  email?: string;
  nric?: string;
  will_pdf_link?: string;
  phone?: string;
}

export interface IData {
  id?: string;
  email: string;
  phone: string;
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
  will_pdf_link?: string;
  email_personal?: string;
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

// interface profile

export interface IResponseGetProfile {
  bank_accounts: {
    data: IBankAccount[];
    total: number;
  };
  beneficiaries: {
    data: IBeneficiary[];
  };
  business_interests: {
    data: IBusinessInterest[];
    total: number;
  };
  executors: {
    data: IExecutor[];
  };
  insurance_policies: {
    data: IInsurancePolicy[];
    total: number;
  };
  investments: {
    data: IInvestment[];
    total: number;
  };
  properties: {
    data: IProperty[];
    total: number;
  };
  valuables: {
    data: IValuable[];
  };
  totalAssets: number;
  will_pdf_link: string;
  full_legal_name: string;
  email: string;
}

export interface ISingpassGetEnv {
  _attributes: string;
  _authApiUrl: string;
  _authLevel: string;
  _clientId: string;
  _clientSecret: string;
  _personApiUrl: string;
  _privateKeyContent: string;
  _publicCertContent: string;
  _redirectUrl: string;
  _tokenApiUrl: string;
}


//SING PASS DATA 
export interface Residentialstatus {
  lastupdated: string;
  code: string;
  source: string;
  classification: string;
  desc: string;
}

export interface Name {
  lastupdated: string;
  source: string;
  classification: string;
  value: string;
}

export interface Sex {
  lastupdated: string;
  code: string;
  source: string;
  classification: string;
  desc: string;
}

export interface Nationality {
  lastupdated: string;
  code: string;
  source: string;
  classification: string;
  desc: string;
}

export interface Uinfin {
  lastupdated: string;
  source: string;
  classification: string;
  value: string;
}

export interface Dob {
  lastupdated: string;
  source: string;
  classification: string;
  value: string;
}

export interface Country {
  code: string;
  desc: string;
}

export interface Unit {
  value: string;
}

export interface Street {
  value: string;
}

export interface Block {
  value: string;
}

export interface Postal {
  value: string;
}

export interface Floor {
  value: string;
}

export interface Building {
  value: string;
}

export interface Address {
  country: Country;
  unit: Unit;
  street: Street;
  block: Block;
  postal: Postal;
  type: string;
  floor: Floor;
  building: Building;
}

export interface Hdbownership {
  address: Address;
  lastupdated: string;
  source: string;
  classification: string;
}

export interface ISingpassPersonalData {
  residentialstatus: Residentialstatus;
  name: Name;
  sex: Sex;
  nationality: Nationality;
  uinfin: Uinfin;
  dob: Dob;
  hdbownership: Hdbownership[];
  childrenbirthrecords: any[];
  sponsoredchildrenrecords: any[];
}

export interface RootObject {
  status: string;
  text: Text;
}

