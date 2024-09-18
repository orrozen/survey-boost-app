import { auth } from '@wix/essentials';
import { collections } from '@wix/data';
import { appInstances } from '@wix/app-management';
import { CHECKOUT_SUBMISSIONS_COLLECTION_ID, SURVEY_COLLECTION_ID } from '../../consts';

appInstances.onAppInstanceInstalled(() => {
  auth.elevate(collections.createDataCollection)({
    _id: SURVEY_COLLECTION_ID,
    displayName: "Survey Boost",
    fields: [
      { key: 'question1', type: collections.Type.TEXT },
      { key: 'question2', type: collections.Type.TEXT },
      { key: 'question3', type: collections.Type.TEXT },
      { key: 'couponType', type: collections.Type.TEXT },
      { key: 'couponAmount', type: collections.Type.NUMBER },
    ],
    permissions: {
      insert: collections.Role.ADMIN,
      read: collections.Role.ADMIN,
      remove: collections.Role.ADMIN,
      update: collections.Role.ADMIN,
    },
    // Plugin for single item collection
    plugins: [{
      type: collections.PluginType.SINGLE_ITEM,
      singleItemOptions: {
        singleItemId: "SURVEY"
      },
    }],
  });

  auth.elevate(collections.createDataCollection)({
    _id: CHECKOUT_SUBMISSIONS_COLLECTION_ID,
    displayName: "Checkout Submission",
    fields: [
      // the actual _id for each item of this collection will be purchaseFlowId for easy fetching
      { key: 'answer1', type: collections.Type.TEXT },
      { key: 'answer2', type: collections.Type.TEXT },
      { key: 'answer3', type: collections.Type.TEXT },
    ],
    permissions: {
      insert: collections.Role.ANYONE,
      read: collections.Role.ADMIN,
      remove: collections.Role.ADMIN,
      update: collections.Role.ANYONE,
    },
  });
});
