export interface IApiCallApiData {
  chat_id: number;
  [key: string]: any;
}

export interface ICommandApi {
  command(commandName: string): IReplyApi;
  start(): IReplyApi;
  help(): IReplyApi;
  settings(): IReplyApi;
  action(trigger: string): IReplyApi;
}

export interface IReplyApi {
  reply(): IApiCallApi;
}

export interface IApiCallApi {
  method(expectedMethod: string): IApiCallApi;
  data(expectedData: IApiCallApiData): IApiCallApi;
  end(cb?: () => any): ICommandApi;
}
