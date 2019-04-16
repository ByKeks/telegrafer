export const makeCommand = (commandName: string) => ({
  update_id: 0,
  message:
   {
     message_id: 0,
     from:
      {
        id: 0,
        is_bot: false,
        first_name: 'Test',
        username: 'Test',
      },
     chat:
      {
        id: 0,
        first_name: 'Test',
        username: 'Test',
        type: 'private',
      },
     date: 0,
     text: `/${commandName}`,
     entities: [ { offset: 0, length: commandName.length + 1, type: 'bot_command' } ],
  },
});
