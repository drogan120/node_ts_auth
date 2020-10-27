import express from 'express'
import session, { Store } from 'express-session'
import { SESSIONS_OPTIONS } from './config'
import { internalServerError, notFound } from './middleware'
import { register, login, home } from './routes'
export const createApp = (store: Store) => {

    const app = express();

    app.use(express.json())

    app.use(
        session({
            ...SESSIONS_OPTIONS,
            store
        })
    )

    app.use(register)
    app.use(login)
    app.use(home)
    app.use(notFound)
    app.use(internalServerError)

    return app
}