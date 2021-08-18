import {authenticated} from "../../../lib/api/authenticated";
import prisma from "../../../lib/prisma";

async function bars(req, res, token) {
  if (req.method === 'GET') {
    const {username} = req.query;

    if (username === token.username) {
      const user = await prisma.user.findUnique({
        where: {
          username: username
        },
        include: {
          bars: true
        }
      });
      if (user) {
        return res.status(200).json(user.bars);
      }
      return res.status(404).json({message: `User ${username} not found`});
    }
    return res.status(403).json({message: `You do not have access to ${username}'s bars!`});
  }
  return res.status(405).json({message: 'Method not supported.'});
}

export default authenticated(bars);
