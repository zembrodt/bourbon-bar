import {authenticated} from "../../../lib/api/authenticated";
import prisma from "../../../lib/prisma";

async function deleteUser(req, res, token) {
  if (req.method === 'DELETE') {
    try {
      await prisma.user.delete({
        where: {id: token.sub}
      });
      // Remove cookie
      res.setHeader('Set-Cookie', 'auth=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
      return res.status(200).json({message: 'User deleted.'});
    } catch (err) {
      console.err(`Error when deleting user with id '${token.sub}': ${JSON.stringify(err)}`);
    }
    return res.status(503).json({message: 'Unable to delete user'});
  }
  return res.status(400).json({message: 'Invalid method'});
}

export default authenticated(deleteUser);
