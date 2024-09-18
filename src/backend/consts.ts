import {
  CouponType,
  QuestionType,
  SubmissionCoupon,
  Submission,
  Survey,
} from '../types';

// Update according to your app's needed collections
export const SURVEY_COLLECTION_ID = 'Survey';
export const CHECKOUT_SUBMISSIONS_COLLECTION_ID =
  'survey-boost-checkout-submissions';
export const TenPercentOffCoupon: SubmissionCoupon = {
  type: CouponType.PERCENT_OFF_AMOUNT,
  amount: 10,
};
export const DEFAULT_SURVEY: Survey = {
  questions: [
    {
      id: '1',
      type: QuestionType.SHORT_ANSWER,
      text: 'What made you decide to purchase from us today?',
    },
    {
      id: '2',
      type: QuestionType.SHORT_ANSWER,
      text: 'How can we improve your shopping experience in the future?',
    },
    {
      id: '3',
      type: QuestionType.SHORT_ANSWER,
      text: 'What feature or product would you like to see in our store next?',
    },
  ],
  coupon: TenPercentOffCoupon,
};

export const DEFAULT_SUBMISSION: Submission = {
  answers: [
    { id: '1', text: 'I was bored' },
    {
      id: '2',
      text: 'Better prices',
    },
    {
      id: '3',
      text: 'not that interested',
    },
  ],
  purchaseFlowId: '9a0766aa-2a0d-4819-91e5-4a19049dc94b',
};
