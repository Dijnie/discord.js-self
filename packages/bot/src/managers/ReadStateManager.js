'use strict';

const { Collection } = require('@discordjs/collection');
const { Base } = require('../structures/Base.js');
const { ReadState } = require('../structures/ReadState.js');

/**
 * Manages read states (last-read message, mention counts) for a selfbot user.
 *
 * @extends {Base}
 */
class ReadStateManager extends Base {
  constructor(client) {
    super(client);
    /** @type {Collection<string, ReadState>} */
    this.cache = new Collection();
  }

  /**
   * Adds or updates a read state entry in the cache.
   *
   * @param {Object} data Raw read state data
   * @returns {ReadState}
   */
  _add(data) {
    const readState = new ReadState(this.client, data);
    this.cache.set(readState.channelId, readState);
    return readState;
  }

  /**
   * Acknowledges a message in a channel (marks channel as read).
   *
   * @param {string} channelId The channel id to acknowledge
   * @param {string} messageId The message id to acknowledge up to
   * @returns {Promise<void>}
   */
  async ack(channelId, messageId) {
    await this.client.rest.post(`/channels/${channelId}/messages/${messageId}/ack`, { body: { token: null } });
  }
}

exports.ReadStateManager = ReadStateManager;
