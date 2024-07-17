import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

interface JwtPayload {
    id: number;
    username: string;
    role: string;
    iat: number;
    exp: number;
}

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.sendStatus(403);
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        (req as any).user = user as JwtPayload;
        next();
    });
};

export default authenticateJWT;