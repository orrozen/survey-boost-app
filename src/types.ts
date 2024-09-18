export type Survey = {
  questions: Question[];
  coupon: SubmissionCoupon;
};

export type Question = {
  id: string;
  type: QuestionType;
  text: string;
};

export enum QuestionType {
  SHORT_ANSWER = 'Short Answer',
}

export interface SubmissionCoupon {
  type: CouponType;
  // To be used for percent off and money off
  amount: number;
}

export enum CouponType {
  FREE_SHIPPING = 'Free shipping',
  MONEY_OFF_AMOUNT = 'Amount off',
  PERCENT_OFF_AMOUNT = 'Percentage Off',
}

export type Submission = {
  purchaseFlowId: string;
  answers: Answer[];
};

export type Answer = {
  id: string;
  text: string;
};
