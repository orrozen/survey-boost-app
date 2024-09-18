import React, { type FC } from 'react';
import { httpClient } from '@wix/essentials';
import { dashboard } from '@wix/dashboard';
import { Button } from '@wix/design-system';
import { GetStarted } from '@wix/wix-ui-icons-common';
import '@wix/design-system/styles.global.css';
import { Survey } from '../types';

export const SaveButton: FC<Survey> = (survey) => {
  return (
    <Button
      skin='light'
      onClick={async () => {
        try {
          await httpClient.fetchWithAuth(
            `${import.meta.env.BASE_API_URL}/survey`,
            {
              method: 'POST',
              body: JSON.stringify(survey),
            },
          );

          dashboard.showToast({
            message: 'Settings Updated Successfully',
            type: 'success',
          });
        } catch (error) {
          dashboard.showToast({
            message: 'Failed to Update Settings',
            type: 'error',
          });
        }
      }}
    >
      Save
    </Button>
  );
};
