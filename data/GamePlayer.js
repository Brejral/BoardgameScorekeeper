import React from 'react';
import { observable, computed, action } from "mobx";
import { COLORS } from "../constants/Constants";
import { Avatar } from 'react-native-elements';

export default class GamePlayer {
   id = null;
   @observable firstName = '';
   @observable lastName = '';
   @observable scores = [];
   @observable tempScores = [];
   @observable isPhantom = false;
   @observable avatarProps = null

   constructor(data, gameInfo) {
      this.id = data.id;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.isPhantom = data.isPhantom;
      this.avatarProps = data.avatarProps || {
         borderColor: COLORS.Text1,
         titleColor: COLORS.Text1,
         iconColor: COLORS.EmptyText,
         backgroundColor: 'black',
         title: data.firstName && data.firstName.substr(0, 1) + data.lastName.substr(0, 1),
      }
      for (let i = 0; i < gameInfo.scoreCols.length; i++) {
         this.scores.push(gameInfo.scoreCols.defaultScore || 0);
         this.tempScores.push(gameInfo.scoreCols.defaultScore || 0);
      }
   }

   @computed get name() {
      return this.firstName + ' ' + this.lastName;
   }

   @computed get totalScore() {
      return this.scores.reduce((a, b) => (Number.parseInt(a) || 0) + (Number.parseInt(b) || 0));
   }

   @action assignScores(scores) {
      this.scores = scores;
   }

   @action setTempScore(index, score) {
      this.tempScores[index] = score;
   }

   @action setScore(index, score) {
      this.scores[index] = score;
      this.tempScores[index] = score;
      // this.scores = [
      //    ...this.scores.slice(0, index),
      //    score,
      //    ...this.scores.slice(index + 1)
      // ];
   }

   getAvatar(props) {
      return (
         <Avatar
            title={!this.isPhantom ? this.avatarProps.title : null}
            titleStyle={{ color: this.avatarProps.titleColor }}
            icon={this.isPhantom ? { name: 'plus', type: 'font-awesome', color: this.avatarProps.iconColor } : null}
            overlayContainerStyle={{
               borderWidth: 2,
               borderStyle: this.isPhantom ? 'dashed' : 'solid',
               borderColor: this.isPhantom ? COLORS.EmptyText : this.avatarProps.borderColor,
               backgroundColor: props.backgroundColor || (this.isPhantom ? COLORS.EmptyBackground : this.avatarProps.backgroundColor),
            }}
            containerStyle={{ alignSelf: 'center' }}
            {...props}
         />
      )
   }
}