import React from 'react';
import { observer } from 'mobx-react';
import { View, TextInput } from 'react-native';
import { COLORS } from '../constants/Constants';
import { Avatar, Icon, Text, Divider, List, ListItem, FormInput } from 'react-native-elements';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { observable } from 'mobx';
import Game from '../data/Game';

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

   @observable currentPlayerSelected = null;

   constructor() {
      super();

      this.getPlayerList = this.renderPlayerCol.bind(this);
      this.getScoreGrid = this.renderScoreGrid.bind(this);
      this.getTotalColumn = this.renderTotalCol.bind(this);
      this.onScoreChange = this.onScoreChange.bind(this);
      this.onScoreEndEditing = this.onScoreEndEditing.bind(this);
   }

   componentWillMount() {
      this.game = new Game({ gameInfo: this.props.navigation.getParam('gameInfo'), id: this.props.screenProps.store.games.length + 1 });
      for (let i = 0; i < this.game.gameInfo.minPlayers; i++) {
         this.game.addPlayer({ isPhantom: true });
      }
   }

   onPlayerItemSelected(player, index) {
      this.game.replacePlayer(this.game.players[this.currentPlayerSelected], player);
      this.currentPlayerSelected = null;
   }

   onPlayerAvatarPressed(index) {
      this.currentPlayerSelected = index;
   }

   onScoreChange(player, index, text) {
      player.setTempScore(index, text);
   }

   onScoreEndEditing(player, index) {
      let text = player.tempScores[index];
      if (text === null) {
         player.setScore(index, text);
         return;
      }
      let number = Number.parseInt(text);
      let scoreCol = this.game.gameInfo.scoreCols[index];
      if (number !== NaN && (scoreCol.min === undefined || number >= scoreCol.min) && (scoreCol.max === undefined || number <= scoreCol.max)) {
         player.setScore(index, number);
      } else {
         player.setScore(index, scoreCol.default || 0);
      }
   }

   renderPlayerCol() {
      return this.game.players.map((player, index) => {
         return (
            <Row
               key={'Player' + index}
               style={{
                  height: this.game.gameInfo.gridRowHeight,
                  borderWidth: this.game.gameInfo.gridBorderWidth,
                  borderColor: this.game.gameInfo.gridBorderColor,
                  justifyContent: 'center'
               }}
            >
               {player.getAvatar({
                  rounded: true,
                  medium: true,
                  style: {
                     alignSelf: 'center'
                  },
                  onPress: () => { this.onPlayerAvatarPressed(index) }
               })}
            </Row>
         );
      });
   }


   renderScoreGrid() {
      return this.game.gameInfo.scoreCols.map((col, index) => {
         return (
            <Col key={'PlayerScoreCol' + index} style={{ width: this.game.gameInfo.gridColWidth }}>
               {this.game.players.map((player, ind) => {
                  return (
                     <Row
                        key={'Player' + ind + 'ScoreRow'}
                        style={{
                           height: this.game.gameInfo.gridRowHeight,
                           borderWidth: this.game.gameInfo.gridBorderWidth,
                           borderColor: this.game.gameInfo.gridBorderColor,
                           justifyContent: 'center'
                        }} >
                        {!player.isPhantom &&
                           <TextInput
                              style={{ width: '100%', textAlign: 'center' }}
                              keyboardType='numeric'
                              onChangeText={(text) => this.onScoreChange(player, index, text)}
                              onEndEditing={(text) => this.onScoreEndEditing(player, index, text)}
                              value={player.tempScores[index].toString()}
                           />
                        }
                     </Row>
                  );
               })}
            </Col>
         );
      });
   }

   renderPlayerSelect() {
      if (this.currentPlayerSelected === null) return null;
      return (
         <View
            style={{
               position: 'absolute',
               justifyContent: 'center',
               alignContent: 'center',
               backgroundColor: 'black',
               borderWidth: 2,
               elevation: 5,
               top: '10%',
               left: '20%',
               width: 200,
               zIndex: 999,
               shadowColor: '#ccc',
               shadowOffset: { width: 10, height: 10 }
            }}>
            <List>
               {this.props.screenProps.store.players.filter(player => !this.game.playerIds[player.id]).map((player, index) => {
                  return (
                     <ListItem
                        key={'Player' + index + 'SelectItem'}
                        title={player.name}
                        onPress={() => this.onPlayerItemSelected(player, index)}
                        hideChevron />
                  );
               })}
            </List>

         </View>
      );
   }

   renderTotalCol() {
      return (
         <View>
            {this.game.players.map((player, index) => {
               return (
                  <Row
                     key={'Player' + index + 'TotalScore'}
                     style={{
                        height: this.game.gameInfo.gridRowHeight,
                        borderWidth: this.game.gameInfo.gridBorderWidth,
                        borderColor: this.game.gameInfo.gridBorderColor,
                        justifyContent: 'center'
                     }}>
                     {!player.isPhantom && <Text style={{ width: '100%', alignSelf: 'center', textAlign: 'center' }}>{player.totalScore}</Text>}
                  </Row>
               );
            })}
         </View>
      )
   }

   getHeader(header) {
      if (!header) return;
      let { type, ...props } = header;
      switch (type) {
         case 'View':
            return <View {...props} />;
      }
   }

   render() {
      if (this.game.gameInfo.horizontal) {
         return (
            <Grid style={{ backgroundColor: '#eee' }}>
               <Row style={{ height: 40, marginTop: 20, }}>
                  <Col
                     size={1}
                     style={{
                        justifyContent: 'center',
                        backgroundColor: this.game.gameInfo.gridHeaderBackgroundColor,
                        borderWidth: this.game.gameInfo.gridBorderWidth,
                        borderColor: this.game.gameInfo.gridBorderColor,
                     }}>
                     <Text style={{ textAlign: 'center', color: this.game.gameInfo.gridHeaderTextColor }}>Players</Text>
                  </Col>
                  {this.game.gameInfo.scoreCols.map(col => {
                     return (
                        <Col
                           key={'Header' + col.name}
                           style={{
                              width: this.game.gameInfo.gridColWidth,
                              justifyContent: 'center',
                              alignContent: 'center',
                              backgroundColor: this.game.gameInfo.gridHeaderBackgroundColor,
                              borderWidth: this.game.gameInfo.gridBorderWidth,
                              borderColor: this.game.gameInfo.gridBorderColor,
                           }}>
                           {this.getHeader(col.header) || <Text style={{ textAlign: 'center', color: this.game.gameInfo.gridHeaderTextColor }}>{col.name}</Text>}
                        </Col>
                     );
                  })}
                  <Col
                     size={1}
                     style={{
                        justifyContent: 'center',
                        backgroundColor: this.game.gameInfo.gridHeaderBackgroundColor,
                        borderWidth: this.game.gameInfo.gridBorderWidth,
                        borderColor: this.game.gameInfo.gridBorderColor,
                     }}>
                     <Text style={{ textAlign: 'center', color: this.game.gameInfo.gridHeaderTextColor }}>Totals</Text>
                  </Col>
               </Row>
               <Row>
                  <Col size={1} style={{ alignContent: 'center' }}>
                     {this.renderPlayerCol()}
                  </Col>
                  {this.renderScoreGrid()}
                  <Col size={1}>
                     {this.renderTotalCol()}
                  </Col>
               </Row>
               {this.renderPlayerSelect()}
            </Grid>
         );
      }
   }
}

export default GameScreen;
