import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Delete a todo should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('Should return the success = true if ID is deleted', async () => {
    const newTodo = {
      title: 'New Todo for get',
      description: 'Some description'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const { id } = await createResponse.json();

    const response = await app.inject({
      method: 'DELETE',
      url: `${prefix}/todo/${id}`
    });

    // this checks if HTTP status code is equal to 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // expect success is true
    result.success.must.be.true();

    const getResponse = await app.inject({
      method: 'GET',
      url: `${prefix}/todo/${id}`
    });

    getResponse.statusCode.must.be.equal(404);
  });
});
