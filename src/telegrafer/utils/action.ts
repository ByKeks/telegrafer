export const makeAction = (data: string, text?: string) => (
{ update_id: 0,
  callback_query: {
    id: '0',
    from: {
      id: 0,
      is_bot: false,
      first_name: 'Test',
      username: 'Test',
    },
    message: {
      message_id: 0,
      from: {
        id: 0,
        is_bot: false,
        first_name: 'Test',
        username: 'Test',
      },
      chat: {
        id: 0,
        first_name: 'Test',
        username: 'Test',
        type: 'private',
      },
      date: 0,
      text,
    },
    chat_instance: '0',
    data,
  },
});
