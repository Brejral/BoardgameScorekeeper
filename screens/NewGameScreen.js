import React, { Component } from 'react';
import { ListView, View, StatusBar } from 'react-native';
import { observer } from 'mobx-react';
import { ListItem } from 'react-native-elements';
import { GameInfo } from '../constants/GameInfo';

@observer class NewGameScreen extends Component {
   render() {
      return (
         <View>
            <StatusBar barStyle='light-content' />
            <ListView
               dataSource={GameInfo}
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