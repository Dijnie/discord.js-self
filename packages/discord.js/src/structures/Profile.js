'use strict';

const { Base } = require('./Base.js');

/**
 * Represents a user profile fetched from the Discord API (selfbot only).
 *
 * @extends {Base}
 */
class Profile extends Base {
  constructor(client, data) {
    super(client);
    this._patch(data);
  }

  _patch(data) {
    this.userId = data.user?.id ?? null;
    this.bio = data.user_profile?.bio ?? null;
    this.pronouns = data.user_profile?.pronouns ?? null;
    this.badges = data.badges ?? [];
    this.mutualGuilds = data.mutual_guilds ?? [];
    this.mutualFriends = data.mutual_friends ?? null;
    this.premiumSince = data.premium_since ? new Date(data.premium_since) : null;
    this.premiumGuildSince = data.premium_guild_since ? new Date(data.premium_guild_since) : null;
    this.connectedAccounts = data.connected_accounts ?? [];
    return this;
  }
}

exports.Profile = Profile;
