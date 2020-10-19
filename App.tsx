import React from 'react';
import Main from './components/MainComponent';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/configureStore'; 
LogBox.ignoreLogs(['Remote debugger']);
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}