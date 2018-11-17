import { observable, computed } from "mobx";

export default class Player {
   id = null;
   @observable firstName = '';
   @observable lastName = '';

   constructor(data) {
      this.id = data.id;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
   }

   @computed get name() {
      return this.firstName + ' ' + this.lastName;
   }
}