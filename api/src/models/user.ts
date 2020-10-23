import { Document, model, Schema } from 'mongoose'
interface UserDocuments extends Document{
    email:String,
    name:String,
    password:String
}
const userSchema = new Schema({
    email:String,
    name:String,
    password:String
},{
    timestamps:true
})

export const User = model<UserDocuments>('Users',userSchema)