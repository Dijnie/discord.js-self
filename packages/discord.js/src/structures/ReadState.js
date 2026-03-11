'use strict';

const { Base } = require('./Base.js');

/**
 * Represents the read state of a channel for a selfbot user.
 *
 * @extends {Base}
 */
class ReadState extends Base {
  constructor(client, data) {
    super(client);
    this._patch(data);
  }

  _patch(data) {
    this.channelId = data.id ?? data.channel_id;
    this.lastMessageId = data.last_message_id ?? null;
    this.mentionCount = data.mention_count ?? 0;
    this.lastPinTimestamp = data.last_pin_timestamp ? new Date(data.last_pin_timestamp) : null;
    return this;
  }
}

exports.ReadState = ReadState;
