import ITelegraf, { ContextMessageUpdate } from 'telegraf';
import * as assert from 'assert';
import { mockCallApiRequest } from './methods/callApi';
import { IApiCallApi, IApiCallApiData } from './interfaces';

export function reply(bot: ITelegraf<ContextMessageUpdate>): IApiCallApi {
  const promises: Array<Promise<any>> = [];
  const callApiRequest = mockCallApiRequest(bot);

  return {
    method(this: IApiCallApi, expectedMethod: string) {
      promises.push(new Promise((r) => callApiRequest.then(([uri]) => {
        const parts = uri.split('/');
        const reqMethod = parts[parts.length - 1];
        assert.strictEqual(reqMethod, expectedMethod);
        r();
      })));

      return this;
    },
    data(this: IApiCallApi, expectedData: IApiCallApiData) {
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
