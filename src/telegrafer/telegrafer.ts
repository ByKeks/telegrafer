import ITelegraf, { ContextMessageUpdate } from 'telegraf';
import * as assert from 'assert';
import * as nock from 'nock';

import { ICommand, IReply, IApiCall, IApiCallData } from './interfaces';
import { makeCommand } from './utils';

export function update(bot: ITelegraf<ContextMessageUpdate>): ICommand {
  return {
    command(commandName: string) {
      return command(bot, commandName);
    },
    start() {
      return this.command('start');
    },
    help() {
      return this.command('help');
    },
    settings() {
      return this.command('settings');
    },
  };
}

function command(bot: ITelegraf<ContextMessageUpdate>, commandName: string): IReply {
  return {
    reply() {
      return reply(bot, commandName);
    },
  };
}

function reply(bot: ITelegraf<ContextMessageUpdate>, commandName: string): IApiCall {
  const method = 'sendMessage';
  const promises: Array<Promise<any>> = [];
  const callApiRequest = mockCallApiRequest(bot, method);

  bot.handleUpdate(makeCommand(commandName));

  return {
    method(this: IApiCall, expectedMethod: string) {
      promises.push(new Promise((r) => callApiRequest.then(([uri]) => {
        const parts = uri.split('/');
        const reqMethod = parts[parts.length - 1];
        assert.strictEqual(reqMethod, expectedMethod);
        r();
      })));

      return this;
    },
    data(this: IApiCall, expectedData: IApiCallData) {
      promises.push(new Promise((r) => callApiRequest.then(([_, data]) => {
        assert.deepEqual(data, expectedData);
        r();
      })));

      return this;
    },
    end: (cb: () => any = () => null) => {
      Promise
        .all(promises)
        .then(() => cb());

      return this;
    },
  };
}

function mockCallApiRequest(bot: ITelegraf<ContextMessageUpdate>, method: string) {
  // FIXME: telegraf/typings: add "options" in telegram type
  // @ts-ignore
  const apiRoot = bot.telegram.options.apiRoot;
  const apiUrl = `${apiRoot}/bot${bot.token}`;

  return new Promise((resolve) => {
    nock.disableNetConnect();

    nock(apiUrl)
      .persist()
      .post(/.*/)
      .once()
      .reply((uri, requestBody) => {
        resolve([uri, requestBody]);

        nock.cleanAll();
        nock.enableNetConnect();

        return [
          200, {
            ok: true,
            data: requestBody,
          },
        ];
      });
  });
}
