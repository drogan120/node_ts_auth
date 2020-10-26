import { Document, model, Schema } from 'mongoose'
import { hash } from 'bcryptjs'
import { BCRYPT_WORK_FACTOR } from '../config'
interface UserDocuments extends Document {
    email: String,
    name: String,
    password: String
}
const userSchema = new Schema({
    email: String,
    name: String,
    password: String
}, {
    timestamps: true
})

userSchema.pre<UserDocuments>('save', async function () {
    if (this.isModified('password')) {
        this.password = await hash(this.password, BCRYPT_WORK_FACTOR)
    }
})

export const User = model<UserDocuments>('Users', userSchema)