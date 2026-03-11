import process from 'node:process';
import { Collection } from '@discordjs/collection';
import { lazy } from '@discordjs/util';
import { APIVersion, GatewayOpcodes } from 'discord-api-types/v10';
import { SimpleShardingStrategy } from '../strategies/sharding/SimpleShardingStrategy.js';
import { SimpleIdentifyThrottler } from '../throttling/SimpleIdentifyThrottler.js';
import type { SessionInfo, OptionalWebSocketManagerOptions, WebSocketManager } from '../ws/WebSocketManager.js';
import type { SendRateLimitState } from '../ws/WebSocketShard.js';

/**
 * Valid encoding types
 */
export enum Encoding {
	JSON = 'json',
}

/**
 * Valid compression methods
 */
export enum CompressionMethod {
	ZlibNative,
	ZlibSync,
	ZstdNative,
}

export const DefaultDeviceProperty = `@selfbot.js/ws [VI]{{inject}}[/VI]` as `@selfbot.js/ws ${string}`;

const getDefaultSessionStore = lazy(() => new Collection<number, SessionInfo | null>());

export const CompressionParameterMap = {
	[CompressionMethod.ZlibNative]: 'zlib-stream',
	[CompressionMethod.ZlibSync]: 'zlib-stream',
	[CompressionMethod.ZstdNative]: 'zstd-stream',
} as const satisfies Record<CompressionMethod, string>;

/**
 * Default options used by the manager
 */
export const DefaultWebSocketManagerOptions = {
	async buildIdentifyThrottler(_manager: WebSocketManager) {
		// Selfbot: single shard, max_concurrency = 1
		return new SimpleIdentifyThrottler(1);
	},
	buildStrategy: (manager) => new SimpleShardingStrategy(manager),
	shardCount: 1,
	shardIds: [0],
	largeThreshold: null,
	initialPresence: null,
	superProperties: null,
	identifyProperties: {
		browser: DefaultDeviceProperty,
		device: DefaultDeviceProperty,
		os: process.platform,
	},
	version: APIVersion,
	encoding: Encoding.JSON,
	compression: null,
	useIdentifyCompression: false,
	retrieveSessionInfo(shardId) {
		const store = getDefaultSessionStore();
		return store.get(shardId) ?? null;
	},
	updateSessionInfo(shardId: number, info: SessionInfo | null) {
		const store = getDefaultSessionStore();
		if (info) {
			store.set(shardId, info);
		} else {
			store.delete(shardId);
		}
	},
	handshakeTimeout: 30_000,
	helloTimeout: 60_000,
	readyTimeout: 15_000,
} as const satisfies Omit<OptionalWebSocketManagerOptions, 'fetchGatewayInformation' | 'token'>;

export const ImportantGatewayOpcodes = new Set([
	GatewayOpcodes.Heartbeat,
	GatewayOpcodes.Identify,
	GatewayOpcodes.Resume,
]);

export function getInitialSendRateLimitState(): SendRateLimitState {
	return {
		sent: 0,
		resetAt: Date.now() + 60_000,
	};
}
