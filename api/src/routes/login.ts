import { Router } from 'express'
import router from './register'
import { validate, loginSchema } from '../validation'
import { User } from '../models'
import { Unauthorized } from '../errors'
import { logIn, logOut } from '../auth'
import { catchAsync, guest, auth } from '../middleware'

const route = Router()

router.post('/login', guest, catchAsync(async (req, res) => {
    await validate(loginSchema, req.body)
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user || !await (user.matchesPassword(password))) {
        throw new Unauthorized('Incorrect Email or password')
    }
    logIn(req, user._id)
    res.json({ messages: 'you has been loggedin' })
}))


router.post('/logout', auth, catchAsync(async (req, res) => {
    await logOut(req, res)
    res.json({ messages: 'you has been logged out' })
}))

export default router