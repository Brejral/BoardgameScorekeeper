import { DATA_SOURCE } from "./Constants";

export const GAME_INFO = [
   {
      name: '7 Wonders',
      minPlayers: 2,
      maxPlayers: 7,
      scoreCols: [
         {
            name: 'Military',
            min: -6,
            max: 18,
         },
         {
            name: 'Coins',
            min: 0,
         },
         {
            name: 'Wonder',
            min: 0,
            max: 20,
         },
         {
            name: 'Civilian',
            min: 0,
         },
         {
            name: 'Commercial',
            min: 0,
         },
         {
            name: 'Guilds',
            min: 0,
         },
         {
            name: 'Science',
            min: 0,
         }
      ]
   }
];