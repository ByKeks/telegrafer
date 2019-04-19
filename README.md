## Telegrafer

#### About

Telegrafer is a high-level abstraction for testing Telegraf based applications.

#### Installation

Using npm:

```bash
npm install --save-dev telegrafer
```

Using yarn:

```bash
yarn add --dev telegrafer
```

#### Example

Telegrafer is a test framework agnostic, here is an example without using any test framework at all:

```js
import Telegraf from 'telegraf';
import { update } from 'telegrafer';

const bot = new Telegraf('test:token');

bot.start((ctx) => {
  ctx.reply('start');
});

update(bot)
  .command('start')
  .reply()
  .method('sendMessage')
  .data({ chat_id: 0, text: 'start' })
  .end();
```

Here's an example with jest, note you must pass `done` to the `.end` call:

```js
it(`should handle "one" action`, (done) => {
  const buttonOne = Markup.callbackButton('One Button', 'one');

  bot.action(buttonOne.callback_data, (ctx) => {
    return ctx.reply('Two!');
  });

  update(bot)
    .action(buttonOne.callback_data)
    .reply()
    .method('sendMessage')
    .data({ chat_id: 0, text: 'Two!' })
    .end(done);
});
```

#### Documentation
Please see the [documentation](docs/README.md) for all supported methods