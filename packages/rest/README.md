<div align="center">
	<br />
	<p>
		<a href="https://discord.js.org"><img src="https://discord.js.org/static/logo.svg" width="546" alt="discord.js" /></a>
	</p>
	<br />
	<p>
		<a href="https://www.npmjs.com/package/@discord-selfbot-sdk/rest"><img src="https://img.shields.io/npm/v/@discord-selfbot-sdk/rest.svg?maxAge=3600" alt="npm version" /></a>
		<a href="https://www.npmjs.com/package/@discord-selfbot-sdk/rest"><img src="https://img.shields.io/npm/dt/@discord-selfbot-sdk/rest.svg?maxAge=3600" alt="npm downloads" /></a>
		<a href="https://github.com/Dijnie/discord.js-self/actions"><img src="https://github.com/Dijnie/discord.js-self/actions/workflows/tests.yml/badge.svg" alt="Tests status" /></a>
		<a href="https://github.com/Dijnie/discord.js-self/commits/main/packages/rest"><img alt="Last commit." src="https://img.shields.io/github/last-commit/Dijnie/discord.js-self?logo=github&logoColor=ffffff&path=packages%2Frest" /></a>
	</p>
</div>

## About

`@discord-selfbot-sdk/rest` is a module that allows you to easily make REST requests to the Discord API.

## Installation

**Node.js 22.12.0 or newer is required.**

```sh
npm install @discord-selfbot-sdk/rest
yarn add @discord-selfbot-sdk/rest
pnpm add @discord-selfbot-sdk/rest
bun add @discord-selfbot-sdk/rest
```

## Examples

Install all required dependencies:

```sh
npm install @discord-selfbot-sdk/rest discord-api-types
yarn add @discord-selfbot-sdk/rest discord-api-types
pnpm add @discord-selfbot-sdk/rest discord-api-types
bun add @discord-selfbot-sdk/rest discord-api-types
```

Send a basic message:

```js
import { REST } from '@discord-selfbot-sdk/rest';
import { Routes } from 'discord-api-types/v10';

const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
	await rest.post(Routes.channelMessages(CHANNEL_ID), {
		body: {
			content: 'A message via REST!',
		},
	});
} catch (error) {
	console.error(error);
}
```

Create a thread from an existing message to be archived after 60 minutes of inactivity:

```js
import { REST } from '@discord-selfbot-sdk/rest';
import { Routes } from 'discord-api-types/v10';

const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
	await rest.post(Routes.threads(CHANNEL_ID, MESSAGE_ID), {
		body: {
			name: 'Thread',
			auto_archive_duration: 60,
		},
	});
} catch (error) {
	console.error(error);
}
```

Send a basic message in an edge environment:

```js
import { REST } from '@discord-selfbot-sdk/rest';
import { Routes } from 'discord-api-types/v10';

const rest = new REST({ version: '10', makeRequest: fetch }).setToken(TOKEN);

try {
	await rest.post(Routes.channelMessages(CHANNEL_ID), {
		body: {
			content: 'A message via REST from the edge!',
		},
	});
} catch (error) {
	console.error(error);
}
```

## Links

- [GitHub][source]
- [npm][npm]
- [Related libraries][related-libs]

## Contributing

See [the contribution guide][contributing] if you'd like to submit a PR.

[source]: https://github.com/Dijnie/discord.js-self/tree/main/packages/rest
[npm]: https://www.npmjs.com/package/@discord-selfbot-sdk/rest
[related-libs]: https://discord.com/developers/docs/topics/community-resources#libraries
[contributing]: https://github.com/Dijnie/discord.js-self/blob/main/.github/CONTRIBUTING.md
