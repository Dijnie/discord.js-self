import { Client } from '@discord-selfbot-sdk/bot';

const client = new Client();

client.on('ready', async () => {
	console.log('Ready!', client.user.tag);
	await client.installUserApps('936929561302675456'); // Midjourney
});

client.login(process.env.DISCORD_TOKEN);
