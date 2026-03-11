'use strict';

module.exports = (client, { d: data }) => {
  client.relationships._add(data);
  client.emit('relationshipAdd', client.relationships.cache.get(data.id));
};
