import {authenticated} from "../../../lib/api/authenticated"
import prisma from "../../../lib/prisma";
import {hash} from "bcrypt";
import {SALT_ROUNDS} from "../../../lib/api/secret";

async function updateUser(req, res, token) {
  if (req.method === 'PUT') {
    let data = {};

    // Add all fields that need to be updated
    if (req.body.email && req.body.email.length > 0) {
      data.email = req.body.email;
    }
    if (req.body.username && req.body.username.length > 0) {
      data.username = req.body.username;
    }
    if (req.body.firstName && req.body.firstName.length > 0) {
      data.firstName = req.body.firstName;
    }
    if (req.body.lastName && req.body.lastName.length > 0) {
      data.lastName = req.body.lastName;
    }

    // Check if we need to update the password
    if (req.body.password && req.body.password.length > 0) {
      data.password = await new Promise((resolve, reject) => {
        hash(req.body.password, SALT_ROUNDS, async (err, hash) => {
          if (err) {
            reject(err);
          }
          resolve(hash);
        });
      });
    }

    // Check an update needs to be done
    if (Object.keys(data).length > 0) {
      try {
        const user = await prisma.user.update({
          where: {id: token.sub},
          data: data
        });
        delete user.password;
        return res.status(200).json(user);
      }
      catch (err) {
        const message = err.meta && err.meta.target && err.meta.target.length > 0 ? `${err.meta.target[0]} already exists.` : 'Invalid user update.';
        return res.status(400).json({message: message});
      }
    }
    return res.status(400).json({message: 'No supplied parameters'});
  }
  return res.status(405).json({message: 'Method not supported.'});
}

export default authenticated(updateUser);
