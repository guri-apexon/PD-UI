import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent,waitFor } from '@testing-library/react';
import { useHistory } from "react-router-dom";
import NavigationBar from 'apollo-react/components/NavigationBar';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';

test('renders learn react link', async () => {
  const { getByText, debug } = render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
    expect(getByText(/Dashboard/i)).toBeInTheDocument();
    expect(getByText(/protocol/i)).toBeInTheDocument();
    expect(getByText(/search/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Dashboard/i));
    // await waitFor();
});
