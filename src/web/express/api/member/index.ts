import { NextFunction, Request, Response, Router } from 'express'
import { handle } from '../../../../core/web/express/handle'
import { DeleteMemberHandler } from './delete-member.handler'
import { GetMemberHandler } from './get-member.handler'
import { GetMembersHandler } from './get-members.handler'
import { PostMembersHandler } from './post-members.handler'

const router = Router()

router.get('/members', async (req: Request, res: Response, next: NextFunction) => {
  await handle(new GetMembersHandler(), req, res, next)
})

router.get('/members/:code', async (req: Request, res: Response, next: NextFunction) => {
  await handle(new GetMemberHandler(), req, res, next)
})

router.post('/members', async (req: Request, res: Response, next: NextFunction) => {
  await handle(new PostMembersHandler(), req, res, next)
})

router.delete('/members/:code', async (req: Request, res: Response, next: NextFunction) => {
  await handle(new DeleteMemberHandler(), req, res, next)
})

export default router
