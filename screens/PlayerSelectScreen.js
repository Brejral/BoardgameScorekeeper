import React, { Component } from 'react';
import { View, StatusBar, PickerIOS } from 'react-native';
import { observer } from 'mobx-react';
import { ListItem, Button } from 'react-native-elements';
import { COLORS } from '../constants/Constants';

@observer class PlayerSelectScreen extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: 'Select Players',
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

   onGameTypeSelect() {

   }

   render() {
      return (
         <View>
            <StatusBar barStyle='light-content' />
            <Button title='Start Game' />
         </View>
      );
   }
}

export default PlayerSelectScreen;