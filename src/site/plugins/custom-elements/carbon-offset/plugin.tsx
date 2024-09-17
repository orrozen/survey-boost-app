import React, { useEffect, useState, useMemo, type FC } from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import { httpClient } from '@wix/essentials';
import { checkout } from '@wix/ecom';
import { CarbonOffset } from '../../../../components/carbon-offset';
import { PluginSkeleton } from '../../../../components/plugin-skeleton/plugin-skeleton';

type Props = {
  checkoutId: string;
};

type CallbackFunction = () => void;

let refreshCheckout: CallbackFunction = () => {
  console.log("Checkout Refreshed");
};

const CustomElement: FC<Props> = (props) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [purchaseFlowId, setPurchaseFlowId] = useState<string>('');

  const checkoutId = useMemo(() => {
    return props.checkoutId && props.checkoutId.replaceAll('"', '');
  }, [props.checkoutId]);

  useEffect(() => {
    const fetchSettings = async () => {
      const settingsRes = await httpClient.fetchWithAuth(`${import.meta.env.BASE_API_URL}/settings`);
      return settingsRes.json();
    };

    const fetchData = async () => {
      const [settingsData, { purchaseFlowId }] = await Promise.all([fetchSettings(), checkout.getCheckout(checkoutId)]);
      const checkoutRes = await httpClient.fetchWithAuth(`${import.meta.env.BASE_API_URL}/checkout?purchaseFlowId=${purchaseFlowId}`);
      const checkoutData = await checkoutRes.json();

      setPurchaseFlowId(purchaseFlowId ?? '');
      setChecked(checkoutData.shouldAdd ?? false);
    };

    if (checkoutId) {
      fetchData();
    };
  }, [checkoutId]);

  return (
    <>
    </>
  );
};

const customElement = reactToWebComponent(
  CustomElement,
  React,
  ReactDOM as any,
  {
    props: {
      checkoutId: 'string',
    },
  }
);

// Not yet implemented
customElement.prototype.onRefreshCheckout = (callback: CallbackFunction) => {
  refreshCheckout = callback;
};

export default customElement;
