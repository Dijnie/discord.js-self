<div align="center">
	<br />
	<p>
		<a href="https://discord.js.org"><img src="https://discord.js.org/static/logo.svg" width="546" alt="discord.js" /></a>
	</p>
	<br />
	<p>
		<a href="https://www.npmjs.com/package/@discord-selfbot-sdk/bot"><img src="https://img.shields.io/npm/v/@discord-selfbot-sdk/bot.svg?maxAge=3600" alt="npm version" /></a>
		<a href="https://www.npmjs.com/package/@discord-selfbot-sdk/bot"><img src="https://img.shields.io/npm/dt/@discord-selfbot-sdk/bot.svg?maxAge=3600" alt="npm downloads" /></a>
		<a href="https://github.com/Dijnie/discord.js-self/actions"><img src="https://github.com/Dijnie/discord.js-self/actions/workflows/tests.yml/badge.svg" alt="Tests status" /></a>
		<a href="https://github.com/Dijnie/discord.js-self/commits/main/packages/bot"><img alt="Last commit." src="https://img.shields.io/github/last-commit/Dijnie/discord.js-self?logo=github&logoColor=ffffff&path=packages%2Fbot" /></a>
	</p>
</div>

## About

@discord-selfbot-sdk/bot is a powerful [Node.js](https://nodejs.org) module that allows you to easily interact with the
[Discord API](https://discord.com/developers/docs/intro).

- Object-oriented
- Predictable abstractions
- Performant
- 100% coverage of the Discord API

## Installation

**Node.js 22.12.0 or newer is required.**

```sh
npm install @discord-selfbot-sdk/bot
yarn add @discord-selfbot-sdk/bot
pnpm add @discord-selfbot-sdk/bot
bun add @discord-selfbot-sdk/bot
```

### Optional packages

- [zlib-sync](https://www.npmjs.com/package/zlib-sync) for WebSocket data compression and inflation (`npm install zlib-sync`)
- [bufferutil](https://www.npmjs.com/package/bufferutil) for a much faster WebSocket connection (`npm install bufferutil`)

## Example usage

Install @discord-selfbot-sdk/bot:

```sh
npm install @discord-selfbot-sdk/bot
yarn add @discord-selfbot-sdk/bot
pnpm add @discord-selfbot-sdk/bot
bun add @discord-selfbot-sdk/bot
```

These examples use [ES modules](https://nodejs.org/api/esm.html#enabling).

Register a slash command against the Discord API:

```js
import { REST, Routes } from '@discord-selfbot-sdk/bot';

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}
```

Afterwards we can create a quite simple example bot:

```js
import { Client, Events, GatewayIntentBits } from '@discord-selfbot-sdk/bot';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(TOKEN);
```

## Links

- [GitHub][source]
- [npm][npm]
- [Related libraries][related-libs]

## Contributing

See [the contribution guide][contributing] if you'd like to submit a PR.

[source]: https://github.com/Dijnie/discord.js-self/tree/main/packages/bot
[npm]: https://www.npmjs.com/package/@discord-selfbot-sdk/bot
[related-libs]: https://discord.com/developers/docs/topics/community-resources#libraries
[contributing]: https://github.com/Dijnie/discord.js-self/blob/main/.github/CONTRIBUTING.md
