'use strict';

module.exports = (client, { d: data }) => {
  client.emit('userConnectionsUpdate', data);
};
