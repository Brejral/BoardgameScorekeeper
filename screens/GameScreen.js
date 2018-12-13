import React from 'react';
import { observer } from 'mobx-react';
import { View, TextInput, ScrollView } from 'react-native';
import { COLORS } from '../constants/Constants';
import { Avatar, Icon, Text, Divider, List, ListItem, FormInput } from 'react-native-elements';
import { Grid } from 'react-native-easy-grid';
import { observable } from 'mobx';
import { Table, Row, Rows, Col, Cell, Cols, TableWrapper } from 'react-native-table-component';
import Game from '../data/Game';
import PickerSelect from 'react-native-picker-select';

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
      this.getEditor = this.getEditor.bind(this);
      this.getHeader = this.getHeader.bind(this);
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

   getEditor(player, index, col, value) {
      if (!col) { return; }
      switch (col.type) {
         case 'category':
            return (
               <PickerSelect
                  placeholder={{
                     color: 'gray',
                     label: col.placeholder || 'Select Item...',

                  }}
                  items={col.options.map((option) => {
                     return {
                        label: option,
                        value: option,
                     }
                  })}
                  hideIcon
                  style={{
                     inputIOS: {
                        textAlign: 'center',
                        color: 'black',
                     },
                     inputAndroid: {
                        textAlign: 'center',
                        color: 'black',
                     }
                  }}
                  onValueChange={(value) => this.onScoreChange(player, index, value)}
               />
            );
         default:
            return (
               <TextInput
                  style={{ width: '100%', textAlign: 'center', fontSize: 20 }}
                  keyboardType='numbers-and-punctuation'
                  clearTextOnFocus
                  onFocus={() => this.onScoreFocus(player, index)}
                  onChangeText={(text) => this.onScoreChange(player, index, text)}
                  onEndEditing={(text) => this.onScoreEndEditing(player, index, text)}
                  value={player.tempScores[index].toString()}
               />
            );

      }
   }

   render() {
      let gameInfo = this.game.gameInfo;
      if (gameInfo.horizontal) {
         return (
            <View>
               <Table style={{ width: '100%', marginBottom: -50 }}>
                  <TableWrapper style={{ flexDirection: 'row' }}>
                     <Cell
                        data=''
                        style={{
                           height: gameInfo.gridScoreHeaderSize || gameInfo.gridRowHeight,
                           width: gameInfo.gridPlayerHeaderSize || gameInfo.gridColWidth,
                           backgroundColor: gameInfo.gridHeaderBackgroundColor,
                        }}
                     />
                     <ScrollView horizontal bounces={false} onScroll={this.onHeaderScroll} scrollEventThrottle={10} ref={(el) => { this.headerScrollView = el }}>
                        <Row
                           data={gameInfo.scoreCols.map((col) => this.getHeader(col.header) || col.name)}
                           widthArr={gameInfo.scoreCols.map(() => gameInfo.gridColWidth)}
                           style={{
                              height: gameInfo.gridScoreHeaderSize || gameInfo.gridRowHeight,
                              backgroundColor: gameInfo.gridHeaderBackgroundColor,
                           }}
                        />
                     </ScrollView>
                     <Cell
                        data='Totals'
                        style={{
                           height: gameInfo.gridScoreHeaderSize || gameInfo.gridRowHeight,
                           width: gameInfo.gridColWidth,
                           backgroundColor: gameInfo.gridHeaderBackgroundColor,
                        }}
                        textStyle={{
                           color: gameInfo.gridHeaderTextColor,
                           textAlign: 'center'
                        }}
                     />
                  </TableWrapper>
                  <ScrollView bounces={false}>
                     <TableWrapper style={{ flexDirection: 'row' }}>
                        <Col
                           heightArr={this.game.players.map(() => gameInfo.gridRowHeight)}
                           style={{
                              backgroundColor: gameInfo.gridHeaderBackgroundColor,
                              width: gameInfo.gridPlayerHeaderSize || gameInfo.gridColWidth,
                           }}
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
                        />
                        <ScrollView horizontal bounces={false} onScroll={this.onScoresScroll} scrollEventThrottle={10} ref={(el) => { this.scoresScrollView = el }}>
                           <Rows
                              widthArr={gameInfo.scoreCols.map(() => gameInfo.gridColWidth)}
                              style={{
                                 height: gameInfo.gridRowHeight
                              }}
                              data={this.game.players.map((player, index) => {
                                 return player.scores.map((score, ind) => {
                                    return !player.isPhantom ? this.getEditor(player, ind, gameInfo.scoreCols[ind], score) : null;
                                 });
                              })}
                           />
                        </ScrollView>
                        <Col
                           heightArr={this.game.players.map(() => gameInfo.gridRowHeight)}
                           style={{
                              width: gameInfo.gridColWidth,
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
                     </TableWrapper>
                  </ScrollView>
               </Table>
               {this.renderPlayerSelect()}
            </View>
         );
      }
      // Vertical Table
      return (
         <View>
            <Table style={{ height: '100%', flexDirection: 'row', marginBottom: -50, }}>
               <TableWrapper style={{ margin: 0 }}>
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
                        textStyle={{
                           color: gameInfo.gridHeaderTextColor,
                           textAlign: 'center'
                        }}
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
               </TableWrapper>
               <ScrollView horizontal bounces={false}>
                  <TableWrapper>
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
                                 return !player.isPhantom ? this.getEditor(player, ind, gameInfo.scoreCols[ind], score) : null;
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
                  </TableWrapper>
               </ScrollView>
            </Table>
            {this.renderPlayerSelect()}
         </View>
      );
   }

}

export default GameScreen;
