import { Request, Response } from 'express'
import { SESSION_NAME } from './config'

export const isLogIn = (req: Request) => !!req.session!.userId

export const logIn = (req: Request, userId: string) => {
    req.session!.userId = userId
}

export const logOut = (req: Request, res: Response) => {
    new Promise((resolve, rejects) => {
        req.session!.destroy((err: Error) => {
            if (err) rejects(err)
            res.clearCookie(SESSION_NAME)
            resolve()
        })
    })
}