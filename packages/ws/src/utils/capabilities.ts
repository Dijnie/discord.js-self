/** Capability flags for the Discord selfbot gateway IDENTIFY payload */
export const CapabilityFlags = {
	LAZY_USER_NOTES: 1 << 0,
	VERSIONED_READ_STATES: 1 << 2,
	VERSIONED_USER_GUILD_SETTINGS: 1 << 3,
	DEDUPE_USER_OBJECTS: 1 << 4,
	PRIORITIZED_READY_PAYLOAD: 1 << 5,
	MULTIPLE_GUILD_EXPERIMENT_POPULATIONS: 1 << 6,
	NON_CHANNEL_READ_STATES: 1 << 7,
	AUTH_TOKEN_REFRESH: 1 << 8,
	USER_SETTINGS_PROTO: 1 << 10,
	CLIENT_STATE_V2: 1 << 11,
	PASSIVE_GUILD_UPDATE: 1 << 12,
} as const;

/** Default capabilities bitfield (0x57FD = 22525) for selfbot clients */
export const DEFAULT_CAPABILITIES = 22_525;

/** Manages the capabilities bitfield for selfbot gateway identification */
export class CapabilitiesBitField {
	public value: number;

	public constructor(bits: number = DEFAULT_CAPABILITIES) {
		this.value = bits;
	}

	public has(flag: number): boolean {
		return (this.value & flag) === flag;
	}

	public add(flag: number): this {
		this.value |= flag;
		return this;
	}

	public remove(flag: number): this {
		this.value &= ~flag;
		return this;
	}
}
