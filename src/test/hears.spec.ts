import Telegraf, { ContextMessageUpdate } from 'telegraf';
import { update } from './../telegrafer';

describe('Telegrafer:hears', () => {
  let bot: Telegraf<ContextMessageUpdate>;

  beforeEach(() => {
    bot = new Telegraf('test:token');
  });

  describe('message handler', () => {
    it(`should handle any message`, (done) => {
      bot.hears(new RegExp(/./), (ctx: ContextMessageUpdate) => {
        ctx.reply('goodbye!');
      });

      update(bot)
        .message('any message')
          .reply()
            .method('sendMessage')
            .data({ chat_id: 0, text: 'goodbye!' })
            .end(done);
    });
  });
});
