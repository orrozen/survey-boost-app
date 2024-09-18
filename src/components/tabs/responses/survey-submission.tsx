import React, { type FC } from 'react';
import { Card, Cell, Layout, Text } from '@wix/design-system';
import { Answer, Question } from '../../../types';
import '@wix/design-system/styles.global.css';

export interface SurveySubmissionsProps {
  questions?: Question[];
  answers?: Answer[];
}

export const SurveySubmission: FC<SurveySubmissionsProps> = ({
  questions,
  answers,
}: SurveySubmissionsProps) => {
  return (
    <Card>
      <Card.Content>
        {questions?.map((question) => {
          const answer = answers?.find((answer) => answer.id === question.id);
          return (
            <Layout gap={'6px'} key={question.id}>
              <Cell span={12}>
                <Text>{question.text}</Text>
                <Text weight='bold'>{answer?.text}</Text>
              </Cell>
            </Layout>
          );
        })}
      </Card.Content>
    </Card>
  );
};
