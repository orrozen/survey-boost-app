export type Survey = {
  question1: string | undefined;
  question2: string | undefined;
  question3: string | undefined;
  coupon: SubmissionCoupon;
}

export interface SubmissionCoupon {
  type: CouponType
  // To be used for percent off and money off
  amount: number
}

export enum CouponType {
  FREE_SHIPPING,
  MONEY_OFF_AMOUNT,
  PERCENT_OFF_AMOUNT,
}