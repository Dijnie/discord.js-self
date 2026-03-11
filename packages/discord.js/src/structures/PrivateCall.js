'use strict';

const { Base } = require('./Base.js');

/**
 * Represents a private (DM/group) voice call for a selfbot user.
 *
 * @extends {Base}
 */
class PrivateCall extends Base {
  constructor(client, data) {
    super(client);
    this._patch(data);
  }

  _patch(data) {
    this.channelId = data.channel_id;
    this.messageId = data.message_id ?? null;
    this.region = data.region ?? null;
    this.ringing = data.ringing ?? [];
    this.unavailable = data.unavailable ?? false;
    return this;
  }
}

exports.PrivateCall = PrivateCall;
