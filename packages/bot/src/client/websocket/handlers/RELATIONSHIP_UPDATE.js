'use strict';

module.exports = (client, { d: data }) => {
  const old = client.relationships.cache.get(data.id)?._clone() ?? null;
  const updated = client.relationships._add(data);
  client.emit('relationshipUpdate', old, updated);
};
