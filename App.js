import React from 'react';
import { ActivityIndicator } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import Store from './data/Store';
import { observer } from 'mobx-react';

const store = new Store();
window.store = store;

const RootStack = createStackNavigator({
   Home: {
      screen: HomeScreen
   },
});

@observer class App extends React.Component {
   render() {
      if (store.isLoading) {
         return (<ActivityIndicator size='large' />)
      }
      return (
         <RootStack screenProps={{ store: store }} />
      );
   }
}

export default App;
