
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
    .map(({ team_id, abbreviation, first_name, last_name, conference, division, site_name, city, state, full_name }) => {
      return {
        id: uuid.v4(),
        slug: team_id,
        abbreviation,
        prefix: first_name,
        name: last_name,
        conference,
        division,
        arena: site_name,
        city,
        state,
        league,
      };
    })
  );
}
