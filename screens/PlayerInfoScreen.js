import React from 'react';
import { observer } from 'mobx-react';
import { View } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import { observable } from 'mobx';
import { COLORS } from '../constants/Constants';

@observer class PlayerInfoScreen extends React.Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: 'Player Info',
         headerStyle: {
            backgroundColor: COLORS.Players,
         },
         headerTitleStyle: {
            color: COLORS.Text1
         },
         headerRight: (<Icon name='trash' type='font-awesome' onPress={navigation.getParam('deletePlayer')} iconStyle={{ color: COLORS.Text1, marginRight: 10 }} />)
      }
   };

   constructor() {
      super();

      this.deletePlayer = this.deletePlayer.bind(this);
   }

   componentWillMount() {
      this.props.navigation.setParams({ deletePlayer: this.deletePlayer });
   }

   deletePlayer() {
      this.isConfirmDelete = false;
      this.props.screenProps.store.deletePlayer(this.props.navigation.getParam('player'));
      this.props.navigation.navigate({ routeName: 'Players' })
   }

   render() {
      let player = this.props.navigation.getParam('player');
      return (
         <View>
            <Text h1>{player.name}</Text>

         </View>
      );
   }

}

export default PlayerInfoScreen;
