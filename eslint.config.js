import { defineConfig } from 'eslint/config';
import common from 'eslint-config-neon/common';
import node from 'eslint-config-neon/node';
import prettier from 'eslint-config-neon/prettier';
import typescript from 'eslint-config-neon/typescript';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import merge from 'lodash.merge';

const commonFiles = '{js,mjs,cjs,ts,mts,cts,jsx,tsx}';

const commonRuleset = merge(...common, { files: [`**/*${commonFiles}`] });

const nodeRuleset = merge(...node, {
	files: [`**/*${commonFiles}`],
	rules: {
		'no-restricted-globals': 0,
		'n/prefer-global/buffer': [2, 'never'],
		'n/prefer-global/console': [2, 'always'],
		'n/prefer-global/process': [2, 'never'],
		'n/prefer-global/text-decoder': [2, 'always'],
		'n/prefer-global/text-encoder': [2, 'always'],
		'n/prefer-global/url-search-params': [2, 'always'],
		'n/prefer-global/url': [2, 'always'],
	},
});

const typeScriptRuleset = merge(...typescript, {
	files: [`**/*${commonFiles}`],
	ignores: [`packages/discord.js/**/*.{js,mjs,cjs}`],
	languageOptions: {
		parserOptions: {
			warnOnUnsupportedTypeScriptVersion: false,
			allowAutomaticSingleRunInference: true,
			project: ['tsconfig.eslint.json', 'packages/*/tsconfig.eslint.json'],
		},
	},
	rules: {
		'@typescript-eslint/consistent-type-definitions': [2, 'interface'],
		'@typescript-eslint/naming-convention': [
			2,
			{
				selector: 'typeParameter',
				format: ['PascalCase'],
				custom: {
					regex: '^\\w{3,}',
					match: true,
				},
			},
		],
	},
	settings: {
		'import-x/resolver-next': [
			createTypeScriptImportResolver({
				noWarnOnMultipleProjects: true,
				project: ['tsconfig.eslint.json', 'packages/*/tsconfig.eslint.json'],
			}),
		],
	},
});

const prettierRuleset = merge(...prettier, { files: [`**/*${commonFiles}`] });

export default defineConfig(
	{
		ignores: [
			'**/node_modules/',
			'.git/',
			'**/dist/',
			'**/coverage/',
		],
	},
	commonRuleset,
	nodeRuleset,
	typeScriptRuleset,
	{
		files: ['**/*{ts,mts,cts,tsx}'],
		rules: { 'jsdoc/no-undefined-types': 0 },
	},
	{
		files: [`packages/ws/**/*${commonFiles}`],
		rules: { 'n/no-sync': 0 },
	},
	{
		files: [`packages/discord.js/**/*.{js,cjs}`],
		languageOptions: {
			sourceType: 'commonjs',
			parserOptions: {
				ecmaFeatures: {
					impliedStrict: false,
				},
			},
		},
		settings: {
			jsdoc: {
				tagNamePreference: {
					augments: 'extends',
					fires: 'emits',
					function: 'method',
				},
				preferredTypes: {
					object: 'Object',
					null: 'void',
				},
			},
		},
		rules: {
			'jsdoc/no-undefined-types': 0,
			'jsdoc/no-defaults': 0,
			'no-eq-null': 0,
			strict: ['error', 'global'],
		},
	},
	{
		files: [`packages/discord.js/typings/*{d.ts,test-d.ts,d.mts,test-d.mts}`],
		rules: {
			'@typescript-eslint/no-unsafe-declaration-merging': 0,
			'@typescript-eslint/no-empty-object-type': 0,
			'@typescript-eslint/no-use-before-define': 0,
			'@typescript-eslint/consistent-type-imports': 0,
			'@stylistic/lines-between-class-members': 0,
			'@typescript-eslint/no-duplicate-type-constituents': 0,
		},
	},
	{
		files: [`packages/rest/**/*${commonFiles}`],
		rules: {
			'unicorn/prefer-node-protocol': 0,
		},
	},
	{
		files: [`packages/structures/**/*${commonFiles}`],
		rules: {
			'@typescript-eslint/no-empty-interface': 0,
			'@typescript-eslint/no-empty-object-type': 0,
			'@typescript-eslint/no-unsafe-declaration-merging': 0,
		},
	},
	{
		files: ['**/*{js,mjs,cjs,jsx}'],
		rules: { 'tsdoc/syntax': 0 },
	},
	prettierRuleset,
);
