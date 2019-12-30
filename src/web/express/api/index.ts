import { Router } from 'express'
import memberRoutes from './member'

const router = Router()
router.use(memberRoutes)

export default router
