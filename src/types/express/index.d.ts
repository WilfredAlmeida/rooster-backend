// Purpose: Adding the user type to request object.

// This is needed in typescript to add the user type to the request object. In JS its easy to add a property to an object but in TS we need to declare the type of the object first. This is what we are doing here.

// Don't bother with this file.

import { User } from "../custom";

// to make the file a module and avoid the TypeScript error
export { }

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}