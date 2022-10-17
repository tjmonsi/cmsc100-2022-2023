export const responses = {
  SuccessfulUserResponse: {
    description: 'A successful response to return a user object',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/UserObject'
        }
      }
    }
  }
};
