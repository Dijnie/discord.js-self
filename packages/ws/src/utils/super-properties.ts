import { randomUUID } from 'node:crypto';
import { DEFAULT_CAPABILITIES } from './capabilities.js';

export { DEFAULT_CAPABILITIES };

const FALLBACK_BUILD_NUMBER = 348_875;
const FALLBACK_BROWSER_VERSION = 136;

export async function fetchBuildNumber(): Promise<number> {
	try {
		const resp = await fetch('https://cordapi.dolfi.es/api/v2/properties/web');
		const data = (await resp.json()) as any;
		return data.properties?.client_build_number ?? FALLBACK_BUILD_NUMBER;
	} catch {
		return FALLBACK_BUILD_NUMBER;
	}
}

export async function fetchBrowserVersion(): Promise<number> {
	try {
		const resp = await fetch('https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/stable/versions');
		const data = (await resp.json()) as any;
		return parseInt(data.versions[0].version.split('.')[0], 10);
	} catch {
		return FALLBACK_BROWSER_VERSION;
	}
}

/**
 * Wraps super properties with additional gateway-specific fields required for the IDENTIFY payload.
 */
export function getGatewayProperties(superProperties: Record<string, unknown>): Record<string, unknown> {
	return {
		...superProperties,
		is_fast_connect: false,
		latest_headless_tasks: [],
		latest_headless_task_run_seconds_before: null,
		gateway_connect_reasons: 'AppSkeleton',
	};
}

export function generateSuperProperties(buildNumber: number, browserVersion: number): Record<string, unknown> {
	return {
		os: 'Windows',
		browser: 'Chrome',
		device: '',
		system_locale: 'en-US',
		browser_user_agent: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${browserVersion}.0.0.0 Safari/537.36`,
		browser_version: `${browserVersion}.0.0.0`,
		os_version: '10',
		referrer: '',
		referring_domain: '',
		referrer_current: '',
		referring_domain_current: '',
		release_channel: 'stable',
		client_build_number: buildNumber,
		client_event_source: null,
		has_client_mods: false,
		client_launch_id: randomUUID(),
		client_app_state: 'unfocused',
		client_heartbeat_session_id: randomUUID(),
	};
}
