import {verify} from "jsonwebtoken";
import {secret} from "./secret";

/**
 * Authentication middleware for API endpoints
 * @param fn
 * @returns {(function(*=, *=): Promise<void>)|*}
 */
export const authenticated = (fn) => async (req, res) => {
  verify(req.cookies.auth, secret, async (err, decoded) => {
    if (!err && decoded) {
      return await fn(req, res, decoded);
    }
    if (err) {
      console.error(`Encountered error authorizing api request: ${err}`);
    }
    return res.status(500).json({message: "Not authenticated"});
  });
}
