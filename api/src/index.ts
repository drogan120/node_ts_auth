import mongoose from 'mongoose'
import express from 'express'
import session from 'express-session'
import connectRedist from 'connect-redis'
import Redis from 'ioredis'
import {MONGO_URI,MONGO_OPTIONS,REDIS_OPTIONS,SESSIONS_OPTIONS,APP_PORT} from './config'

;(async()=>{ 

    await mongoose.connect(MONGO_URI,MONGO_OPTIONS)

    const RedisStore = connectRedist(session)
    const client = new Redis(REDIS_OPTIONS)
    const app = express()

    app.use(
        session({
            ...SESSIONS_OPTIONS,
            store:new RedisStore({client}),
        })
    )

    app.get('/',(req,res) => {
        res.json({messages:'oke'})
    })

    app.listen(APP_PORT, () => console.log(`Server is running on http://127.0.0.1:${APP_PORT}`))

})()
