export const user = {
  '/register': {
    post: {
      summary: 'Register a new user',
      operationId: 'registerUser',
      requestBody: {
        description: 'THe request body for creating a new user',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/NewUserObject'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'A user object',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserObject'
              }
            }
          }
        }
      },
      security: [
        {}
      ]
    }
  },
  '/login': {
    post: {
      summary: 'Login user',
      operationId: 'login',
      requestBody: {
        description: 'THe request body for login',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginObject'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'Successful response',
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
      },
      security: [
        {}
      ]
    }
  },
  '/logout': {
    get: {
      summary: 'Logout user',
      operationId: 'logout',
      responses: {
        200: {
          description: 'Successful response',
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
      },
      security: [
        {
          cookieAuth: []
        }
      ]
    }
  }
};
