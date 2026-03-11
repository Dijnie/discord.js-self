import { Client } from '@selfbot.js/bot';

const client = new Client();

// Log all emitted events
const origEmit = client.emit.bind(client);
client.emit = (event, ...args) => {
	console.log(`[EVENT] ${event}`);
	return origEmit(event, ...args);
};

client.on('clientReady', () => {
	console.log(`[READY] ${client.user.username}`);
});

client.on('error', (err) => {
	console.error('[ERROR]', err);
});

client.on('debug', (msg) => {
	console.log(`[DEBUG] ${msg}`);
});

client.on('warn', (msg) => {
	console.warn(`[WARN] ${msg}`);
});

console.log('[START] Calling client.login()...');
console.log('[TOKEN] Length:', process.env.USER_TOKEN?.length);

client
	.login(process.env.USER_TOKEN)
	.then(() => console.log('[LOGIN] Promise resolved'))
	.catch((err) => console.error('[LOGIN ERROR]', err));
