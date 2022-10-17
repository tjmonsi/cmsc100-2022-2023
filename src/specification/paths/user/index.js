export const user = {
  '/register': {
    post: {
      summary: 'Register a new user',
      operationId: 'registerUser',
      requestBody: {
        $ref: '#/components/requestBodies/RequestNewUser'
      },
      responses: {
        200: {
          $ref: '#/components/responses/SuccessfulUserResponse'
        }
      }
    }
  }
};
