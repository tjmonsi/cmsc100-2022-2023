export const logout = async (request, reply) => {
  request.session.delete();
  return {
    success: true
  };
};
