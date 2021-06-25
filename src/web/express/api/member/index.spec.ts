import supertest from 'supertest'
import { checkStatus } from '../../../../core/test/supertest'
import Application from '../../app'

const testCode = 'test'
const app = new Application()

describe('Member API', () => {
  beforeAll(async () => {
    await app.init()
  })

  afterAll(async () => {
    await app.finish()
  })

  it('POST /api/members', async () => {
    const request = supertest(app.express)
    const response = await request.post('/api/members').query({ code: testCode })
    checkStatus(response)

    const body = response.body
    expect(body.response).toBe('ok')
  })

  it('GET /api/members', async () => {
    const request = supertest(app.express)
    const response = await request.get('/api/members')
    checkStatus(response)

    const body = response.body
    expect(body.response).toBe('ok')

    expect(body.members).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: testCode,
        })
      ])
    )
  })

  it('GET /api/member/:code', async () => {
    const request = supertest(app.express)
    const response = await request.get('/api/members/' + testCode)
    checkStatus(response)

    const body = response.body
    expect(body.response).toBe('ok')

    expect(body.member).toEqual(
      expect.objectContaining({
        name: testCode,
      })
    )
  })

  it('DELETE /api/members/:code', async () => {
    const request = supertest(app.express)
    const response = await request.delete('/api/members/' + testCode)
    checkStatus(response)

    const body = response.body
    expect(body.response).toBe('ok')
  })
})
