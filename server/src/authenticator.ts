import { CustomAuthenticator } from "@interopio/manager";
import { User, Token } from "@interopio/manager-api";
import { Request, Response } from "express";
import { users } from "./data";

// Custom authenticator that validates a token and returns the user info
export class Authenticator implements CustomAuthenticator {

    initialize(): void {
        // initialization point
    }

    authenticate(req: Request, res: Response, next: (err?: Error, info?: User) => void, token?: Token): void {
        // extract the token from the request
        const tokenFromRequest = this.extractToken(req);
        
        if (!tokenFromRequest) {
            next({
                name: "UnauthorizedError",
                statusCode: 401,
                message: `can not find token`
            } as Error);
            return;
        }

        const userId = tokenFromRequest?.replace(`user:`, ``);

        // validate the token 
        if (!this.validateToken(tokenFromRequest)) {
            next({
                name: "UnauthorizedError",
                statusCode: 401,
                message: `invalid token`
            } as Error);
            return;
        }

        // in this dummy example the token is actually the username, so we to try to find the user based on it
        const user = users.find(u => u.id === userId);
        if (!user) {
            next({
                name: "UnauthorizedError",
                statusCode: 401,
                message: `unknown user`
            } as Error);
            return;
        }

        // return the user info
        next(undefined, user);
    }

    private extractToken(req: Request): string | undefined {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        }
        return undefined;
    }

    private validateToken(token: string) {
        return true;
    }
}
