import prisma from "../../lib/prisma";
import {compare} from "bcrypt";
import {sign} from "jsonwebtoken";
import cookie from "cookie";
import {secret} from "../../lib/api/secret";

async function login(req, res) {
  if (req.method === 'POST') {
    // Check for info
    if (req.body.login && req.body.password) {
      // Get user with login
      const user = await prisma.user.findFirst({
        where: {
          OR: [{
              email: { equals: req.body.login }
            }, {
              username: { equals: req.body.login }
            }]
        }
      });
      if (user) {
        compare(req.body.password, user.password, (err, result) => {
          if (!err && result || req.body.password === user.password) { // TODO: 3rd clause is temporary
            const claims = {sub: user.id, email: user.email, username: user.username, name: user.firstName};
            const jwt = sign(claims, secret, { expiresIn: '1h' });
            res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== 'development', // by-pass https requirement in dev environment
              sameSite: 'strict',
              maxAge: 3600, // 1h
              path: '/'
            }));
            return res.status(200).json({message: 'Logged in.'});
          } else {
            if (err) {
              console.err(`Encountered an error comparing hashed passwords: '${req.body.password}' and '${user.password}': ${err}`);
            }
            return res.status(403).json({message: 'Invalid login.'});
          }
        });
      }
      return res.status(403).json({message: 'Invalid login.'});
    }
    return res.status(400).json({message: 'Missing login field.'});
  }
  return res.status(405).json({message: 'Method not supported.'});
}

export default login;
