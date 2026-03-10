<div align="center">
	<br />
	<p>
		<a href="https://discord.js.org"><img src="https://discord.js.org/static/logo.svg" width="546" alt="discord.js" /></a>
	</p>
	<br />
	<p>
		<a href="https://www.npmjs.com/package/@discord-selfbot-sdk/ws"><img src="https://img.shields.io/npm/v/@discord-selfbot-sdk/ws.svg?maxAge=3600" alt="npm version" /></a>
		<a href="https://www.npmjs.com/package/@discord-selfbot-sdk/ws"><img src="https://img.shields.io/npm/dt/@discord-selfbot-sdk/ws.svg?maxAge=3600" alt="npm downloads" /></a>
		<a href="https://github.com/Dijnie/discord.js-self/actions"><img src="https://github.com/Dijnie/discord.js-self/actions/workflows/tests.yml/badge.svg" alt="Build status" /></a>
		<a href="https://github.com/Dijnie/discord.js-self/commits/main/packages/ws"><img alt="Last commit." src="https://img.shields.io/github/last-commit/Dijnie/discord.js-self?logo=github&logoColor=ffffff&path=packages%2Fws" /></a>
	</p>
</div>

## About

`@discord-selfbot-sdk/ws` is a powerful wrapper around Discord's gateway.

## Installation

**Node.js 22.12.0 or newer is required.**

```sh
npm install @discord-selfbot-sdk/ws
yarn add @discord-selfbot-sdk/ws
pnpm add @discord-selfbot-sdk/ws
bun add @discord-selfbot-sdk/ws
```

### Optional packages

