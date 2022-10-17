// import { getDB } from '../../utils/db/index.js';

export const logout = async (request, reply) => {
  request.session.delete();
  return {
    success: true
  };
};
