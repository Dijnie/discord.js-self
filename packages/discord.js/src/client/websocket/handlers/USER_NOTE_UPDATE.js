'use strict';

module.exports = (client, { d: data }) => {
  const oldNote = client.notes.cache.get(data.id) ?? null;
  client.notes._add(data.id, data.note);
  client.emit('userNoteUpdate', data.id, oldNote, data.note);
};
