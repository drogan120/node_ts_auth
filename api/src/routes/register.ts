import { Router } from 'express'
import { logIn } from '../auth'
import { BadRequest } from '../errors'
import { guest, catchAsync } from '../middleware'
import { User } from '../models'
import { validate, registerSchema } from '../validation'
const router = Router()

router.get('/register', (req, res) => {
    res.json({ messages: 'oke' })
})

router.post('/register', guest, catchAsync(async (req, res) => {
    await validate(registerSchema, req.body)

    const { email, name, password } = req.body
    const found = await User.exists({ email })

    if (found) {
        throw new BadRequest('invalid email')
    }

    const user = await User.create({
        email, name, password
    })
    logIn(req, user._id)
    res.send({ user: user })
}))

export default router