import Telegraf, { ContextMessageUpdate } from 'telegraf';
import { update } from './../telegrafer';

describe('Telegrafer:command', () => {
  let bot: Telegraf<ContextMessageUpdate>;

  beforeEach(() => {
    bot = new Telegraf('test:token');
  });

  describe('"onStart" handler', () => {
    it(`should handle "start" command`, (done) => {
      bot.start((ctx: ContextMessageUpdate) => {
        ctx.reply('start');
      });

      update(bot)
        .command('start')
          .reply()
            .method('sendMessage')
            .data({ chat_id: 0, text: 'start' })
            .end(done);
    });
  });

  describe('"onHelp" handler', () => {
    it(`should handle "help" command`, (done) => {
      bot.help((ctx: ContextMessageUpdate) => {
        ctx.reply('help');
      });

      update(bot)
        .command('help')
          .reply()
            .method('sendMessage')
            .data({ chat_id: 0, text: 'help' })
            .end(done);
    });
  });

  describe('"onSettings" handler', () => {
    it(`should handle "settings" command`, (done) => {
      bot.command('settings', (ctx: ContextMessageUpdate) => {
        ctx.reply('settings');
      });

      update(bot)
        .command('settings')
        .reply()
          .method('sendMessage')
          .data({ chat_id: 0, text: 'settings' })
          .end(done);
    });
  });

  describe('"onFoo" handler', () => {
    it(`should handle "foo" command`, (done) => {
      bot.command('foo', (ctx: ContextMessageUpdate) => {
        ctx.reply('foo');
      });

      update(bot)
        .command('foo')
        .reply()
          .method('sendMessage')
          .data({ chat_id: 0, text: 'foo' })
          .end(done);
    });
  });

  describe('context', () => {
    it(`should set "user" property to state context`, (done) => {
      interface ContextMessageUpdateWithState extends ContextMessageUpdate {
        state: { user: { name: string, age: number }; };
      }

      bot.command('useContext', (ctx: ContextMessageUpdateWithState) => {
        ctx.state.user = { name: 'Alice', age: 21 };
        ctx.reply('useContext');
      });

      update(bot)
        .command('useContext')
          .ctx((ctx: ContextMessageUpdateWithState) => {
            expect(ctx.state).toMatchObject({ user: { name: 'Alice' }});
            done();
          })
          .reply()
            .method('sendMessage')
            .data({ chat_id: 0, text: 'useContext' });
      });
  });
});
