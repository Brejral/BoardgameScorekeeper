import React, { Component } from 'react';
import { ListView, View, StatusBar } from 'react-native';
import { observer } from 'mobx-react';
import { ListItem } from 'react-native-elements';
import { COLORS } from '../constants/Constants';

@observer class GameSelectScreen extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: 'Select Game',
         headerStyle: {
            backgroundColor: COLORS.Games,
         },
         headerTitleStyle: {
            color: COLORS.Text1
         },
      }
   };

   constructor() {
      super();

      this.onGameTypeSelect = this.onGameTypeSelect.bind(this);
   }

   onGameTypeSelect(game) {
      this.props.navigation.navigate({ routeName: 'Game', params: { game: game } })
   }

   render() {
      return (
         <View>
            <ListView
               dataSource={this.props.screenProps.store.gameInfoDataSource}
               renderRow={(game) => {
                  return (
                     <ListItem title={game.name} onPress={() => this.onGameTypeSelect(game)} />
                  );
               }}
               enableEmptySections={true}
            />
         </View>
      );
   }
}

export default GameSelectScreen;