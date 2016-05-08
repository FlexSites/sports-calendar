'use strict';

const SEASONS = ['spring', 'summer', 'fall', 'winter'];

const SPORTS = {
  basketball: {
    name: 'basketball',
    season: SEASONS[3],
    leagues: ['NBA'],
  },
  baseball: {
    name: 'baseball',
    season: SEASONS[1],
    leagues: ['MLB'],
  },
};

const LEAGUE_LIST = [
  {
    id: 'NBA',
    sport: SPORTS['basketball'],
  },
  {
    id: 'MLB',
    sport: SPORTS['baseball'],
  }
];

const LEAGUES = LEAGUE_LIST.reduce((prev, curr) => {
  prev[curr.id] = curr;
  return prev;
}, {});


module.exports = {
  SPORTS,
  LEAGUES,
  LEAGUE_LIST,
};
