import { Request, Response, NextFunction } from 'express'
import { isLogIn } from '../auth'

export const guest = (req: Request, res: Response, next: NextFunction) => {
    if (isLogIn(req)) {
        return next(new Error('You are aleready login'))
    }
    next()
}