'use strict';

module.exports = (client, { d: data }) => {
  client.sessions._patch(data);
  client.emit('sessionsReplace', client.sessions.cache);
};
