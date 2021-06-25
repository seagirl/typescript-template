import { NextFunction, Request, Response, Router } from 'express'
import { handle, wrap } from '../../../core/web/express/handle'
import { DeleteMemberHandler } from './member/delete-member.handler'
import { GetMemberHandler } from './member/get-member.handler'
import { GetMembersHandler } from './member/get-members.handler'
import { PostMembersHandler } from './member/post-members.handler'

const router = Router()

router.get('/members', wrap(async (req: Request, res: Response, next: NextFunction) => {
  await handle(new GetMembersHandler(), req, res, next)
}))

router.get('/members/:code', wrap(async (req: Request, res: Response, next: NextFunction) => {
  await handle(new GetMemberHandler(), req, res, next)
}))

router.post('/members', wrap(async (req: Request, res: Response, next: NextFunction) => {
  await handle(new PostMembersHandler(), req, res, next)
}))

router.delete('/members/:code', wrap(async (req: Request, res: Response, next: NextFunction) => {
  await handle(new DeleteMemberHandler(), req, res, next)
}))

export default router
