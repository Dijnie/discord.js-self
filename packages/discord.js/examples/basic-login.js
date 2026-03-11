const { Client } = require('@selfbot.js/bot');

const client = new Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log(`Guilds: ${client.guilds.cache.size}`);
  console.log(`Relationships: ${client.relationships.cache.size}`);
});

client.on('debug', console.log);

client.login(process.env.DISCORD_TOKEN);
