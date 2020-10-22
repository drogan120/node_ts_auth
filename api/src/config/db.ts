import { ConnectionOptions } from 'mongoose'
const {
    MONGO_HOST='localhost',
    MONGO_PORT=27017,
    MONGO_DATABASE = 'node_ts_auth'
} = process.env

export const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`

export const MONGO_OPTIONS:ConnectionOptions = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}
