'use strict';

const { Collection } = require('@discordjs/collection');
const { Base } = require('../structures/Base.js');

/**
 * Manages user notes for a selfbot (notes attached to other users).
 *
 * @extends {Base}
 */
class NoteManager extends Base {
  constructor(client) {
    super(client);
    /** @type {Collection<string, string>} */
    this.cache = new Collection();
  }

  /**
   * Adds or removes a note from the cache.
   *
   * @param {string} userId The user id the note belongs to
   * @param {?string} note The note content (falsy removes entry)
   */
  _add(userId, note) {
    if (note) {
      this.cache.set(userId, note);
    } else {
      this.cache.delete(userId);
    }
  }

  /**
   * Sets a note for a user.
   *
   * @param {UserResolvable} user The user to set a note for
   * @param {string} note The note content
   * @returns {Promise<void>}
   */
  async set(user, note) {
    const id = this.client.users.resolveId(user);
    await this.client.rest.put(`/users/@me/notes/${id}`, { body: { note } });
    this._add(id, note);
  }

  /**
   * Deletes a note for a user.
   *
   * @param {UserResolvable} user The user whose note to delete
   * @returns {Promise<void>}
   */
  async delete(user) {
    const id = this.client.users.resolveId(user);
    await this.client.rest.put(`/users/@me/notes/${id}`, { body: { note: '' } });
    this.cache.delete(id);
  }

  /**
   * Fetches a note for a user from the API.
   *
   * @param {UserResolvable} user The user whose note to fetch
   * @returns {Promise<?string>}
   */
  async fetch(user) {
    const id = this.client.users.resolveId(user);
    const data = await this.client.rest.get(`/users/@me/notes/${id}`);
    this._add(id, data.note);
    return data.note;
  }
}

exports.NoteManager = NoteManager;
