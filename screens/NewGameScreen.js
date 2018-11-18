import React, { Component } from 'react';
import { ListView, View, StatusBar } from 'react-native';
import { observer } from 'mobx-react';
import { ListItem } from 'react-native-elements';
import { COLORS } from '../constants/Constants';

@observer class NewGameScreen extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: 'Game History',
         headerStyle: {
            backgroundColor: COLORS.Games,
         },
         headerTitleStyle: {
            color: COLORS.Text1
         },
      }
   };
   render() {
      return (
         <View>
            <StatusBar barStyle='light-content' />
            <ListView
               dataSource={this.props.screenProps.store.gameInfoDataSource}
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

export default NewGameScreen;