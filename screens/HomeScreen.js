import React from 'react';
import { Icon } from 'react-native-elements';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import GamesScreen from './GamesScreen';
import PlayersScreen from './PlayersScreen';
import GameSelectScreen from './GameSelectScreen';
import { COLORS } from '../constants/Constants';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

const TabNavigator = createMaterialBottomTabNavigator(
   {
      NewGame: {
         screen: GameSelectScreen,
         navigationOptions: {
            tabBarLabel: 'New Game',
            tabBarColor: COLORS.NewGame,
            tabBarIcon: ({ tintColor }) => (<Icon name='pencil-square-o' type='font-awesome' iconStyle={{ color: tintColor }} />)
         }
      },
      Games: {
         screen: GamesScreen,
         navigationOptions: {
            tabBarColor: COLORS.Games,
            tabBarIcon: ({ tintColor }) => (<Icon name='history' type='font-awesome' iconStyle={{ color: tintColor }} />)
         }
      },
      Players: {
         screen: PlayersScreen,
         navigationOptions: {
            tabBarColor: COLORS.Players,
            tabBarIcon: ({ tintColor }) => (<Icon name='users' type='font-awesome' iconStyle={{ color: tintColor }} />)
         }
      }
   },
   {
      shifting: true,
      inactiveTintColor: 'gray',
      activeTintColor: COLORS.Text1,
      barStyle: {
         fontSize: 20
      },
   }
);

const getHeaderTitle = (tab) => {
   switch (tab) {
      case 'NewGame':
         return 'Select Game';
      case 'Games':
         return 'Game History';
      case 'Players':
         return 'Manage Players';
   }
}

@observer export default class HomeScreen extends React.Component {
   static router = TabNavigator.router;
   static navigationOptions = ({ navigation }) => {
      let currentTab = navigation.state.routes[navigation.state.index].key;
      return {
         headerTitle: getHeaderTitle(currentTab),
         headerStyle: {
            backgroundColor: COLORS[currentTab],
         },
         headerTitleStyle: {
            color: COLORS.Text1
         },
         headerRight: currentTab === 'Players' ? (<Icon name='add' onPress={() => { navigation.getParam('addPressed')(currentTab) }} iconStyle={{ color: COLORS.Text1, marginRight: 10 }} />) : null
      }
   };

   @observable showSelectGameBox = false;

   constructor() {
      super();

      this.onAddPressed = this.onAddPressed.bind(this);
      this.addPlayer = this.addPlayer.bind(this);
   }

   componentWillMount() {
      this.props.navigation.setParams({ addPressed: this.onAddPressed });
   }

   onAddPressed(tab) {
      switch (tab) {
         case 'Games':
            this.showSelectGameBox = true;
            break;
         case 'Players':
            this.addPlayer();
            break;
      }

   }

   addPlayer() {
      this.props.navigation.navigate({ routeName: 'NewPlayer' });
   }

   render() {
      return (
         <TabNavigator navigation={this.props.navigation} screenProps={Object.assign(this.props.screenProps, { showSelectGameBox: this.showSelectGameBox })} />
      );
   }
}
