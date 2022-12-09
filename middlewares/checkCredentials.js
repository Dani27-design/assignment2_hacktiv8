import jwt from "jsonwebtoken";
import { jwt_secret } from "../config.js";
import * as fs from "fs";
import { pathJSON } from "../config.js";

export const checkCredential = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      res.json({
        status: "error",
        message: "failed to access, credentials not found",
      });
      return;
    }
    const token = authorization.split("Bearer ");
    const decode = jwt.verify(token[1], jwt_secret);
    delete decode.iat;
    delete decode.exp;
    const convert_toJSON = JSON.parse(fs.readFileSync(pathJSON, "utf8"));
    const user = convert_toJSON.filter((item) => item.email === decode.email);

    if (user.length === 0) {
      res.json({ status: "error", message: "authorization failed" });
      return;
    }
    req.user = {
      id: user[0].id,
      email: user[0].email,
    };
    next();
  } catch (error) {
    next(error);
  }
};
