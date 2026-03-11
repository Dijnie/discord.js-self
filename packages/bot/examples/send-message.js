const { Client } = require('@selfbot.js/bot');

const client = new Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  // Only respond to own messages (selfbot pattern)
  if (message.author.id !== client.user.id) return;

  if (message.content === '!ping') {
    const sent = await message.channel.send('Pong!');
    console.log(`Replied in ${sent.createdTimestamp - message.createdTimestamp}ms`);
  }
});

client.login(process.env.USER_TOKEN);
