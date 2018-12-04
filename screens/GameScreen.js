import React from 'react';
import { observer } from 'mobx-react';
import { View, ScrollView } from 'react-native';
import { COLORS } from '../constants/Constants';
import { Avatar, Icon, Text, Divider, List } from 'react-native-elements';
import { observable } from 'mobx';
import Game from '../data/Game';
import Seperator from '../components/Seperator';

@observer class GameScreen extends React.Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: navigation.getParam('gameInfo').name,
         headerStyle: {
            backgroundColor: COLORS.Games,
         },
         headerTitleStyle: {
            color: COLORS.Text1
         }
      };
   }

   @observable game;

   @observable showPlayerSelect = true;

   constructor() {
      super();

      this.getPlayerList = this.renderPlayerCol.bind(this);
      this.getScoreGrid = this.renderScoreGrid.bind(this);
      this.getTotalColumn = this.renderTotalColumn.bind(this);
   }

   componentDidMount() {
      this.game = new Game({ gameInfo: this.props.navigation.getParam('gameInfo'), id: this.props.screenProps.store.games.length + 1 });
   }

   renderPlayerCol() {
      if (!this.game) { return []; }
      let avatars = [];

      for (let player in this.game.players) {
         avatars.push(
            <Avatar
               key={'Player' + (avatars.length + 1)}
               medium
               rounded
               title={player.firstName.substr(0, 1) + player.lastName.substr(0, 1)}
               titleStyle={{ color: COLORS.Text1 }}
               avatarStyle={{ margin: 10 }}
               overlayContainerStyle={{ borderWidth: 2, borderStyle: 'solid', borderColor: COLORS.Text1, backgroundColor: COLORS.Games }}
            />
         );
      }
      let i = avatars.length;
      while (i < this.game.gameInfo.minPlayers || (i < this.game.players.length + 1 && i < this.game.gameInfo.maxPlayers - 1)) {
         avatars.push(
            <Avatar
               key={'Player' + (avatars.length + 1)}
               medium
               rounded
               containerStyle={{ margin: 10 }}
               overlayContainerStyle={{ borderWidth: 2, borderStyle: 'dashed', borderColor: COLORS.EmptyText, backgroundColor: COLORS.EmptyBackground }}
               icon={{ name: 'plus', type: 'font-awesome', color: COLORS.EmptyText }}
            />
         )
         i++;
      }
      return avatars;
   }

   renderScoreHeaderRow() {
      let headers = [];
      for (let i = 0; i < this.game.gameInfo.scoreCols.length; i++) {
         let col = this.game.gameInfo.scoreCols[i];
         headers.push(<Text key={'Header' + col.name} style={{ textAlign: 'center' }}>{col.name}</Text>)
      }
      return headers;
   }

   renderScoreGrid() {
      if (!this.game) { return null; }
      return (
         <ScrollView horizontal style={{ flex: 1, borderWidth: 2 }}>
            <View style={{ flexDirection: 'row' }}>
               {this.renderScoreHeaderRow()}
            </View>
            <Seperator />
         </ScrollView>
      );
   }

   renderPlayerSelect() {
      if (!this.showPlayerSelect) return null;
      return (
         <View style={{
            position: 'absolute',
            justifyContent: 'center',
            alignContent: 'center',
            opacity: 0.3,
            backgroundColor: 'black',
            zIndex: 999,
            shadowColor: '#ccc',
            shadowOffset: { width: 2, height: 2 }
         }}>
            <List
               dataSource={this.props.screenProps.store.playersDataSource}
               renderRow={(player) => {
                  return (
                     <ListItem title={player.name} onPress={() => this.onPlayerItemPressed(player)} />
                  );
               }}
               enableEmptySections={true}
            />

         </View>
      );
   }

   renderTotalColumn() {

   }

   render() {
      return (
         <ScrollView alwaysBounceVertical={false} style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
               <View style={{}}>
                  <Text style={{ textAlign: 'center', flex: 1, fontSize: 16 }}>Players</Text>
                  <Seperator />
                  {this.renderPlayerCol()}
               </View>
               <Seperator vertical />
               {this.renderScoreGrid()}
            </View>
            {this.renderPlayerSelect()}
         </ScrollView >

      );
   }
}

export default GameScreen;
