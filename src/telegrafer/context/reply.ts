import ITelegraf, { ContextMessageUpdate } from 'telegraf';
import * as assert from 'assert';
import { mockCallApiRequest } from './../mocks';
import { CallApi, CallApiData } from './../../interfaces';

export function reply(bot: ITelegraf<ContextMessageUpdate>): CallApi {
  const promises: Promise<any>[] = [];
  const callApiRequest = mockCallApiRequest(bot);

  return {
    method(this: CallApi, expectedMethod: string) {
      promises.push(new Promise((r) => callApiRequest.then(([uri]) => {
        const parts = uri.split('/');
        const reqMethod = parts[parts.length - 1];
        assert.strictEqual(reqMethod, expectedMethod);
        r();
      })));

      return this;
    },
    data(this: CallApi, expectedData: CallApiData) {
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
    },
  };
}
