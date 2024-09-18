import React, { useEffect, useState, type FC } from 'react';
import { Layout } from '@wix/design-system';
import { httpClient } from '@wix/essentials';
import { Submission, Survey } from '../../../types';
import '@wix/design-system/styles.global.css';
import { SurveySubmission } from './survey-submission';

export interface ResponsesTabProps {
  survey?: Survey;
}

export const ResponsesTab: FC<ResponsesTabProps> = ({
  survey,
}: ResponsesTabProps) => {
  const [submissions, setSubmissions] = useState<Submission[]>();
  const isEmptyState = !submissions || submissions.length === 0;

  useEffect(() => {
    const fetchSubmissions = async () => {
      const res = await httpClient.fetchWithAuth(
        `${import.meta.env.BASE_API_URL}/checkout-submission`,
      );
      const data: Submission[] = await res.json();
      setSubmissions(data);
    };

    fetchSubmissions();
  }, []);

  return (
    <>
      {!isEmptyState && (
        <Layout gap={'24px'}>
          {submissions?.map((submission) => (
            <SurveySubmission
              questions={survey?.questions}
              answers={submission?.answers}
            />
          ))}
        </Layout>
      )}
    </>
  );
};
