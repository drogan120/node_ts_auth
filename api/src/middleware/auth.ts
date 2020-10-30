import { Request, Response, NextFunction } from 'express'
import { isLogIn } from '../auth'
import { SESSION_ABSOLUTE_TIMEOUT } from '../config'
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

export const active = async (req: Request, res: Response, next: NextFunction) => {
    if (isLogIn(req)) {
        const now = Date.now()
        const { createdAt } = req.session as Express.Session
        if (now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
            await logOut(req, res)
            return next(new Unauthorized('Session expired'))
        }
    }
}