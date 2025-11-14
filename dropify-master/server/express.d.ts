import { IUser } from "./src/models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // This will be the decoded user object from the JWT
    }
  }
}
