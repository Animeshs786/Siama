function validateGSTIN(gstin) {
  // Regular expression to match a valid GSTIN
  const gstinPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
  if (!gstin.match(gstinPattern)) return false;
  // Extract state code from GSTIN
  const stateCode = gstin.substr(0, 2);
  // List of valid state codes (as of September 2021, subject to change)
  const validStateCodes = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '60',
    '61',
    '62',
    '63',
    '64',
    '65',
    '66',
    '67',
    '68',
    '69',
    '70',
    '71',
    '72',
    '73',
    '74',
    '75',
    '76',
    '77',
    '78',
    '79',
    '80',
    '81',
    '82',
    '83',
    '85',
    '86',
    '87',
    '88',
    '89',
    '91',
    '96',
    '97',
    '99',
  ];
  if (!validStateCodes.includes(stateCode)) return false;
  return true;
}

// async function testt() {
//   const states = data;

//   try {
//     for (let i = 0; i < states.length; i++) {
//       console.log('saving state ', i + 1);
//       const state = states[i];
//       const newstate = new State({
//         name: state.name,
//         value: state.name
//           .split(' ')
//           .map((str) => str.toLowerCase())
//           .join('_'),
//         state_code: state.state_code,
//       });
//       await newstate.save();
//       if (state.cities.length) {
//         for (let j = 0; j < state.cities.length; j++) {
//           console.log('saving city ', i + 1, j + 1);
//           const city = state.cities[j];
//           const newcity = new City({
//             state: newstate._id,
//             name: city.name,
//             value: city.name
//               .split(' ')
//               .map((str) => str.toLowerCase())
//               .join('_'),
//           });
//           await newcity.save();
//         }
//       }
//     }
//     console.log('Data Saved.');
//   } catch (error) {
//     console.log(error.message);
//     await City.deleteMany();
//     await State.deleteMany();
//   }
// }

// async function test() {
//   const response = await axios({
//     method: 'GET',
//     url: 'https://api.worldpostallocations.com/pincode?postalcode=&countrycode=IN&apikey=1321-9b1e00f8-f861e00c-7df5f89c-905a686549e14d36cd2',
//   });
//   console.log(response.data);
// }
// test();
