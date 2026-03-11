/**
 * Generates a Chromium brand version list using the same algorithm as the browser.
 * Used to produce a realistic Sec-CH-UA header value.
 */
export function generateBrandVersionList(majorVersion: number): [string, string][] {
	const seed = majorVersion;
	const greasedChars = [' ', '(', ':', '-', '.', '/', ')', ';', '=', '?', '_'];
	const greasedOrder = [
		[0, 1, 2],
		[0, 2, 1],
		[1, 0, 2],
		[1, 2, 0],
		[2, 0, 1],
		[2, 1, 0],
	];
	const order = greasedOrder[seed % greasedOrder.length]!;
	const greasedVersion = (seed % 99) + 13;
	const greasedBrand = `Not${greasedChars[seed % greasedChars.length]}A${greasedChars[(seed + 1) % greasedChars.length]}Brand`;
	const brands: [string, string][] = [
		[greasedBrand, String(greasedVersion)],
		['Chromium', String(majorVersion)],
		['Google Chrome', String(majorVersion)],
	];
	return order.map((i) => brands[i]!);
}

/**
 * Generates client hint headers for a given Chrome major version.
 * Returns Sec-CH-UA, Sec-CH-UA-Mobile, and Sec-CH-UA-Platform.
 */
export function generateClientHints(majorVersion: number): Record<string, string> {
	const brands = generateBrandVersionList(majorVersion);
	return {
		'Sec-CH-UA': brands.map(([name, ver]) => `"${name}";v="${ver}"`).join(', '),
		'Sec-CH-UA-Mobile': '?0',
		'Sec-CH-UA-Platform': '"Windows"',
	};
}
