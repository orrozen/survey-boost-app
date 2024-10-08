import React, { type FC } from 'react';
import { Survey } from '../../../types';
import { Button, Card, EmptyState, TextButton } from '@wix/design-system';
import { Add } from '@wix/wix-ui-icons-common';
import { AddQuestionIllustration } from './add-question-illustration';
import { Questions } from './questions';
import { SurveyQuestion } from './question';
import '@wix/design-system/styles.global.css';

export interface QuestionsSectionProps {
  survey?: Survey;
  isInAddNewState: boolean;
  setIsInAddNewState: React.Dispatch<React.SetStateAction<boolean>>;
  addNewDisabled: boolean;
  setAddNewDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const QuestionsSection: FC<QuestionsSectionProps> = ({
  survey,
  isInAddNewState,
  setIsInAddNewState,
  addNewDisabled,
  setAddNewDisabled,
}: QuestionsSectionProps) => {
  const has3Questions = survey?.questions?.length === 3;
  const isEmptyState =
    (!survey || !survey.questions || survey.questions.length === 0) &&
    !isInAddNewState;

  const addQuestionToggle = () => {
    if (!has3Questions) {
      setIsInAddNewState(true);
      setAddNewDisabled(true);
    }
  };

  return (
    <Card>
      <Card.Header
        title='Questions'
        subtitle='The questions you set here will be included in your survey in the summary of your checkout page.'
        suffix={
          <Button
            size='small'
            prefixIcon={<Add />}
            onClick={addQuestionToggle}
            disabled={addNewDisabled}
          >
            Add Question
          </Button>
        }
      />
      <Card.Divider />
      <Card.Content>
        {isInAddNewState && <SurveyQuestion />}
        {isEmptyState ? (
          <EmptyState
            theme='page'
            image={<AddQuestionIllustration />}
            title='You don’t have any questions yet'
            subtitle='Start adding question and collect data from your users'
          >
            {
              <TextButton
                prefixIcon={<Add />}
                onClick={addQuestionToggle}
                disabled={addNewDisabled}
              >
                Add Question
              </TextButton>
            }
          </EmptyState>
        ) : (
          <Questions questions={survey?.questions ?? []} />
        )}
      </Card.Content>
    </Card>
  );
};
