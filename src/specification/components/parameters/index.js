export const parameters = {
  TodoParameterId: {
    name: 'todoId',
    in: 'path',
    required: true,
    description: 'This is the id of the todo',
    schema: {
      type: 'string'
    }
  }
};
