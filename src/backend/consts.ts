import {CouponType, SubmissionCoupon, Survey} from "../types";

// Update according to your app's needed collections
export const SURVEY_COLLECTION_ID = 'survey-boost-settings';
export const CHECKOUT_SUBMISSIONS_COLLECTION_ID = 'survey-boost-checkout-submissions';
export const TenPercentOffCoupon: SubmissionCoupon =  {
  type: CouponType.PERCENT_OFF_AMOUNT,
  amount: 10
}
export const DEFAULT_SURVEY: Survey = {
  question1: "What made you decide to purchase from us today?",
  question2: "How can we improve your shopping experience in the future?",
  question3: "What feature or product would you like to see in our store next?",
  coupon: TenPercentOffCoupon
};
