'use strict';

const { Base } = require('../structures/Base.js');

/**
 * Manages user and guild affinities for a selfbot user.
 *
 * @extends {Base}
 */
class AffinityManager extends Base {
  constructor(client) {
    super(client);
  }

  /**
   * Fetches user affinities for the current user.
   *
   * @returns {Promise<unknown>}
   */
  async fetchUserAffinities() {
    return this.client.rest.get('/users/@me/affinities/users');
  }

  /**
   * Fetches guild affinities for the current user.
   *
   * @returns {Promise<unknown>}
   */
  async fetchGuildAffinities() {
    return this.client.rest.get('/users/@me/affinities/guilds');
  }
}

exports.AffinityManager = AffinityManager;
