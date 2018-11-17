import React from 'react';
import { observer } from 'mobx-react';
import { View, StatusBar } from 'react-native';
import { FormInput, FormLabel, Button, FormValidationMessage } from 'react-native-elements';
import { COLORS } from '../constants/Constants';
import { observable } from 'mobx';

@observer class NewPlayerSceeen extends React.Component {
   @observable firstName = '';
   @observable lastName = '';

   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: 'New Player',
         headerStyle: {
            backgroundColor: COLORS.Players,
         },
         headerTitleStyle: {
            color: COLORS.Text1
         }
      }
   };

   constructor() {
      super();

      this.onFirstNameTextChange = this.onFirstNameTextChange.bind(this);
      this.onLastNameTextChange = this.onLastNameTextChange.bind(this);
      this.onCreateButtonPress = this.onCreateButtonPress.bind(this);
   }

   onFirstNameTextChange(text) {
      this.firstName = text;
   }

   onLastNameTextChange(text) {
      this.lastName = text;
   }

   onCreateButtonPress() {
      this.props.screenProps.store.createPlayer(this.firstName, this.lastName);
      this.props.navigation.navigate({ routeName: 'Players' });
   }

   render() {
      return (
         <View style={{ flex: 1 }}>
            <FormLabel>First Name</FormLabel>
            <FormInput onChangeText={this.onFirstNameTextChange} />
            <FormValidationMessage>{!this.firstName && 'Required'}</FormValidationMessage>
            <FormLabel>Last Name</FormLabel>
            <FormInput onChangeText={this.onLastNameTextChange} />
            <FormValidationMessage>{!this.lastName && 'Required'}</FormValidationMessage>
            <Button title='Create' style={{ marginTop: 10 }} icon={{ type: 'add' }} onPress={this.onCreateButtonPress} />
         </View>
      );
   }
}

export default NewPlayerSceeen;
