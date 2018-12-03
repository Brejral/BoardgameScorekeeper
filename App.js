import React from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import Store from './data/Store';
import { observer } from 'mobx-react';
import GameScreen from './screens/GameScreen';
import PlayerInfoScreen from './screens/PlayerInfoScreen';
import NewPlayerSceeen from './screens/NewPlayerScreen';

const store = new Store();
window.store = store;

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

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
