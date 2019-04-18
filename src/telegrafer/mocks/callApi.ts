import ITelegraf, { ContextMessageUpdate } from 'telegraf';
import * as nock from 'nock';

export function mockCallApiRequest(bot: ITelegraf<ContextMessageUpdate>) {
  // FIXME: telegraf/typings: add "options" in telegram type
  // @ts-ignore
  const apiRoot = bot.telegram.options.apiRoot;
  const apiUrl = `${apiRoot}/bot${bot.token}`;

  return new Promise((resolve) => {
    nock.disableNetConnect();

    nock(apiUrl)
      .persist()
      .post(/.*/)
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
