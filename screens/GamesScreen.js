import React, { Component } from 'react';
import { ListView, View, Text, StatusBar } from 'react-native';
import { observer } from 'mobx-react';
import { COLORS } from '../constants/Constants';
import { createStackNavigator } from 'react-navigation';
import { Icon, ListItem } from 'react-native-elements';

@observer class GamesListScreen extends Component {
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

const GamesNavigator = createStackNavigator({
   Games: {
      screen: GamesListScreen
   }
});

export default class GamesScreen extends Component {
   static router = GamesNavigator.router;
   render() {
      return (
         <GamesNavigator navigation={this.props.navigation} screenProps={this.props.screenProps} />
      )
   }
}