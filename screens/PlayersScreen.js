import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { List, ListItem } from 'react-native-elements';

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
         <List>
            {this.props.screenProps.store.sortedPlayers.map((player) => {
               return (
                  <ListItem key={player.name + 'Item'} title={player.name} onPress={() => this.onPlayerItemPressed(player)} />
               );
            })}
         </List>
      );
   }
}

export default PlayersScreen;