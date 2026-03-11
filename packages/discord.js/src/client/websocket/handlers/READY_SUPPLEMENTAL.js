'use strict';

module.exports = (client, { d: data }) => {
  // Merge supplemental guild/member/presence data sent after READY
  if (data.merged_members) {
    for (const members of data.merged_members) {
      for (const member of members) {
        if (member.guild_id) {
          const guild = client.guilds.cache.get(member.guild_id);
          if (guild) guild.members._add(member);
        }
      }
    }
  }

  client.emit('readySupplemental', data);
};
