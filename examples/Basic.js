import { Client } from '@selfbot.js/bot';
const client = new Client({});

client.on('clientReady', async () => {
	console.log(`${client.user.username} is ready!`);
});

client.on('messageCreate', (message) => {
	if (message.content == 'ping') {
		message.reply('pong');
	}
});

client.login(process.env.USER_TOKEN);
