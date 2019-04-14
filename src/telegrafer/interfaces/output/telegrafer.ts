export interface IApiCallData {
  chat_id: number;
  text: string;
}

export interface ICommand {
  command(commandName: string): IReply;
  start(): IReply;
  help(): IReply;
  settings(): IReply;
}

export interface IReply {
  reply(): IApiCall;
}

export interface IApiCall {
  method(expectedMethod: string): IApiCall;
  data(expectedData: IApiCallData): IApiCall;
  end(cb?: () => any): ICommand;
}
