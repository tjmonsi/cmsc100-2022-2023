import { getDB } from '../utils/db/index.js';

export class Security {
  constructor (app) {
    this.app = app;
  }

  async cookieAuth (request, reply) {
    try {
      const token = request.session.get('token');
      const { username } = await this.app.jwt.verify(token);

      const db = await getDB();

      if (!db.users[username]) {
        return reply.unauthorized();
      }

      request.username = username;
    } catch (error) {
      console.error(error);
      return reply.unauthorized();
    }
  }
}
