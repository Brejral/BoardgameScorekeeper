import React, { Component } from 'react';
import { Divider } from 'react-native-elements';

export default class Seperator extends Component {
   render() {
      if (!this.props.vertical) {
         return (
            <Divider style={{ backgroundColor: '#bbb', height: this.props.lineSize || 1, borderRadius: 2 }} />
         );
      }
      return (
         <Divider style={{ width: this.props.lineSize || 1, height: '100%', backgroundColor: '#bbb', borderRadius: 2 }} />
      )
   }
}