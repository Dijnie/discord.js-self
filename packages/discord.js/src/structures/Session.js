'use strict';

const { Base } = require('./Base.js');

/**
 * Represents an active client session for a selfbot user.
 *
 * @extends {Base}
 */
class Session extends Base {
  constructor(client, data) {
    super(client);
    this._patch(data);
  }

  _patch(data) {
    this.sessionId = data.session_id;
    this.status = data.status;
    this.activities = data.activities ?? [];
    this.clientInfo = data.client_info ?? {};
    this.active = data.active ?? false;
    return this;
  }
}

exports.Session = Session;
