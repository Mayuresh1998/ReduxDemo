import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DemoApp from './src/DemoApp';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <DemoApp />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
