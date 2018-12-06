import React from 'react';
import { observer } from 'mobx-react';
import { View, TextInput, ScrollView } from 'react-native';
import { COLORS } from '../constants/Constants';
import { Avatar, Icon, Text, Divider, List, ListItem, FormInput } from 'react-native-elements';
import { Grid } from 'react-native-easy-grid';
import { observable } from 'mobx';
import { Table, Row, Col, Cell, Cols } from 'react-native-table-component';
import Game from '../data/Game';

@observer class GameScreen extends React.Component {
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle: navigation.getParam('game') ? navigation.getParam('game').gameInfo.name : navigation.getParam('gameInfo').name,
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
      this.onScoreChange = this.onScoreChange.bind(this);
      this.onScoreEndEditing = this.onScoreEndEditing.bind(this);
      this.onHeaderScroll = this.onHeaderScroll.bind(this);
      this.onScoresScroll = this.onScoresScroll.bind(this);
   }

   componentWillMount() {
      this.game = this.props.navigation.getParam('game');
      if (!this.game) {
         this.game = new Game({ gameInfo: this.props.navigation.getParam('gameInfo'), id: this.props.screenProps.store.games.length + 1 });
         for (let i = 0; i < this.game.gameInfo.minPlayers; i++) {
            this.game.addPlayer({ isPhantom: true });
         }
         this.props.screenProps.store.addGame(this.game);
      }
   }

   onPlayerItemSelected(player, index) {
      this.game.replacePlayer(this.game.players[this.currentPlayerSelected], player);
      this.props.screenProps.store.save();
      this.currentPlayerSelected = null;
   }

   onPlayerAvatarPressed(index) {
      this.currentPlayerSelected = index;
   }

   onScoreFocus(player, index) {
      player.setTempScore(index, '');
   }

   onScoreChange(player, index, text) {
      player.setTempScore(index, text);
   }

   onScoresScroll(event) {
      if (this.isScrolling) { return; }
      let offset = null;
      this.isScrolling = true;
      if (this.game.gameInfo.horizontal) {
         offset = event.nativeEvent.contentOffset.x;
         this.headerScrollView.scrollTo({ x: offset, animated: false });
      } else {
         offset = event.nativeEvent.contentOffset.y;
         this.headerScrollView.scrollTo({ y: offset, animated: false });
      }
      this.isScrolling = false;
   }

   onHeaderScroll(event) {
      if (this.isScrolling) { return; }
      let offset = null;
      this.isScrolling = true;
      if (this.game.gameInfo.horizontal) {
         offset = event.nativeEvent.contentOffset.x;
         this.scoresScrollView.scrollTo({ x: offset, animated: false });
      } else {
         offset = event.nativeEvent.contentOffset.y;
         this.scoresScrollView.scrollTo({ y: offset, animated: false });
      }
      this.isScrolling = false;
   }

   onScoreEndEditing(player, index) {
      let text = player.tempScores[index];
      if (text === null || text === '') {
         player.setScore(index, player.scores[index]);
      } else {
         let number = Number.parseInt(text);
         let scoreCol = this.game.gameInfo.scoreCols[index];
         if (number !== NaN && (scoreCol.min === undefined || number >= scoreCol.min) && (scoreCol.max === undefined || number <= scoreCol.max)) {
            player.setScore(index, number);
         } else {
            if (number < scoreCol.min) {
               player.setScore(index, scoreCol.min);
            } else if (number > scoreCol.max) {
               player.setScore(index, scoreCol.max);
            } else {
               player.setScore(index, scoreCol.default || 0);
            }
         }
      }
      this.props.screenProps.store.save();
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

   getHeader(header) {
      if (!header) return;
      let { type, ...props } = header;
      switch (type) {
         case 'View':
            return <View {...props} />;
      }
   }

   render() {
      let gameInfo = this.game.gameInfo;
      if (gameInfo.horizontal) {
         return (
            <Grid style={{ backgroundColor: '#eee' }}>
               <Row style={{ height: 40, marginTop: 20, }}>
                  <Col
                     size={1}
                     style={{
                        justifyContent: 'center',
                        backgroundColor: gameInfo.gridHeaderBackgroundColor,
                        borderWidth: gameInfo.gridBorderWidth,
                        borderColor: gameInfo.gridBorderColor,
                     }}>
                     <Text style={{ textAlign: 'center', color: gameInfo.gridHeaderTextColor }}>Players</Text>
                  </Col>
                  {gameInfo.scoreCols.map(col => {
                     return (
                        <Col
                           key={'Header' + col.name}
                           style={{
                              width: gameInfo.gridColWidth,
                              justifyContent: 'center',
                              alignContent: 'center',
                              backgroundColor: gameInfo.gridHeaderBackgroundColor,
                              borderWidth: gameInfo.gridBorderWidth,
                              borderColor: gameInfo.gridBorderColor,
                           }}>
                           {this.getHeader(col.header) || <Text style={{ textAlign: 'center', color: gameInfo.gridHeaderTextColor }}>{col.name}</Text>}
                        </Col>
                     );
                  })}
                  <Col
                     size={1}
                     style={{
                        justifyContent: 'center',
                        backgroundColor: gameInfo.gridHeaderBackgroundColor,
                        borderWidth: gameInfo.gridBorderWidth,
                        borderColor: gameInfo.gridBorderColor,
                     }}>
                     <Text style={{ textAlign: 'center', color: gameInfo.gridHeaderTextColor }}>Totals</Text>
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
      // Vertical Table
      return (
         <View>
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
               <View>
                  <Table>
                     <Cell
                        data=''
                        style={{
                           height: gameInfo.gridPlayerHeaderSize || gameInfo.gridRowHeight,
                           width: gameInfo.gridScoreHeaderSize || gameInfo.gridColWidth,
                           backgroundColor: gameInfo.gridHeaderBackgroundColor,
                        }}
                     />
                     <ScrollView bounces={false} onScroll={this.onHeaderScroll} scrollEventThrottle={10} ref={(el) => { this.headerScrollView = el }}>
                        <Col
                           data={gameInfo.scoreCols.map((col) => this.getHeader(col.header) || col.name)}
                           heightArr={gameInfo.scoreCols.map(() => gameInfo.gridRowHeight)}
                           style={{
                              width: gameInfo.gridScoreHeaderSize || gameInfo.gridColWidth,
                              backgroundColor: gameInfo.gridHeaderBackgroundColor,
                           }}
                        />
                     </ScrollView>
                     <Cell
                        data='Totals'
                        style={{
                           height: gameInfo.gridRowHeight,
                           width: gameInfo.gridScoreHeaderSize || gameInfo.gridColWidth,
                           backgroundColor: gameInfo.gridHeaderBackgroundColor,
                        }}
                        textStyle={{
                           color: gameInfo.gridHeaderTextColor,
                           textAlign: 'center'
                        }}
                     />
                  </Table>
               </View>
               <ScrollView horizontal bounces={false}>
                  <Table>
                     <Row
                        data={this.game.players.map((player, index) =>
                           player.getAvatar({
                              rounded: true,
                              medium: true,
                              backgroundColor: player.isPhantom ? gameInfo.gridHeaderBackgroundColor : null,
                              style: {
                                 alignSelf: 'center',
                              },
                              onPress: () => { this.onPlayerAvatarPressed(index) }
                           }))}
                        widthArr={this.game.players.map(() => gameInfo.gridColWidth)}
                        style={{
                           backgroundColor: gameInfo.gridHeaderBackgroundColor,
                           height: gameInfo.gridPlayerHeaderSize || gameInfo.gridRowHeight,
                        }}
                     />
                     <ScrollView bounces={false} onScroll={this.onScoresScroll} scrollEventThrottle={10} ref={(el) => { this.scoresScrollView = el }}>
                        <Cols
                           heightArr={gameInfo.scoreCols.map(() => gameInfo.gridRowHeight)}
                           style={{
                              width: gameInfo.gridColWidth
                           }}
                           data={this.game.players.map((player, index) => {
                              return player.scores.map((score, ind) => {
                                 return !player.isPhantom ?
                                    (<TextInput
                                       style={{ width: '100%', textAlign: 'center', fontSize: 20 }}
                                       keyboardType='numbers-and-punctuation'
                                       clearTextOnFocus
                                       onFocus={() => this.onScoreFocus(player, ind)}
                                       onChangeText={(text) => this.onScoreChange(player, ind, text)}
                                       onEndEditing={(text) => this.onScoreEndEditing(player, ind, text)}
                                       value={player.tempScores[ind].toString()}
                                    />) : null
                              });
                           })}
                        />
                     </ScrollView>
                     <Row
                        widthArr={this.game.players.map(() => gameInfo.gridColWidth)}
                        style={{
                           height: gameInfo.gridRowHeight,
                           borderTopWidth: 3,
                        }}
                        textStyle={{
                           fontSize: 24,
                           fontWeight: 'bold',
                           textAlign: 'center',
                        }}
                        data={this.game.players.map(player => {
                           return !player.isPhantom ? player.totalScore : null;
                        })}
                     />
                  </Table>
               </ScrollView>
            </View>
            {this.renderPlayerSelect()}
         </View>
      )
   }

}

export default GameScreen;
