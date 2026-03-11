'use strict';

module.exports = (client, { d: data }) => {
  const relationship = client.relationships.cache.get(data.id);
  client.relationships.cache.delete(data.id);
  client.emit('relationshipRemove', relationship ?? data);
};
