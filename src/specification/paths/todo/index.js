export const todo = {
  '/todo/:todoId': {
    get: {
      summary: 'Get a todo',
      operationId: 'getTodo',
      parameters: [
        {
          $ref: '#/components/parameters/TodoParameterId'
        }
      ],
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
    put: {
      summary: 'Update a todo',
      operationId: 'updateTodo',
      parameters: [
        {
          $ref: '#/components/parameters/TodoParameterId'
        }
      ],
      requestBody: {
        description: 'THe request body for todo',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/TodoRequestObject'
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
    delete: {
      summary: 'Delete a todo',
      operationId: 'deleteTodo',
      parameters: [
        {
          $ref: '#/components/parameters/TodoParameterId'
        }
      ],
      responses: {
        200: {
          description: 'successful response',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
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
