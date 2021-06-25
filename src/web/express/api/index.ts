import { Router } from 'express'
import memberRoutes from './member.api'

const router = Router()
router.use(memberRoutes)

export default router
