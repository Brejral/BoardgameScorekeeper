import React from 'react';
import { ActivityIndicator } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import Store from './data/Store';
import { observer } from 'mobx-react';
import GameScreen from './screens/GameScreen';
import PlayerInfoScreen from './screens/PlayerInfoScreen';
import NewPlayerSceeen from './screens/NewPlayerScreen';

const store = new Store();
window.store = store;

const RootStack = createStackNavigator({
   Home: {
      screen: HomeScreen
   },
   Game: {
      screen: GameScreen
   },
   NewPlayer: {
      screen: NewPlayerSceeen
   },
   PlayerInfo: {
      screen: PlayerInfoScreen
   }
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
