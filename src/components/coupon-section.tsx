import React, { useState, type FC } from 'react';
import { CouponType, SubmissionCoupon } from '../types';
import '@wix/design-system/styles.global.css';
import {
  Card,
  Cell,
  FormField,
  Layout,
  SegmentedToggle,
  Input,
  NumberInput,
} from '@wix/design-system';
import { Discount, Payment, Shipping } from '@wix/wix-ui-icons-common';

export interface CouponSectionProps {
  coupon?: SubmissionCoupon;
}

export const CouponSection: FC<CouponSectionProps> = ({
  coupon,
}: CouponSectionProps) => {
  const [couponValue, setCouponValue] = useState(
    coupon?.amount.toString() ?? '',
  );

  return (
    <Card>
      <Card.Header
        title='Coupon'
        subtitle='Give discounts to boost survey completion and increase sales.'
      />
      <Card.Content>
        <Layout gap='12px'>
          <Cell span={12}>
            <SegmentedToggle
              defaultSelected={coupon?.type ?? CouponType.MONEY_OFF_AMOUNT}
            >
              <SegmentedToggle.Button
                prefixIcon={<Payment />}
                value={CouponType.MONEY_OFF_AMOUNT}
              >
                Amount off
              </SegmentedToggle.Button>
              <SegmentedToggle.Button
                prefixIcon={<Discount />}
                value={CouponType.PERCENT_OFF_AMOUNT}
              >
                Percentage Off
              </SegmentedToggle.Button>
              <SegmentedToggle.Button
                prefixIcon={<Shipping />}
                value={CouponType.FREE_SHIPPING}
              >
                Free shipping
              </SegmentedToggle.Button>
            </SegmentedToggle>
          </Cell>
          <Cell span={12}>
            <FormField label='Discount' stretchContent={false}>
              <NumberInput
                suffix={<Input.Affix>$</Input.Affix>}
                value={couponValue}
                onChange={(numberValue, stringValue) =>
                  setCouponValue(stringValue)
                }
              />
            </FormField>
          </Cell>
        </Layout>
      </Card.Content>
    </Card>
  );
};
