import prisma from "../../lib/prisma";
import {hash} from "bcrypt";
import {SALT_ROUNDS} from "../../lib/api/secret";

const USERNAME_MINIMUM_LENGTH = 3;

async function signup(req, res) {
  if (req.method === 'POST') {
    // Check for valid user
    const notValidated = await (valid(req, res));
    if (!notValidated) {
      // Hash user's entered password
      hash(req.body.password, SALT_ROUNDS, async (err, hash) => {
        if (err) {
          console.err(`Encountered an error hashing the user's password '${req.body.password}': ${err}`);
          res.status(500).json({message: 'Failed to create user.'});
        } else {
          // Add user to database
          const user = await prisma.user.create({
            data: {
              email: req.body.email,
              username: req.body.username,
              password: hash,
              firstName: req.body.firstName,
              lastName: req.body.lastName
            }
          });

          // Remove password for response
          delete user.password;
          res.status(200).json(user);
        }
      });
    } else {
      // User input was not valid
      res.status(notValidated.status).json({message: notValidated.message});
    }
  } else {
    res.status(405).json({message: 'Method not supported.'});
  }
}

export default signup;

async function valid(req) {
  if (req.body.username && req.body.email && req.body.password && req.body.firstName) {
    // TODO: check all values if valid regexes
    const existingUserCount = await prisma.user.count({
      where: {
        OR: [{
            email: { equals: req.body.email }
          }, {
            username: { equals: req.body.username }
          }]
      }
    });
    if (existingUserCount === 0) {
      return null;
    } else {
      return {
        status: 400,
        message: 'User already exists'
      };
    }
  } else {
    return {
      status: 400,
      message: 'Required field missing'
    };
  }
  return {
    status: 500,
    message: 'Unknown error validating user input'
  };
}
