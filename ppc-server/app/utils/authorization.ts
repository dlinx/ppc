import { Express, NextFunction, Response } from 'express'

export const adminAccess = (req: any, res: Response, next: NextFunction) => {
    if (req?.user?.isAdmin) {
        next();
    } else {
        res.json({
            code: 401,
            message: 'unauthorized'
        })
    }
}