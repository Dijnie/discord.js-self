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

  // Selfbot-only READY fields
  if (data.private_channels) {
    client._selfbotPrivateChannels = data.private_channels;
  }

  // Populate relationships manager
  if (data.relationships) {
    for (const rel of data.relationships) {
      client.relationships._add(rel);
    }
  }

  // Populate notes manager
  if (data.notes) {
    for (const [userId, note] of Object.entries(data.notes)) {
      client.notes._add(userId, note);
    }
  }

  // Populate read states manager
  if (data.read_state?.entries) {
    for (const rs of data.read_state.entries) {
      client.readStates._add(rs);
    }
  }

  // Populate sessions manager
  if (data.sessions) {
    client.sessions._patch(data.sessions);
  }

  if (data.user_settings_proto !== undefined) {
    client._selfbotUserSettingsProto = data.user_settings_proto;
  }

  if (data.user_guild_settings) {
    client._selfbotUserGuildSettings = data.user_guild_settings;
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