- [zlib-sync](https://www.npmjs.com/package/zlib-sync) for WebSocket data compression and inflation (`npm install zlib-sync`)
- [bufferutil](https://www.npmjs.com/package/bufferutil) for a much faster WebSocket connection (`npm install bufferutil`)

## Example usage

The example uses [ES modules](https://nodejs.org/api/esm.html#enabling).

```ts
import { WebSocketManager, WebSocketShardEvents, CompressionMethod } from '@discord-selfbot-sdk/ws';
import { REST } from '@discord-selfbot-sdk/rest';
import type { RESTGetAPIGatewayBotResult } from 'discord-api-types/v10';

const rest = new REST().setToken(process.env.DISCORD_TOKEN);
// This example will spawn Discord's recommended shard count, all under the current process.
const manager = new WebSocketManager({
	token: process.env.DISCORD_TOKEN,
	intents: 0, // for no intents
	fetchGatewayInformation() {
		return rest.get(Routes.gatewayBot()) as Promise<RESTGetAPIGatewayBotResult>;
	},
	// uncomment if you have zlib-sync installed and want to use compression
	// compression: CompressionMethod.ZlibSync,

	// alternatively, we support compression using node's native `node:zlib` module:
	// compression: CompressionMethod.ZlibNative,
});

manager.on(WebSocketShardEvents.Dispatch, (event) => {
	// Process gateway events here.
});

await manager.connect();
```

### Specify shards

```ts
// Spawn 4 shards
const manager = new WebSocketManager({
	token: process.env.DISCORD_TOKEN,
	intents: 0,
	shardCount: 4,
	fetchGatewayInformation() {
		return rest.get(Routes.gatewayBot()) as Promise<RESTGetAPIGatewayBotResult>;
	},
});

// The manager also supports being responsible for only a subset of your shards:

// Your bot will run 8 shards overall
// This manager will only take care of 0, 2, 4, and 6
const manager = new WebSocketManager({
	token: process.env.DISCORD_TOKEN,
	intents: 0,
	shardCount: 8,
	shardIds: [0, 2, 4, 6],
	fetchGatewayInformation() {
		return rest.get(Routes.gatewayBot()) as Promise<RESTGetAPIGatewayBotResult>;
	},
});

// Alternatively, if your shards are consecutive, you can pass in a range
const manager = new WebSocketManager({
	token: process.env.DISCORD_TOKEN,
	intents: 0,
	shardCount: 8,
	shardIds: {
		start: 0,
		end: 4,
	},
	fetchGatewayInformation() {
		return rest.get(Routes.gatewayBot()) as Promise<RESTGetAPIGatewayBotResult>;
	},
});
```

### Specify `worker_threads`

You can also have the shards spawn in worker threads:

```ts
import { WebSocketManager, WorkerShardingStrategy } from '@discord-selfbot-sdk/ws';
import { REST } from '@discord-selfbot-sdk/rest';

const rest = new REST().setToken(process.env.DISCORD_TOKEN);
const manager = new WebSocketManager({
	token: process.env.DISCORD_TOKEN,
	intents: 0,
	shardCount: 6,
	fetchGatewayInformation() {
		return rest.get(Routes.gatewayBot()) as Promise<RESTGetAPIGatewayBotResult>;
	},
	// This will cause 3 workers to spawn, 2 shards per each
	buildStrategy: (manager) => new WorkerShardingStrategy(manager, { shardsPerWorker: 2 }),
	// Or maybe you want all your shards under a single worker
	buildStrategy: (manager) => new WorkerShardingStrategy(manager, { shardsPerWorker: 'all' }),
});
```

**Note**: By default, this will cause the workers to effectively only be responsible for the WebSocket connection, they simply pass up all the events back to the main process for the manager to emit. If you want to have the workers handle events as well, you can pass in a `workerPath` option to the `WorkerShardingStrategy` constructor:

```ts
import { WebSocketManager, WorkerShardingStrategy } from '@discord-selfbot-sdk/ws';
import { REST } from '@discord-selfbot-sdk/rest';

const rest = new REST().setToken(process.env.DISCORD_TOKEN);
const manager = new WebSocketManager({
	token: process.env.DISCORD_TOKEN,
	intents: 0,
	fetchGatewayInformation() {
		return rest.get(Routes.gatewayBot()) as Promise<RESTGetAPIGatewayBotResult>;
	},
	buildStrategy: (manager) =>
		new WorkerShardingStrategy(manager, {
			shardsPerWorker: 2,
			workerPath: './worker.js',
			// Optionally, if you have custom messaging, like for analytic collection, you can use this:
			async unknownPayloadHandler(data: any) {
				// handle data here :3
			},
		}),
});
```

And your `worker.ts` file:

```ts
import { WorkerBootstrapper, WebSocketShardEvents } from '@discord-selfbot-sdk/ws';
import { parentPort } from 'node:worker_threads';

const bootstrapper = new WorkerBootstrapper();
void bootstrapper.bootstrap({
	// Those will be sent to the main thread for the manager to emit
	forwardEvents: [
		WebSocketShardEvents.Closed,
		WebSocketShardEvents.Debug,
		WebSocketShardEvents.Hello,
		WebSocketShardEvents.Ready,
		WebSocketShardEvents.Resumed,
	],
	shardCallback: (shard) => {
		shard.on(WebSocketShardEvents.Dispatch, (event) => {
			// Process gateway events here however you want (e.g. send them through a message broker)
			// You also have access to shard.id if you need it
		});
	},
});

// This will go to `unknownPayloadHandler` in the main thread, or be ignored if not provided
parentPort!.postMessage({ custom: 'data' });
```

## Links

- [GitHub][source]
- [npm][npm]
- [Related libraries][related-libs]

## Contributing

See [the contribution guide][contributing] if you'd like to submit a PR.

[source]: https://github.com/Dijnie/discord.js-self/tree/main/packages/ws
[npm]: https://www.npmjs.com/package/@discord-selfbot-sdk/ws
[related-libs]: https://discord.com/developers/docs/topics/community-resources#libraries
[contributing]: https://github.com/Dijnie/discord.js-self/blob/main/.github/CONTRIBUTING.md
