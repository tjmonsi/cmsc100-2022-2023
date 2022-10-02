export const todo = {
  '/todo': {
    post: {
      summary: 'Create a todo',
      operationId: 'createTodo',
      requestBody: {
        description: 'THe request body for todo',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/TodoRequestRequiredObject'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'A todo object',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TodoObject'
              }
            }
          }
        }
      }
    },
    get: {
      summary: 'Get many todo',
      operationId: 'getManyTodo',
      parameters: [
        {
          name: 'limit',
          in: 'query',
          description: 'The number of items returned',
          schema: {
            type: 'number'
          }
        }
      ],
      responses: {
        200: {
          description: 'A todo object',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/TodoObject'
                }
              }
            }
          }
        }
      }
    }
  }
};
