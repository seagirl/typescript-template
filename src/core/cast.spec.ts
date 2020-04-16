import { toEnum, toNumber } from './cast'

enum Hoge {
  fugaFuga = 'fuga_fuga'
}

describe('cast', () => {
  it('toNumber', () => {
    expect(toNumber(undefined)).toEqual(undefined)
    expect(toNumber('fugaFuga')).toEqual(undefined)
    expect(toNumber('1234')).toEqual(1234)
    expect(toNumber(1234)).toEqual(1234)
  })

  it('toEnum', () => {
    expect(toEnum(Hoge, undefined)).toEqual(undefined)
    expect(toEnum(Hoge, 'fugaFuga')).toEqual('fuga_fuga')
  })
})