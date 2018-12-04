import { observable, action } from "mobx";


export default class Game {
   id = null;
   @observable gameInfo = null;
   @observable date = null;
   @observable players = [];

   constructor(data) {
      this.id = data.id;
      this.date = new Date();
      this.gameInfo = data.gameInfo;
   }

   @action addPlayer(player) {
      this.players = [...this.players, player];
   }

}