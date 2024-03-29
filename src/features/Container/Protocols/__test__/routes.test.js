import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../../store/store';
import Routes from '../../../../Routes/routes';

describe('Routes component', () => {
  test('renders dashboard component for normal user', async () => {
    render(
      <Provider store={store}>
        <Routes userType="normal" />
      </Provider>,
      { wrapper: MemoryRouter },
    );
  });

  test('renders qc component for QC1 user', async () => {
    render(
      <Provider store={store}>
        <Routes userType="QC1" />
      </Provider>,
      { wrapper: MemoryRouter },
    );
  });
  test('renders qc component for QC2 user', async () => {
    render(
      <Provider store={store}>
        <Routes userType="QC2" />
      </Provider>,
      { wrapper: MemoryRouter },
    );
  });
  test('renders admin component for Admin user', async () => {
    render(
      <Provider store={store}>
        <Routes userType="admin" />
      </Provider>,
      { wrapper: MemoryRouter },
    );
  });
});
