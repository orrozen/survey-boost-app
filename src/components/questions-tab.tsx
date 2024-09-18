import React, { type FC } from 'react';
import { Survey } from '../types';
import '@wix/design-system/styles.global.css';
import { QuestionsSection } from './questions-section';
import { CouponSection } from './coupon-section';
import { Box, Cell, Layout } from '@wix/design-system';

export interface QuestionsTabProps {
  survey?: Survey;
  isInAddNewState: boolean;
  setIsInAddNewState: React.Dispatch<React.SetStateAction<boolean>>;
  addNewDisabled: boolean;
  setAddNewDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const QuestionsTab: FC<QuestionsTabProps> = ({
  survey,
  isInAddNewState,
  setIsInAddNewState,
  addNewDisabled,
  setAddNewDisabled,
}: QuestionsTabProps) => {
  return (
    <Layout gap={'24px'}>
      <Cell span={12}>
        <CouponSection coupon={survey?.coupon} />
      </Cell>
      <Cell span={12}>
        <QuestionsSection
          survey={survey}
          isInAddNewState={isInAddNewState}
          setIsInAddNewState={setIsInAddNewState}
          addNewDisabled={addNewDisabled}
          setAddNewDisabled={setAddNewDisabled}
        />
      </Cell>
    </Layout>
  );
};
