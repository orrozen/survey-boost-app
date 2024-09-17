import React, { useEffect, useState, type FC } from 'react';
import { httpClient } from '@wix/essentials';
import {
  Box,
  Card,
  Cell,
  Layout,
  Loader,
  Page,
  WixDesignSystemProvider,
} from '@wix/design-system';
import { MainButton } from '../../components/main-button';
import { PluginPreview } from '../../components/plugin-preview';
import { SettingsForm } from '../../components/settings-form';
import type { Survey } from '../../types';
import '@wix/design-system/styles.global.css';

const Index: FC = () => {
  const [survey, setSurvey] = useState<Survey>()

  useEffect(() => {
    const fetchSettings = async () => {
      const res = await httpClient.fetchWithAuth(`${import.meta.env.BASE_API_URL}/survey`);
      const data: Survey = (await res.json());
      setSurvey(data);
    };

    fetchSettings();
  }, []);


  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      {!survey ? (
        <Box
          height='100vh'
          align='center'
          verticalAlign='middle'
        >
          <Loader />
        </Box>
      ) : (
        <Page height='100vh'>
          <Page.Header
            title="AAA"
            subtitle="Let your customers balance the carbon footprint of their order."
            actionsBar={
              <MainButton {...survey} />
            }
          />
          <Page.Content>
            <Layout>
              <Cell span={4}>
                <Card stretchVertically>
                  <Card.Header
                    title="Survey"
                    subtitle="This appears on your checkout page."
                  />
                  <Card.Divider />
                  <Card.Content>
                    <SettingsForm
                      survey={survey}
                      setSurvey={setSurvey}
                    />
                  </Card.Content>
                </Card>
              </Cell>
              <Cell span={8}>
                <Card>
                  <Card.Header
                    title="Preview"
                    subtitle="This is how your plugin will look like."
                  />
                  <Card.Divider />
                  <Card.Content>
                    <PluginPreview {...survey} />
                  </Card.Content>
                </Card>
              </Cell>
            </Layout>
          </Page.Content>
        </Page>
      )}
    </WixDesignSystemProvider >
  );
};

export default Index;
