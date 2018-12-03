import { observable, computed, action } from "mobx";
import { AsyncStorage, ListView } from 'react-native';
import Player from "./Player";
import { DATA_SOURCE } from "../constants/Constants";
import { GAME_INFO } from "../constants/GameInfo";

export default class Store {
   playersStorageKey = '@BoardgameScorekeeper/Players';
   gamesStorageKey = '@BoardgameScorekeeper/Games';

   @observable isLoading = false;
   @observable players = [];
   @observable games = [];

   ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

   constructor() {
      this.load();
   }

   @computed get playersDataSource() {
      return this.ds.cloneWithRows(this.players.slice().sort((a, b) => a.name.localeCompare(b.name)));
   }

   @computed get gamesDataSource() {
      return this.ds.cloneWithRows(this.games.slice());
   }

   @computed get gameInfoDataSource() {
      return this.ds.cloneWithRows(GAME_INFO);
   }

   @action createPlayer(first, last) {
      this.players = [
         ...this.players,
         new Player({
            id: this.players.length + 1,
            firstName: first,
            lastName: last
         })
      ];
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
            console.log(results);
            this.players = JSON.parse(results[0][1]).map(data => new Player(data)) || [];
            this.games = JSON.parse(results[1][1]) || [];
            this.isLoading = false;
         });
   }
}