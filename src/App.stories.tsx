import { MemoryRouter } from 'react-router-dom';
import { App } from './App';

export default {
  title: 'App Component',
  component: App,
  decorators: [
    (Story: any) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const AppBaseExample = () => {
  return <App />;
};
