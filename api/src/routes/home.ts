import { Router } from 'express'
import { catchAsync } from '../middleware'
import { User } from '../models'

const router = Router()

router.get('/home', catchAsync(async (req, res) => {
    const user = await User.findById(req.session!.userId).select('-password -__v')
    res.json(user)
}))

export default router