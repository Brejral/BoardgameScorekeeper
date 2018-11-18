import React, { Component } from 'react';
import { ListView, View, Text, StatusBar } from 'react-native';
import { observer } from 'mobx-react';
import { COLORS } from '../constants/Constants';
import { createStackNavigator } from 'react-navigation';
import { Icon, ListItem } from 'react-native-elements';
import PlayerInfoScreen from './PlayerInfoScreen';
import NewPlayerSceeen from './NewPlayerScreen';

@observer class PlayersListScreen extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: 'Manage Players',
         headerStyle: {
            backgroundColor: COLORS.Players,
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
         <ListView
            dataSource={this.props.screenProps.store.playersDataSource}
            renderRow={(rowData) => {
               return (
                  <ListItem title={rowData.name} />
               );
            }}
            enableEmptySections={true}
         />
      );
   }
}

const PlayersNavigator = createStackNavigator({
   Players: {
      screen: PlayersListScreen
   },
   NewPlayer: {
      screen: NewPlayerSceeen
   },
   PlayerInfo: {
      screen: PlayerInfoScreen
   }
});

export default class PlayersScreen extends Component {
   static router = PlayersNavigator.router;
   render() {
      return (
         <PlayersNavigator navigation={this.props.navigation} screenProps={this.props.screenProps} />
      )
   }
}