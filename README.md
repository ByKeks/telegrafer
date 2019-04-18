# Telegrafer

## About

The motivation with this module is to provide a high-level abstraction for testing Telegraf based applications.

## Installation

Using npm:

```bash
npm install --save-dev telegrafer
```

Using yarn:

```bash
yarn add --dev telegrafer
```

## Example

```ts
import Telegraf, { ContextMessageUpdate } from 'telegraf';
import { update } from 'telegrafer';

const bot: Telegraf<ContextMessageUpdate> = new Telegraf('test:token');

bot.start((ctx: ContextMessageUpdate) => {
  ctx.reply('start');
});

update(bot)
  .command('start')
  .reply()
  .method('sendMessage')
  .data({ chat_id: 0, text: 'start' })
  .end();
```

## API 