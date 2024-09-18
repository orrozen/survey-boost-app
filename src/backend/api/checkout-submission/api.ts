import { upsertDataToCollection, safelyGetItemFromCollection } from '../../database';
import { CHECKOUT_SUBMISSIONS_COLLECTION_ID, SURVEY_COLLECTION_ID } from '../../consts';
import { coupons } from "@wix/marketing";
import { getSurvey } from '../survey/api';
import { CouponType } from '../../../types';

export async function GET(req: Request) {
  const purchaseFlowId = new URL(req.url).searchParams.get('purchaseFlowId') as string;
  const checkoutData = await safelyGetItemFromCollection({
    itemId: purchaseFlowId,
    dataCollectionId: CHECKOUT_SUBMISSIONS_COLLECTION_ID,
  });

  return new Response(JSON.stringify(checkoutData ?? {}));
}

function generateRandomCouponCode(length: number = 20): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    code += charset[randomIndex];
  }
  return code;
}

async function generateCouponFromSurvey(): Promise<{ couponDetails: null; error: "Invalid coupon type" } | {
  couponDetails: null;
  error: "Failed to generate coupon"
} | {
  couponDetails: {
    amount: number;
    code: string | null | undefined;
    id: string;
    type: CouponType.PERCENT_OFF_AMOUNT | CouponType.MONEY_OFF_AMOUNT | CouponType.FREE_SHIPPING
  }, error: null
} | { couponDetails: null; error: "No coupon specification found in the survey" }> {
  try {
    const survey = await getSurvey();
    const { coupon } = survey;

    if (!coupon) {
      return { couponDetails: null, error: "No coupon specification found in the survey" };
    }

    let specification: coupons.Specification = {
      name: "Survey Completion Coupon",
      active: true,
      scope: {
        namespace: "ecommerce"
      },
      usageLimit: 1,
      code: generateRandomCouponCode()
    };

    switch (coupon.type) {
      case CouponType.PERCENT_OFF_AMOUNT:
        specification.percentOffRate = coupon.amount;
        break;
      case CouponType.MONEY_OFF_AMOUNT:
        specification.moneyOffAmount = coupon.amount;
        break;
      case CouponType.FREE_SHIPPING:
        specification.freeShipping = true;
        break;
      default:
        return { couponDetails: null, error: "Invalid coupon type" };
    }

    const createdCoupon = await coupons.createCoupon(specification);
    
    return {
      couponDetails: {
        id: createdCoupon._id,
        code: specification.code,
        type: coupon.type,
        amount: coupon.amount,
      }, error: null
    };
  } catch (error) {
    console.error("Error generating coupon:", error);
    return { couponDetails: null, error: "Failed to generate coupon" };
  }
}

export async function POST(req: Request) {
  const { purchaseFlowId, answer1, answer2, answer3 } = await req.json();

  try {
    await upsertDataToCollection({
      dataCollectionId: CHECKOUT_SUBMISSIONS_COLLECTION_ID,
      item: {
        _id: purchaseFlowId,
        data: {
          answer1, answer2, answer3
        },
      },
    });

    const { couponDetails, error } = await generateCouponFromSurvey();

    if (error) {
      return new Response(JSON.stringify({
        success: true,
        message: "Survey submitted successfully, but coupon generation failed",
        error: error
      }), {
        status: 207,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: "Survey submitted and coupon generated successfully",
      coupon: couponDetails
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Error processing survey submission:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Internal server error"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}