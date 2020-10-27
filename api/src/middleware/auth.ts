import { Request, Response, NextFunction } from 'express'
import { isLogIn } from '../auth'
import { Unauthorized } from '../errors'

export const guest = (req: Request, res: Response, next: NextFunction) => {
    if (isLogIn(req)) {
        return next(new Unauthorized('You are aleready login'))
    }
    next()
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    if (!isLogIn(req)) {
        return next(new Unauthorized('You must be login'))
    }
    next()
}