
const uuid = require('uuid');
const request = require('request-promise');

module.exports = (league) => {
  switch(league) {
    case 'NBA':
    case 'MLB':
      return xmlStats(league);
  }
};

function xmlStats(league) {
  return request({
    method: 'GET',
    uri: `https://erikberg.com/${league.toLowerCase()}/teams.json`,
    headers: {
      'User-Agent': 'Lambda/1.0 (sethtippetts@gmail.com)',
    },
    json: true,
  })
  .then(body => body
    .map(res => {
      return {
        id: uuid.v4(),
        slug: res.team_id,
        prefix: res.first_name,
        name: res.last_name,
        arena: res.site_name,
        abbreviation: res.abbreviation,
        conference: res.conference,
        division: res.division,
        city: res.city,
        state: res.state,
        league: res.league,
      };
    })
  );
}
