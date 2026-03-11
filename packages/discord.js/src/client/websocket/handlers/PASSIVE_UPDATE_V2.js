'use strict';

module.exports = (client, { d: data }) => {
  // Contains: guild_id, removed_voice_states, updated_channels, updated_members, updated_voice_states
  const guild = client.guilds.cache.get(data.guild_id);
  if (!guild) return;

  if (data.updated_channels) {
    for (const channelData of data.updated_channels) {
      const channel = guild.channels.cache.get(channelData.id);
      if (channel) channel._patch(channelData);
    }
  }

  client.emit('passiveGuildUpdate', data);
};
