'use strict';

const { PrivateCall } = require('../../../structures/PrivateCall.js');

module.exports = (client, { d: data }) => {
  const call = new PrivateCall(client, data);
  client.emit('callUpdate', call);
};
