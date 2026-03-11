const { Client } = require('@selfbot.js/bot');

const client = new Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);

  // List friends
  const friends = client.relationships.cache.filter(r => r.isFriend);
  console.log(`Friends (${friends.size}):`);
  friends.forEach(r => console.log(`  - ${r.user.tag}`));

  // List blocked users
  const blocked = client.relationships.cache.filter(r => r.isBlocked);
  console.log(`Blocked (${blocked.size}):`);
  blocked.forEach(r => console.log(`  - ${r.user.tag}`));

  // List pending requests
  const incoming = client.relationships.cache.filter(r => r.isIncomingRequest);
  console.log(`Incoming requests (${incoming.size}):`);
  incoming.forEach(r => console.log(`  - ${r.user.tag}`));
});

client.on('relationshipAdd', (relationship) => {
  console.log(`New relationship: ${relationship.user.tag} (${relationship.typeName})`);
});

client.on('relationshipRemove', (relationship) => {
  console.log(`Removed relationship: ${relationship.user?.tag ?? relationship.id}`);
});

client.login(process.env.USER_TOKEN);
