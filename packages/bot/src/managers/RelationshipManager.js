'use strict';

const { CachedManager } = require('./CachedManager.js');
const { Relationship } = require('../structures/Relationship.js');

/**
 * Manages selfbot user relationships (friends, blocked users, pending requests).
 *
 * @extends {CachedManager}
 */
class RelationshipManager extends CachedManager {
  constructor(client) {
    super(client, Relationship);
  }

  _add(data, cache = true) {
    return super._add(data, cache, { id: data.id });
  }

  /**
   * Sends a friend request to a user by their id.
   *
   * @param {UserResolvable} user The user to add as a friend
   * @returns {Promise<void>}
   */
  async addFriend(user) {
    const id = this.client.users.resolveId(user);
    await this.client.rest.put(`/users/@me/relationships/${id}`, { body: {}, headers: { 'X-Context-Properties': '' } });
  }

  /**
   * Removes a friend relationship with a user.
   *
   * @param {UserResolvable} user The user to remove as a friend
   * @returns {Promise<void>}
   */
  async removeFriend(user) {
    const id = this.client.users.resolveId(user);
    await this.client.rest.delete(`/users/@me/relationships/${id}`);
  }

  /**
   * Blocks a user.
   *
   * @param {UserResolvable} user The user to block
   * @returns {Promise<void>}
   */
  async block(user) {
    const id = this.client.users.resolveId(user);
    await this.client.rest.put(`/users/@me/relationships/${id}`, { body: { type: 2 } });
  }

  /**
   * Unblocks a user (removes the block relationship).
   *
   * @param {UserResolvable} user The user to unblock
   * @returns {Promise<void>}
   */
  async unblock(user) {
    const id = this.client.users.resolveId(user);
    await this.client.rest.delete(`/users/@me/relationships/${id}`);
  }

  /**
   * Sends a friend request by username (new username system).
   *
   * @param {string} username The username to send a friend request to
   * @returns {Promise<void>}
   */
  async sendFriendRequest(username) {
    await this.client.rest.post('/users/@me/relationships', { body: { username } });
  }
}

exports.RelationshipManager = RelationshipManager;
