
export const GAME_INFO = [
   {
      name: '7 Wonders',
      horizontal: true,
      minPlayers: 2,
      maxPlayers: 7,
      gridRowHeight: 60,
      gridColWidth: 35,
      gridBorderColor: 'black',
      gridBorderWidth: 1,
      gridHeaderBackgroundColor: 'black',
      gridHeaderTextColor: 'white',
      scoreCols: [
         {
            name: 'Military',
            min: -6,
            max: 18,
            header: {
               type: 'View',
               style: { width: 20, height: 30, backgroundColor: 'red', borderWidth: 2, borderColor: 'white', borderRadius: 3, alignSelf: 'center' }
            },
         },
         {
            name: 'Coin',
            min: 0,
            header: {
               type: 'View',
               style: { width: 25, height: 25, backgroundColor: 'gold', borderWidth: 2, borderColor: 'white', borderRadius: '50%', alignSelf: 'center' }
            },
         },
         {
            name: 'Wonder',
            min: 0,
            max: 20,
            header: {
               type: 'View',
               style: {
                  width: 0,
                  height: 0,
                  alignSelf: 'center',
                  borderLeftWidth: 12,
                  borderLeftColor: 'transparent',
                  borderRightWidth: 12,
                  borderRightColor: 'transparent',
                  borderBottomWidth: 20,
                  borderBottomColor: 'white',
               }
            },
         },
         {
            name: 'Civ',
            min: 0,
            header: {
               type: 'View',
               style: { width: 20, height: 30, backgroundColor: 'blue', borderWidth: 2, borderColor: 'white', borderRadius: 3, alignSelf: 'center' }
            },
         },
         {
            name: 'Com',
            min: 0,
            header: {
               type: 'View',
               style: { width: 20, height: 30, backgroundColor: 'gold', borderWidth: 2, borderColor: 'white', borderRadius: 3, alignSelf: 'center' }
            },
         },
         {
            name: 'Gui',
            min: 0,
            header: {
               type: 'View',
               style: { width: 20, height: 30, backgroundColor: 'purple', borderWidth: 2, borderColor: 'white', borderRadius: 3, alignSelf: 'center' }
            },
         },
         {
            name: 'Sci',
            min: 0,
            header: {
               type: 'View',
               style: { width: 20, height: 30, backgroundColor: 'green', borderWidth: 2, borderColor: 'white', borderRadius: 3, alignSelf: 'center' }
            },
         }
      ]
   }
];

export const getSortedGameInfo = () => {
   return GAME_INFO.slice().sort((a, b) => a.name.localeCompare(b.name));
}