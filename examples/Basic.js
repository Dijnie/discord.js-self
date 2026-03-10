import { Client } from '@discord-selfbot-sdk/bot';
const client = new Client();

client.on('clientReady', async () => {
	console.log(`${client.user.username} is ready!`);
});

client.on('messageCreate', (message) => {
	if (message.content == 'ping') {
		message.reply('pong');
	}
});

client.login(process.env.DISCORD_TOKEN);
