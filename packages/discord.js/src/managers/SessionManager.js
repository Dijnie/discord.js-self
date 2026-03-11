'use strict';

const { Collection } = require('@discordjs/collection');
const { Base } = require('../structures/Base.js');
const { Session } = require('../structures/Session.js');

/**
 * Manages active sessions for a selfbot user account.
 *
 * @extends {Base}
 */
class SessionManager extends Base {
  constructor(client) {
    super(client);
    /** @type {Collection<string, Session>} */
    this.cache = new Collection();
  }

  /**
   * Adds a session to the cache.
   *
   * @param {Object} data Raw session data
   * @returns {Session}
   */
  _add(data) {
    const session = new Session(this.client, data);
    this.cache.set(session.sessionId, session);
    return session;
  }

  /**
   * Replaces all sessions in cache with a new array.
   *
   * @param {Object[]} sessions Array of raw session data
   */
  _patch(sessions) {
    this.cache.clear();
    for (const sessionData of sessions) {
      this._add(sessionData);
    }
  }
}

exports.SessionManager = SessionManager;
