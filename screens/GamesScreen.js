import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { observer } from 'mobx-react';
import { COLORS } from '../constants/Constants';
import { List, ListItem } from 'react-native-elements';
import GameSelectBox from './GameSelectScreen';
const dateFormat = require('dateformat');

@observer class GamesScreen extends Component {

   constructor() {
      super();

      this.onGamePressed = this.onGamePressed.bind(this);
   }

   onGamePressed(game) {
      this.props.navigation.navigate({ routeName: 'Game', params: { game: game } })
   }

   render() {
      return (
         <ScrollView>
            <List >
               {this.props.screenProps.store.games.map((rowData) => {
                  return (
                     <ListItem
                        key={rowData.id}
                        title={rowData.gameInfo.name}
                        subtitle={dateFormat(rowData.date, 'mmm d, yyyy  h:MM TT')}
                        onPress={() => this.onGamePressed(rowData)}
                     />
                  );
               })}
            </List>
         </ScrollView>
      );
   }
}

export default GamesScreen;
