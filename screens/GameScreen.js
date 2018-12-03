import React from 'react';
import { observer } from 'mobx-react';
import { View, ScrollView } from 'react-native';
import PlayerSelectBox from '../components/PlayerSelectBox'
import { COLORS } from '../constants/Constants';

@observer class GameScreen extends React.Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: navigation.getParam('game').name,
         headerStyle: {
            backgroundColor: COLORS.Games,
         },
         headerTitleStyle: {
            color: COLORS.Text1
         }
      };
   }

   constructor() {
      super();


   }

   render() {
      return (
         <ScrollView>
            <ScrollView horizontal>
            </ScrollView>
            <PlayerSelectBox />
         </ScrollView>

      );
   }
}

export default GameScreen;
