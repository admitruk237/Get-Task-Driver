import { Preview } from '@storybook/react';
import { ReduxStoreProviderDecorator } from '../src/stories/ReduxStoreProviderDecorator';

export const decorators = [ReduxStoreProviderDecorator];

export const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};
