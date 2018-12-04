import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { observer } from 'mobx-react';
import { ListItem, List } from 'react-native-elements';

@observer class GameSelectScreen extends Component {

   constructor() {
      super();

      this.onGameTypeSelect = this.onGameTypeSelect.bind(this);
   }

   onGameTypeSelect(game) {
      this.props.navigation.navigate({ routeName: 'Game', params: { gameInfo: game } })
   }

   render() {
      return (
         <View style={{ flex: 1 }}>
            <StatusBar barStyle='light-content' />
            <List>
               {this.props.screenProps.store.sortedGameInfo.map((game) => {
                  return (
                     <ListItem key={game.name + 'Item'} title={game.name} onPress={() => this.onGameTypeSelect(game)} />
                  );
               })}
            </List>
         </View>
      );
   }
}

export default GameSelectScreen;