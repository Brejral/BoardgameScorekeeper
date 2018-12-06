
export const GAME_INFO = [
   {
      name: '7 Wonders',
      minPlayers: 2,
      maxPlayers: 7,
      gridScoreHeaderSize: 60,
      gridPlayerHeaderSize: 70,
      gridRowHeight: 60,
      gridColWidth: 75,
      gridBorderColor: 'black',
      gridBorderWidth: 1,
      gridHeaderBackgroundColor: 'black',
      gridHeaderTextColor: 'white',
      totalFunc: (scores) => {
         return scores[1] +
            (scores[2] / 3) +
            scores[3] +
            scores[4] +
            scores[5] +
            scores[6] +
            (scores[7] * scores[7]) +
            (scores[8] * scores[8]) +
            (scores[9] * scores[9]) +
            7 * Math.min(scores[7], scores[8], scores[9])
      },
      scoreCols: [
         {
            name: 'Wonder',
            options: [

            ],
         },
         {
            name: 'Military',
            min: -6,
            max: 18,
            header: {
               type: 'View',
               style: { width: 24, height: 36, backgroundColor: 'red', borderWidth: 2, borderColor: 'white', borderRadius: 3, alignSelf: 'center' }
            },
         },
         {
            name: 'Coin',
            min: 0,
            header: {
               type: 'View',
               style: { width: 30, height: 30, backgroundColor: 'gold', borderWidth: 2, borderColor: 'white', borderRadius: '50%', alignSelf: 'center' }
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
                  borderLeftWidth: 18,
                  borderLeftColor: 'transparent',
                  borderRightWidth: 18,
                  borderRightColor: 'transparent',
                  borderBottomWidth: 30,
                  borderBottomColor: 'white',
               }
            },
         },
         {
            name: 'Civ',
            min: 0,
            header: {
               type: 'View',
               style: { width: 24, height: 36, backgroundColor: 'blue', borderWidth: 2, borderColor: 'white', borderRadius: 3, alignSelf: 'center' }
            },
         },
         {
            name: 'Com',
            min: 0,
            header: {
               type: 'View',
               style: { width: 24, height: 36, backgroundColor: 'gold', borderWidth: 2, borderColor: 'white', borderRadius: 3, alignSelf: 'center' }
            },
         },
         {
            name: 'Gui',
            min: 0,
            header: {
               type: 'View',
               style: { width: 24, height: 36, backgroundColor: 'purple', borderWidth: 2, borderColor: 'white', borderRadius: 3, alignSelf: 'center' }
            },
         },
         {
            name: 'Sci',
            min: 0,
            header: {
               type: 'View',
               style: { width: 24, height: 36, backgroundColor: 'green', borderWidth: 2, borderColor: 'white', borderRadius: 3, alignSelf: 'center' }
            },
         }
      ]
   }
];

export const getSortedGameInfo = () => {
   return GAME_INFO.slice().sort((a, b) => a.name.localeCompare(b.name));
}