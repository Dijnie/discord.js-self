'use strict';

const { Base } = require('./Base.js');

const RelationshipTypes = {
  1: 'Friend',
  2: 'Blocked',
  3: 'IncomingRequest',
  4: 'OutgoingRequest',
};

/**
 * Represents a relationship (friend, blocked user, etc.) for a selfbot user.
 *
 * @extends {Base}
 */
class Relationship extends Base {
  constructor(client, data) {
    super(client);
    this._patch(data);
  }

  _patch(data) {
    this.id = data.id;
    this.type = data.type;
    this.typeName = RelationshipTypes[data.type] ?? 'Unknown';
    this.nickname = data.nickname ?? null;
    this.since = data.since ? new Date(data.since) : null;

    if (data.user) {
      this.user = this.client.users._add(data.user);
    }

    return this;
  }

  /** @type {boolean} */
  get isFriend() {
    return this.type === 1;
  }

  /** @type {boolean} */
  get isBlocked() {
    return this.type === 2;
  }

  /** @type {boolean} */
  get isIncomingRequest() {
    return this.type === 3;
  }

  /** @type {boolean} */
  get isOutgoingRequest() {
    return this.type === 4;
  }
}

exports.Relationship = Relationship;
