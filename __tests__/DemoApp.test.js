// DemoApp.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../store/store';

import { useAddNewPostMutation } from '../services/GetApiCall';
import DemoApp from '../src/DemoApp';
import { fetchProducts } from '../api/FetchPorudcts';

// Mock the useAddNewPostMutation hook
jest.mock('../services/GetApiCall', () => ({
  ...jest.requireActual('../services/GetApiCall'),
  useAddNewPostMutation: jest.fn(),
}));

describe('DemoApp Component', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <DemoApp />
      </Provider>,
    );

    expect(getByText('Api Call')).toBeTruthy();
    expect(getByText('Add New Post')).toBeTruthy();
  });

  it('should dispatch fetchProducts action when "Api Call" is pressed', () => {
    const { getByText } = render(
      <Provider store={store}>
        <DemoApp />
      </Provider>,
    );

    fireEvent.press(getByText('Api Call'));

    //fetchProducts action was dispatched
    const actions = store.getActions();
    expect(actions).toContainEqual(fetchProducts());
  });

  it('should call addNewPost when "Add New Post" is pressed', async () => {
    const mockAddNewPost = jest.fn().mockResolvedValue({ data: {} });
    useAddNewPostMutation.mockReturnValue([mockAddNewPost, {}]);

    const { getByText } = render(
      <Provider store={store}>
        <DemoApp />
      </Provider>,
    );

    fireEvent.press(getByText('Add New Post'));

    await waitFor(() => {
      expect(mockAddNewPost).toHaveBeenCalledWith({
        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic',
      });
    });
  });
});
