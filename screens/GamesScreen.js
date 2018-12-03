import React, { Component } from 'react';
import { ListView, View, Text, StatusBar } from 'react-native';
import { observer } from 'mobx-react';
import { COLORS } from '../constants/Constants';
import { createStackNavigator } from 'react-navigation';
import { Icon, ListItem } from 'react-native-elements';
import GameSelectScreen from './GameSelectScreen';

@observer class GamesScreen extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: 'Game History',
         headerStyle: {
            backgroundColor: COLORS.Games,
         },
         headerTitleStyle: {
            color: COLORS.Text1
         },
         headerRight: (<Icon name='add' onPress={navigation.getParam('addGamePressed')} iconStyle={{ color: COLORS.Text1, marginRight: 10 }} />)
      }
   };

   constructor() {
      super();

      this.addGamePressed = this.addGamePressed.bind(this);
   }

   componentWillMount() {
      this.props.navigation.setParams({ addGamePressed: this.addGamePressed });
   }

   addGamePressed() {
      this.props.navigation.navigate({ routeName: 'GameSelect' });
   }

   render() {
      return (
         <View>
            <StatusBar barStyle='light-content' />
            <ListView
               dataSource={this.props.screenProps.store.gamesDataSource}
               renderRow={(rowData) => {
                  return (
                     <ListItem title={rowData.name} />
                  );
               }}
               enableEmptySections={true}
            />
         </View>
      );
   }
}

export default GamesScreen;
