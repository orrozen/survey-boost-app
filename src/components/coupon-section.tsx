import React, { type FC } from 'react';
import { Question } from '../types';
import { SurveyQuestion } from './question';
import '@wix/design-system/styles.global.css';

export interface CouponSectionProps {
  questions: Question[];
}

export const CouponSection: FC<CouponSectionProps> = ({
  questions,
}: CouponSectionProps) => {
  return (
    <>
      {questions.length > 0
        ? questions.map((question) => (
            <SurveyQuestion key={question.id} question={question} />
          ))
        : null}
    </>
  );
};
