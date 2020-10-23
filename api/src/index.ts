import mongoose from 'mongoose'
import session from 'express-session'
import connectRedist from 'connect-redis'
import Redis from 'ioredis'
import {MONGO_URI,MONGO_OPTIONS,REDIS_OPTIONS,APP_PORT} from './config'
import {createApp} from './app'
;(async()=>{ 

    await mongoose.connect(MONGO_URI,MONGO_OPTIONS)

    const RedisStore = connectRedist(session)

    const client = new Redis(REDIS_OPTIONS)

    const store  = new RedisStore({client})

    const app = createApp()

    app.listen(APP_PORT, () => console.log(`Server is running on http://127.0.0.1:${APP_PORT}`))

})()
