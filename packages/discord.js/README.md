# @selfbot.js/bot

A Discord selfbot SDK based on discord.js v14.

## Installation

```bash
# From the monorepo root:
pnpm install
pnpm build
```

## Quick Start

```js
const { Client } = require('@selfbot.js/bot');

const client = new Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login('your-user-token');
```

## Key Differences from discord.js

| Feature | discord.js | @selfbot.js/bot |
|---------|-----------|----------------|
| Auth | Bot token with "Bot " prefix | Raw user token |
| Gateway | /gateway/bot with intents | /gateway with capabilities |
| Headers | Minimal | Browser-like (Chrome UA, Sec-CH-UA) |
| TLS | Default Node.js | Chrome cipher suite |
| Sharding | Multi-shard | Single shard only |
| Features | Bot features | User features (relationships, notes, profiles) |

## Selfbot-only Features

- `client.relationships` — Friend/block management
- `client.notes` — User notes
- `client.sessions` — Active sessions
- `client.readStates` — Read state tracking
- `client.billing` — Payment info
- `client.affinities` — User/guild affinities
- `client.library` — Game library
- `client.authorizedApps` — OAuth2 apps
- `user.fetchProfile()` — User profiles with bio, badges
- Relationship events, call events, session events

## Disclaimer

This SDK is for educational purposes. Using selfbots may violate Discord's Terms of Service. Use at your own risk.
