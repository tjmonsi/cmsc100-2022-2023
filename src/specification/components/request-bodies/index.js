export const requestBodies = {
  RequestNewUser: {
    description: 'The request body for creating a new user',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/NewUserObject'
        }
      }
    }
  }
};
