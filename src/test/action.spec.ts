import Telegraf, { ContextMessageUpdate } from 'telegraf';
// @ts-ignore
import * as Markup from 'telegraf/markup';
import { update } from './../telegrafer';

describe('Telegrafer:action', () => {
  let bot: Telegraf<ContextMessageUpdate>;

  beforeEach(() => {
    bot = new Telegraf('test:token');
  });

  describe('markup', () => {
    it(`should handle "one" action`, (done) => {
      const buttonOne = Markup.callbackButton('One Button', 'one');

      // @ts-ignore
      bot.action(buttonOne.callback_data, (ctx: ContextMessageUpdate) => {
        return ctx.reply('Two!');
      });

      update(bot)
        .action(buttonOne.callback_data)
          .reply()
            .method('sendMessage')
            .data({
              chat_id: 0,
              text: 'Two!',
            })
            .end(done);
    });

    it(`should handle "two" action`, (done) => {
      const buttonTwo =  Markup.callbackButton('Two Button', 'two');

      // @ts-ignore
      bot.action(buttonTwo.callback_data, (ctx: ContextMessageUpdate) => {
        return ctx.reply('One!');
      });

      update(bot)
        .action(buttonTwo.callback_data)
          .reply()
            .method('sendMessage')
            .data({
              chat_id: 0,
              text: 'One!',
            })
            .end(done);
    });

    it(`should set "user" property to state context`, (done) => {
      interface ContextMessageUpdateWithState extends ContextMessageUpdate {
        state: { user: { name: string, age: number }; };
      }

      const buttonCtx =  Markup.callbackButton('Button', 'context');

      // @ts-ignore
      bot.action(buttonCtx.callback_data, (ctx: ContextMessageUpdateWithState) => {
        ctx.state.user = { name: 'Alice', age: 21 };
        return ctx.reply('useContext');
      });

      update(bot)
        .action(buttonCtx.callback_data)
          .ctx((ctx: ContextMessageUpdateWithState) => {
            expect(ctx.state).toMatchObject({ user: { age: 21 }});
            done();
          })
          .reply()
            .method('sendMessage')
            .data({ chat_id: 0, text: 'useContext' });
      });
  });
});
