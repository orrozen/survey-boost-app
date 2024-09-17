import React, { type FC } from 'react';
import { httpClient } from '@wix/essentials';
import { LeafIcon } from './leaf-icon';
import type { Survey } from '../types'

type Props = {
  Survey: Survey;
  purchaseFlowId?: string;
  checkoutId?: string;
  checked?: boolean;
  refreshCheckout?: () => void;
};

export const CarbonOffset: FC<Props> = ({
  Survey,
  purchaseFlowId,
  checkoutId,
  checked = false,
  refreshCheckout,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <input
          type='checkbox'
          defaultChecked={checked}
          onChange={async (e) => {
            // We are using the same component both for rendering on site and for previewing in dashboard
            // so we make sure it does not do anything when changing / clicking things in preview
            if (purchaseFlowId) {
              await httpClient.fetchWithAuth(`${import.meta.env.BASE_API_URL}/checkout`, {
                method: 'POST',
                body: JSON.stringify({
                  purchaseFlowId,
                  checkoutId,
                  shouldAdd: e.target.checked,
                }),
              });

              // Known Issue: Refresh Checkout is not yet implemented in Custom Element plugins (Wix CLI)
              // to workaround it after using the plugin in the site - go out of the checkout and back again
              // in order for it to reload and call the relevant SPIs with you updated configurations
              refreshCheckout?.();
            };
          }}
        />
      </div>
    </div>
  );
};
