import { observable, computed, action } from "mobx";
import { AsyncStorage } from 'react-native';
import Player from "./Player";
import { GAME_INFO } from "../constants/GameInfo";
const uuidv4 = require('uuid/v4');

export default class Store {
   playersStorageKey = '@BoardgameScorekeeper/Players';
   gamesStorageKey = '@BoardgameScorekeeper/Games';

   @observable isLoading = false;
   @observable players = [];
   @observable games = [];

   constructor() {
      this.load();
   }

   @action createPlayer(first, last) {
      this.players = [
         ...this.players,
         new Player({
            id: uuidv4(),
            firstName: first,
            lastName: last
         })
      ].sort((a, b) => a.name.localeCompare(b.name));
      this.save();
   }

   @action deletePlayer(player) {
      let index = this.players.indexOf(player);
      this.players = [
         ...this.players.slice(0, index),
         ...this.players.slice(index + 1)
      ];
      this.save();
   }

   save() {
      AsyncStorage.setItem(this.playersStorageKey, JSON.stringify(this.players));
      AsyncStorage.setItem(this.gamesStorageKey, JSON.stringify(this.games));
   }

   load() {
      this.isLoading = true;
      AsyncStorage.multiGet([this.playersStorageKey, this.gamesStorageKey])
         .then((results) => {
            this.players = JSON.parse(results[0][1]).map(data => new Player(data)) || [];
            console.log(results[0][1])
            this.games = JSON.parse(results[1][1]) || [];
            this.isLoading = false;
         });
   }
}