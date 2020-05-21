import { loadConfig } from '.'

describe('config', () => {
  it('loadConfig', async () => {
    const config = await loadConfig()
    console.log(config)
    expect(config).toEqual(expect.any(Object))
  })
})