import { Client } from '@selfbot.js/bot';

const client = new Client();

client.on('ready', async () => {
	console.log('Ready!', client.user.tag);
	await client.installUserApps('936929561302675456'); // Midjourney
});

client.login(process.env.USER_TOKEN);
