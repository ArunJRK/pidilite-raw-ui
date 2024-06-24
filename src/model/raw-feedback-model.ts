import mongoose, { Document, Schema } from "mongoose";

export interface RawFeedbackType extends Document {
  chapter_name: string;
  agent_name: string;
  case_number: number;
  status: string;
  tat_status_update: string;
  account_name_code_mobile_number: string;
  account_email: string | null;
  case_record_type: string;
  created_date_reporting: Date;
  created_month: Date;
  wss_name: string;
  wss_code: string | null;
  wss_contact: string;
  town_name: string | null;
  dealer_name: string | null;
  dealer_mobile_no: string | null;
  dealer_city: string | null;
  category: string;
  subcategory: string;
  subcategory2: string | null;
  description: string;
  expected_resolution_date: Date | null;
  expected_resolution_date_reporting: Date | null;
  ageing: number;
  case_owner_full_name: string;
  case_owner_email: string;
  case_origin: string;
  ftr: string;
  sales_group_code: string;
  division: string;
  state: string | null;
  closed_date_reporting: Date;
  employee_division: string | null;
  root_cause: string | null;
  root_cause_additional_remark: string | null;
  action_taken: string | null;
  reason: string | null;
  assigned_to: string | null;
  resolved_date: Date | null;
  resolved_date_reporting: Date | null;
  expected_resolution_date_2: Date | null;
  reason_for_recommendation_score: string | null;
  parent_division: string | null;
  collaborator_division: string | null;
  product_division_description: string | null;
  will_you_recommend_pidilite_products: string | null;
  reason_for_the_score: string | null;
  case_id: string;
  created_by_full_name: string;
  dealer_code: string | null;
  dealer_state: string | null;
  collaborator_name: string | null;
  is_re_raised: number;
  resolved_date_date: Date | null;
  resolved_by: string | null;
  customer_last_followup_date: Date | null;
  action_representative_closure: string | null;
  reason_for_delay: string | null;
  follow_up_comments: string | null;
  re_raise_comments: string | null;
  issue_resolution_closure_comments: string;
  closed_by: string;
  cluster_bm_code: string | null;
  spacy_md_vec: number[];
}

const RawFeedbackSchema: Schema = new Schema({
  chapter_name: { type: String, required: true },
  agent_name: { type: String, required: true },
  case_number: { type: Number, required: true },
  status: { type: String, required: true },
  tat_status_update: { type: String, required: true },
  account_name_code_mobile_number: { type: String, required: true },
  account_email: { type: String },
  case_record_type: { type: String, required: true },
  created_date_reporting: { type: Date, required: true },
  created_month: { type: Date, required: true },
  wss_name: { type: String, required: true },
  wss_code: { type: String },
  wss_contact: { type: String, required: true },
  town_name: { type: String },
  dealer_name: { type: String },
  dealer_mobile_no: { type: String },
  dealer_city: { type: String },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  subcategory2: { type: String },
  description: { type: String, required: true },
  expected_resolution_date: { type: Date },
  expected_resolution_date_reporting: { type: Date },
  ageing: { type: Number, required: true },
  case_owner_full_name: { type: String, required: true },
  case_owner_email: { type: String, required: true },
  case_origin: { type: String, required: true },
  ftr: { type: String, required: true },
  sales_group_code: { type: String, required: true },
  division: { type: String, required: true },
  state: { type: String },
  closed_date_reporting: { type: Date, required: true },
  employee_division: { type: String },
  root_cause: { type: String },
  root_cause_additional_remark: { type: String },
  action_taken: { type: String },
  reason: { type: String },
  assigned_to: { type: String },
  resolved_date: { type: Date },
  resolved_date_reporting: { type: Date },
  expected_resolution_date_2: { type: Date },
  reason_for_recommendation_score: { type: String },
  parent_division: { type: String },
  collaborator_division: { type: String },
  product_division_description: { type: String },
  will_you_recommend_pidilite_products: { type: String },
  reason_for_the_score: { type: String },
  case_id: { type: String, required: true },
  created_by_full_name: { type: String, required: true },
  dealer_code: { type: String },
  dealer_state: { type: String },
  collaborator_name: { type: String },
  is_re_raised: { type: Number, required: true },
  resolved_date_date: { type: Date },
  resolved_by: { type: String },
  customer_last_followup_date: { type: Date },
  action_representative_closure: { type: String },
  reason_for_delay: { type: String },
  follow_up_comments: { type: String },
  re_raise_comments: { type: String },
  issue_resolution_closure_comments: { type: String, required: true },
  closed_by: { type: String, required: true },
  cluster_bm_code: { type: String },
  spacy_md_vec: { type: [Number], required: true },
});

const RawFeedbackModel =
  mongoose.models.RawFeedbackModel ||
  mongoose.model("RawFeedbackModel", RawFeedbackSchema, "raw_feedbacks");

export default RawFeedbackModel;
