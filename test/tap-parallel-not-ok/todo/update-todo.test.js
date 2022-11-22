import tap from 'tap';
import { build } from '../../../src/app.js';
import 'must/register.js';
import Chance from 'chance';

const chance = new Chance();

tap.mochaGlobals();

const prefix = '/api';

describe('Update a todo should work', async () => {
  let app;

  before(async () => {
    app = await build({
      forceCloseConnections: true
    });
  });

  const newUser = {
    username: chance.email({ domain: 'example.com' }),
    password: chance.string({ length: 12 }),
    firstName: chance.first(),
    lastName: chance.last()
  };

  let cookie = '';

  it('Should return the user that was created a new user', async () => {
    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/register`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    // this checks if HTTP status code is equal to 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // expect that id exists
    result.username.must.be.equal(newUser.username);
    result.firstName.must.be.equal(newUser.firstName);
    result.lastName.must.be.equal(newUser.lastName);

    // expect createdDate and updatedDate is not null
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });

  it('Login should work', async () => {
    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/login`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: newUser.username,
        password: newUser.password
      })
    });

    // this checks if HTTP status code is equal to 200
    response.statusCode.must.be.equal(200);

    cookie = response.headers['set-cookie'];
  });

  it('Should update the object given an ID', async () => {
    const newTodo = {
      title: 'New Todo for get',
      description: 'Some description'
    };

    const newerTodo = {
      title: 'New Todo for update',
      description: 'Some description 2',
      isDone: true
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newTodo)
    });

    const { id, createdDate, updatedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/todo/${id}`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newerTodo)
    });

    // this checks if HTTP status code is equal to 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // expect that id exists
    result.id.must.equal(id);
    // expect that all of the values should be equal to newTodo properties
    result.title.must.be.equal(newerTodo.title);
    result.description.must.be.equal(newerTodo.description);
    // expect taht isDone is false because it was not given
    result.isDone.must.be.equal(newerTodo.isDone);
    // expect createdDate and updatedDate is not null
    result.createdDate.must.equal(createdDate);
    result.updatedDate.must.above(updatedDate);
  });

  it('Should update the object given an ID and only isDone being updated', async () => {
    const newTodo = {
      title: 'New Todo for get',
      description: 'Some description'
    };

    const newerTodo = {
      isDone: true
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newTodo)
    });

    const { id, createdDate, updatedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/todo/${id}`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newerTodo)
    });

    // this checks if HTTP status code is equal to 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // expect that id exists
    result.id.must.equal(id);
    // expect that all of the values should be equal to newTodo properties
    result.title.must.be.equal(newTodo.title);
    result.description.must.be.equal(newTodo.description);
    // expect taht isDone is false because it was not given
    result.isDone.must.be.equal(newerTodo.isDone);
    // expect createdDate and updatedDate is not null
    result.createdDate.must.equal(createdDate);
    result.updatedDate.must.above(updatedDate);
  });

  it('Should update the object given an ID and only title is updated', async () => {
    const newTodo = {
      title: 'New Todo for get',
      description: 'Some description'
    };

    const newerTodo = {
      title: 'New Todo for update 2'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newTodo)
    });

    const { id, createdDate, updatedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/todo/${id}`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newerTodo)
    });

    // this checks if HTTP status code is equal to 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // expect that id exists
    result.id.must.equal(id);
    // expect that all of the values should be equal to newTodo properties
    result.title.must.be.equal(newerTodo.title);
    result.description.must.be.equal(newTodo.description);
    // expect taht isDone is false because it was not given
    result.isDone.must.be.false();
    // expect createdDate and updatedDate is not null
    result.createdDate.must.equal(createdDate);
    result.updatedDate.must.above(updatedDate);
  });

  after(async () => {
    await app.close();
  });
});
