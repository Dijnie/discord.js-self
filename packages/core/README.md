<div align="center">
	<br />
	<p>
		<a href="https://discord.js.org"><img src="https://discord.js.org/static/logo.svg" width="546" alt="discord.js" /></a>
	</p>
	<br />
	<p>
		<a href="https://www.npmjs.com/package/@discord-selfbot-sdk/core"><img src="https://img.shields.io/npm/v/@discord-selfbot-sdk/core.svg?maxAge=3600" alt="npm version" /></a>
		<a href="https://www.npmjs.com/package/@discord-selfbot-sdk/core"><img src="https://img.shields.io/npm/dt/@discord-selfbot-sdk/core.svg?maxAge=3600" alt="npm downloads" /></a>
		<a href="https://github.com/Dijnie/discord.js-self/actions"><img src="https://github.com/Dijnie/discord.js-self/actions/workflows/tests.yml/badge.svg" alt="Build status" /></a>
		<a href="https://github.com/Dijnie/discord.js-self/commits/main/packages/core"><img alt="Last commit." src="https://img.shields.io/github/last-commit/Dijnie/discord.js-self?logo=github&logoColor=ffffff&path=packages%2Fcore" /></a>
	</p>
</div>

## About

`@discord-selfbot-sdk/core` is a thinly abstracted wrapper around the "core" components of the Discord API: REST, and gateway.

## Installation

**Node.js 22.12.0 or newer is required.**

```sh
npm install @discord-selfbot-sdk/core
yarn add @discord-selfbot-sdk/core
pnpm add @discord-selfbot-sdk/core
```

## Example usage

These examples use [ES modules](https://nodejs.org/api/esm.html#enabling).

```ts
import {
	Client,
	GatewayDispatchEvents,
	GatewayIntentBits,
	InteractionType,
	MessageFlags,
	type RESTGetAPIGatewayBotResult,
} from '@discord-selfbot-sdk/core';
import { REST } from '@discord-selfbot-sdk/rest';
import { WebSocketManager } from '@discord-selfbot-sdk/ws';

// Create REST and WebSocket managers directly
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

const gateway = new WebSocketManager({
	token: process.env.DISCORD_TOKEN,
	intents: GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
	fetchGatewayInformation: () => rest.get('/gateway/bot') as Promise<RESTGetAPIGatewayBotResult>,
});

// Create a client to emit relevant events.
const client = new Client({ rest, gateway });

// Listen for interactions
// Each event contains an `api` prop along with the event data that allows you to interface with the Discord REST API
client.on(GatewayDispatchEvents.InteractionCreate, async ({ data: interaction, api }) => {
	if (interaction.type !== InteractionType.ApplicationCommand || interaction.data.name !== 'ping') {
		return;
	}

	await api.interactions.reply(interaction.id, interaction.token, { content: 'Pong!', flags: MessageFlags.Ephemeral });
});

// Listen for the ready event
client.once(GatewayDispatchEvents.Ready, () => console.log('Ready!'));

// Start the WebSocket connection.
gateway.connect();
```

## Independent REST API Usage

```ts
import { API } from '@discord-selfbot-sdk/core/http-only';
import { REST } from '@discord-selfbot-sdk/rest';

// Create REST instance
const rest = new REST({ version: '10' }).setToken(token);

// Pass into API
const api = new API(rest);

// Fetch a guild using the API wrapper
const guild = await api.guilds.get('1234567891011');
```

## Links

- [GitHub][source]
- [npm][npm]
- [Related libraries][related-libs]

## Contributing

See [the contribution guide][contributing] if you'd like to submit a PR.

[source]: https://github.com/Dijnie/discord.js-self/tree/main/packages/core
[npm]: https://www.npmjs.com/package/@discord-selfbot-sdk/core
[related-libs]: https://discord.com/developers/docs/topics/community-resources#libraries
[contributing]: https://github.com/Dijnie/discord.js-self/blob/main/.github/CONTRIBUTING.md
