import { Router } from 'express'
import router from './register'
import { validate, loginSchema } from '../validation'
import { User } from '../models'
import { Unauthorized } from '../errors'
import { logIn } from '../auth'
const route = Router()

router.post('/login', (req, res) => {
    res.json({ message: 'login' })
})


router.post('/login', async (req, res) => {
    await validate(loginSchema, req.body)
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user || !user.matchesPassword(password)) {
        throw new Unauthorized('Incorrect Email or password')
    }
    logIn(req, user._id)
    res.json({ messages: 'you has been loggedin' })
})

export default router