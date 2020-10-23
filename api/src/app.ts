import express from 'express'
import session,{Store} from 'express-session'
import {SESSIONS_OPTIONS} from './config'
import { register } from './routes'
export const createApp = (store:Store) => {

    const app = express();

    app.use(express.json())

    app.use(
        session({
            ...SESSIONS_OPTIONS,
            store
        })
    )

    app.use(register)

    return app
}