import { Router, Request, Response, NextFunction } from 'express'
import { GetMembersBuilder, GetMemberBuilder, PostMembersBuilder, PostMemberStateBuilder, PostMemberColorBuilder, DeleteMemberBuilder } from '../../builder/member.builder'
import { handle } from '../util'

const router = Router()

router.get('/members', async (req: Request, res: Response, next: NextFunction) => {
  await handle(new GetMembersBuilder(), req, res, next)
})

router.get('/members/:code', async (req: Request, res: Response, next: NextFunction) => {
  await handle(new GetMemberBuilder(), req, res, next)
})

router.post('/members', async (req: Request, res: Response, next: NextFunction) => {
  await handle(new PostMembersBuilder(), req, res, next)
})

router.delete('/members/:code', async (req: Request, res: Response, next: NextFunction) => {
  await handle(new DeleteMemberBuilder(), req, res, next)
})

export default router
