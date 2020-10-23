import { Router } from 'express'
import { logIn } from '../auth'
import { guest } from '../middleware'
import { User } from '../models'
import { registerSchema } from '../validation'
const router = Router()

router.get('/register', (req, res) => {
    res.json({ messages: 'oke' })
})

router.post('/register', guest, async (req, res) => {
    await registerSchema.validateAsync(req.body, { abortEarly: false })

    const { email, name, password } = req.body
    const found = await User.exists({ email })

    if (found) {
        throw new Error('invalid email')
    }

    const user = await User.create({
        email, name, password
    })
    logIn(req, user._id)
    res.send({ user: user })
})

export default router