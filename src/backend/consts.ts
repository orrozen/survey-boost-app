import {CouponType, QuestionType, SubmissionCoupon, Survey} from "../types";

// Update according to your app's needed collections
export const SURVEY_COLLECTION_ID = 'Survey';
export const CHECKOUT_SUBMISSIONS_COLLECTION_ID = 'survey-boost-checkout-submissions';
export const TenPercentOffCoupon: SubmissionCoupon =  {
  type: CouponType.PERCENT_OFF_AMOUNT,
  amount: 10
}
export const DEFAULT_SURVEY: Survey = {
  questions: [
      {id: '1', type: QuestionType.SHORT_ANSWER , text: "What made you decide to purchase from us today?"},
      {id: '2', type: QuestionType.SHORT_ANSWER , text: "How can we improve your shopping experience in the future?"},
      {id: '3', type: QuestionType.SHORT_ANSWER , text: "What feature or product would you like to see in our store next?"},
  ],
  coupon: TenPercentOffCoupon
};
