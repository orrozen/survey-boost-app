import { getDataFromCollection, upsertDataToCollection } from '../../database';
import { SURVEY_COLLECTION_ID, DEFAULT_SURVEY } from '../../consts';
import type { Survey } from '../../../types';

export async function GET(req: Request) {
  const surveyCollection = await getDataFromCollection({
    dataCollectionId: SURVEY_COLLECTION_ID,
  });

  const SurveyContent = surveyCollection.items[0]?.data as Survey;
  const Survey: Survey = {
    question1: SurveyContent.question1 || DEFAULT_SURVEY.question1,
    question2: SurveyContent.question2 || DEFAULT_SURVEY.question2,
    question3: SurveyContent.question3 || DEFAULT_SURVEY.question3,
    coupon: SurveyContent.coupon || DEFAULT_SURVEY.coupon,
  };

  return new Response(JSON.stringify(Survey));
};

export async function POST(req: Request) {
  const SurveyContent = await req.json() as Survey;

  try {
    await upsertDataToCollection({
      dataCollectionId: SURVEY_COLLECTION_ID,
      item: {
        // Wix data collection can be initialized as a "single item" that has the same ID
        _id: 'Survey',
        data: SurveyContent,
      },
    });

    return new Response('Success');
  } catch (error) {
    return new Response('Error');
  };
};
