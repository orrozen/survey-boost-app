import { auth } from '@wix/essentials';
import { items } from '@wix/data';
import { checkout } from '@wix/ecom';
import { CHECKOUT_SUBMISSIONS_COLLECTION_ID } from '../../consts';
import { coupons } from "@wix/marketing";


coupons.onCouponApplied(({data}) => {
  auth.elevate(coupons.deleteCoupon)(data.coupon?._id ?? '')
})