import React, { Component } from 'react';
import { ListView, View, Text, StatusBar } from 'react-native';
import { observer } from 'mobx-react';
import { COLORS } from '../constants/Constants';
import { createStackNavigator } from 'react-navigation';
import { Icon, ListItem } from 'react-native-elements';

@observer class PlayersScreen extends Component {
   constructor() {
      super();

      this.onPlayerItemPressed = this.onPlayerItemPressed.bind(this);
   }

   addPlayerPressed() {
      this.props.navigation.navigate({ routeName: 'NewPlayer' });
   }

   onPlayerItemPressed(player) {
      this.props.navigation.navigate({
         routeName: 'PlayerInfo',
         params: {
            player: player
         }
      });
   }

   render() {
      return (
         <ListView
            dataSource={this.props.screenProps.store.playersDataSource}
            renderRow={(player) => {
               return (
                  <ListItem title={player.name} onPress={() => this.onPlayerItemPressed(player)} />
               );
            }}
            enableEmptySections={true}
         />
      );
   }
}

export default PlayersScreen;