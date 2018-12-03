import React, { Component } from 'react';
import { ListView, View, Dimensions } from 'react-native';
import { observer } from 'mobx-react';
import { ListItem, Text, Divider } from 'react-native-elements';
import { COLORS } from '../constants/Constants';

@observer class GameSelectBox extends Component {
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
      let dim = Dimensions.get('window');
      return (
         <View style={{
            position: 'relative',
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: '#ddd',
            width: dim.width - 40,
            height: dim.height - 300,
            display: this.props.show ? null : 'none',
            borderRadius: 10,
            borderWidth: 2,
            left: 20,
            top: 20,
            borderColor: 'black'
         }}>
            <Text>Select Game</Text>
            <Divider style={{ backgroundColor: '#111', width: '96%', margin: '2%' }} />
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

export default GameSelectBox;