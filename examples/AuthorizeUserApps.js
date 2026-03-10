'use strict';

const Discord = require('@discord-selfbot-sdk/bot');

const client = new Discord.Client();

client.on('ready', async () => {
	console.log('Ready!', client.user.tag);
	await client.installUserApps('936929561302675456'); // Midjourney
});

client.login('token');
