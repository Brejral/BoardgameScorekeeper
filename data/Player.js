import { observable, computed } from "mobx";
import { COLORS } from "../constants/Constants";
import { Avatar } from "react-native-elements";

export default class Player {
   id = null;
   @observable firstName = '';
   @observable lastName = '';
   @observable avatarProps = null;

   constructor(data) {
      this.id = data.id;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.avatarProps = {
         borderColor: COLORS.Text1,
         titleColor: COLORS.Text1,
         iconColor: COLORS.EmptyText,
         backgroundColor: 'black',
         title: data.firstName.substr(0, 1) + data.lastName.substr(0, 1),
         useIcon: false,
      };
   }

   @computed get name() {
      return this.firstName + ' ' + this.lastName;
   }

   getAvatar(props) {
      return (
         <Avatar
            title={this.avatarProps.title}
            titleStyle={{ color: this.avatarProps.titleColor }}
            icon={this.avatarProps.useIcon ? { name: 'plus', type: 'font-awesome', color: this.avatarProps.iconColor } : null}
            overlayContainerStyle={{
               borderWidth: 2,
               borderStyle: 'solid',
               borderColor: this.avatarProps.borderColor,
               backgroundColor: this.avatarProps.backgroundColor,
            }}
            {...props}
         />
      )
   }
}