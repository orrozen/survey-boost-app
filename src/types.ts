export type Survey = {
  question1: string | undefined;
  question2: string | undefined;
  question3: string | undefined;
  coupon: Coupon;
}

export interface Coupon {
  type: CouponType
  // To be used for percent off and money off
  amount: number
}

export enum CouponType {
  FREE_SHIPPING,
  MONEY_OFF_AMOUNT,
  PERCENT_OFF_AMOUNT,
}

export type Submissions = {
  purchaseFlowId: string;
  answer1: string | undefined;
  answer2: string | undefined;
  answer3: string | undefined;
}