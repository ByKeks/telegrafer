/**
 * @module CallApi
 */

export interface CallApiData {
  chat_id: number;
  [key: string]: any;
}

export interface CallApi {
  method(expectedMethod: string): CallApi;
  data(expectedData: CallApiData): CallApi;
  end(cb?: () => any): void;
}
