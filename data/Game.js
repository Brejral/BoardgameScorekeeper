import { observable, action } from "mobx";
import GamePlayer from "./GamePlayer";


export default class Game {
   id = null;
   gameInfo = null;
   @observable date = null;
   @observable players = [];
   playerIds = {};

   constructor(data) {
      this.id = data.id;
      this.date = new Date();
      this.gameInfo = data.gameInfo;
   }

   @action addPlayer(player) {
      this.players = [...this.players, new GamePlayer(player, this.gameInfo)];
      this.playerIds[player.id] = true;
   }

   @action removePlayer(player) {
      let index = this.players.indexOf(player);
      this.players.splice(index, 1);
      this.playerIds[player.id] = false;
      // this.players = [
      //    ...this.players.slice(0, index),
      //    ...this.players.slice(index + 1)
      // ];
   }

   @action replacePlayer(oldPlayer, newPlayer) {
      this.playerIds[oldPlayer.id] = false;
      this.playerIds[newPlayer.id] = true;
      newPlayer = new GamePlayer(newPlayer, this.gameInfo);
      newPlayer.assignScores(oldPlayer.scores);
      let index = this.players.indexOf(oldPlayer);
      this.players[index] = newPlayer;
      // this.players = [
      //    ...this.players.slice(0, index),
      //    newPlayer,
      //    ...this.players.slice(index + 1)
      // ];
      if ((!this.gameInfo.maxPlayers || this.gameInfo.maxPlayers > this.players.length) && !this.players.some(player => player.isPhantom)) {
         this.addPlayer({ isPhantom: true });
      }
   }

}