'use strict';

const { ClientApplication } = require('../../../structures/ClientApplication.js');
const { Status } = require('../../../util/Status.js');

let ClientUser;

module.exports = (client, { d: data }, shardId) => {
  if (client.user) {
    client.user._patch(data.user);
  } else {
    ClientUser ??= require('../../../structures/ClientUser.js').ClientUser;
    client.user = new ClientUser(client, data.user);
    client.users.cache.set(client.user.id, client.user);
  }

  for (const guild of data.guilds) {
    client.expectedGuilds.add(guild.id);
    guild.shardId = shardId;
    client.guilds._add(guild);
  }

  // Selfbot-only READY fields — store raw for later use by Phase 3+ features
  if (data.private_channels) {
    client._selfbotPrivateChannels = data.private_channels;
  }

  if (data.relationships) {
    client._selfbotRelationships = data.relationships;
  }

  if (data.read_state) {
    client._selfbotReadState = data.read_state;
  }

  if (data.user_settings_proto !== undefined) {
    client._selfbotUserSettingsProto = data.user_settings_proto;
  }

  if (data.user_guild_settings) {
    client._selfbotUserGuildSettings = data.user_guild_settings;
  }

  if (data.sessions) {
    client._selfbotSessions = data.sessions;
  }

  // application may not be present for user accounts (selfbot)
  if (data.application) {
    if (client.application) {
      client.application._patch(data.application);
    } else {
      client.application = new ClientApplication(client, data.application);
    }
  }

  client.status = Status.WaitingForGuilds;
};
