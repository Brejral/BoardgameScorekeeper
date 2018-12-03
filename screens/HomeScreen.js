import React from 'react';
import { Button, Icon } from 'react-native-elements';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import GamesScreen from './GamesScreen';
import PlayersScreen from './PlayersScreen';
import { withNavigation } from 'react-navigation';
import { COLORS } from '../constants/Constants';
import { observer } from 'mobx-react';

const TabNavigator = createMaterialBottomTabNavigator(
   {
      Games: {
         screen: GamesScreen,
         title: 'Games',
         navigationOptions: {
            tabBarColor: COLORS.Games,
            tabBarIcon: ({ tintColor }) => (<Icon name='list' type='font-awesome' iconStyle={{ color: tintColor }} />)
         }
      },
      Players: {
         screen: PlayersScreen,
         title: 'Players',
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
         headerRight: (<Icon name='add' onPress={navigation.getParam('addPlayerPressed')} iconStyle={{ color: COLORS.Text1, marginRight: 10 }} />)
      }
   };

   constructor() {
      super();

      this.addPlayerPressed = this.addPlayerPressed.bind(this);
   }

   componentWillMount() {
      this.props.navigation.setParams({ addPlayerPressed: this.addPlayerPressed });
   }

   addPlayerPressed() {
      this.props.navigation.navigate({ routeName: 'NewPlayer' });
   }

   render() {
      return (
         <TabNavigator navigation={this.props.navigation} screenProps={this.props.screenProps} />
      );
   }
}
