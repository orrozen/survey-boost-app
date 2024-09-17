import { upsertDataToCollection, safelyGetItemFromCollection } from '../../database';
import { CHECKOUT_SUBMISSIONS_COLLECTION_ID } from '../../consts';

export async function GET(req: Request) {
  const purchaseFlowId = new URL(req.url).searchParams.get('purchaseFlowId') as string;
  const checkoutData = await safelyGetItemFromCollection({
    itemId: purchaseFlowId,
    dataCollectionId: CHECKOUT_SUBMISSIONS_COLLECTION_ID,
  });

  return new Response(JSON.stringify(checkoutData ?? {}));
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

    // 
    return new Response('Success');
  } catch (error) {
    console.log(error)
    return new Response('Error')
  };
};
