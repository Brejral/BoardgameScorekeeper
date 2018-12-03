import React from 'react';
import { observer } from 'mobx-react';
import { View } from 'react-native';

@observer class PlayerInfoScreen extends React.Component {

   constructor() {
      super();


   }

   render() {
      return (
         <View style={{ position: 'absolute', justifyContent: 'center', alignContent: 'center', opacity: 0.3, backgroundColor: 'black', zIndex: 999 }}>
            <View style={{ height: 600, width: 250 }}>
            </View>
         </View>
      );
   }
}

export default PlayerInfoScreen;
