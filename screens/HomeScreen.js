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

@observer export default class HomeScreen extends React.Component {
   static router = TabNavigator.router;
   static navigationOptions = () => {
      return {
         header: null
      }
   };

   render() {
      return (
         <TabNavigator navigation={this.props.navigation} screenProps={this.props.screenProps} />
      );
   }
}
