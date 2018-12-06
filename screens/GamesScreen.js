import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { observer } from 'mobx-react';
import { COLORS } from '../constants/Constants';
import { List, ListItem } from 'react-native-elements';
import GameSelectBox from './GameSelectScreen';

@observer class GamesScreen extends Component {

   constructor() {
      super();
   }

   render() {
      return (
         <List>
            {this.props.screenProps.store.games.map((rowData) => {
               return (
                  <ListItem title={rowData.name} />
               );
            })}
         </List>
      );
   }
}

export default GamesScreen;
