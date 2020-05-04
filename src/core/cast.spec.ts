import { toBoolean, toEnum, toNumber, toOptionalBoolean, toOptionalNumber } from './cast'
import { ServerError } from './error'

enum Hoge {
  fugaFuga = 'fuga_fuga'
}

describe('cast', () => {
  it('toBoolean', () => {
    expect(() => { toBoolean(undefined) }).toThrowError(ServerError)
    expect(toBoolean(1)).toEqual(true)
    expect(toBoolean(0)).toEqual(false)
    expect(toBoolean('')).toEqual(false)
    expect(toBoolean('true')).toEqual(true)
    expect(toBoolean('false')).toEqual(true)
    expect(toBoolean(true)).toEqual(true)
    expect(toBoolean(false)).toEqual(false)
  })

  it('toOptionalBoolean', () => {
    expect(toOptionalBoolean(undefined)).toEqual(undefined)
    expect(toOptionalBoolean(1)).toEqual(true)
    expect(toOptionalBoolean(0)).toEqual(false)
    expect(toOptionalBoolean('')).toEqual(false)
    expect(toOptionalBoolean('true')).toEqual(true)
    expect(toOptionalBoolean('false')).toEqual(true)
    expect(toOptionalBoolean(true)).toEqual(true)
    expect(toOptionalBoolean(false)).toEqual(false)
  })

  it('toNumber', () => {
    expect(() => { toNumber(undefined) }).toThrowError(ServerError)
    expect(() => { toNumber('fugaFuga') }).toThrowError(ServerError)
    expect(toNumber('1234')).toEqual(1234)
    expect(toNumber(1234)).toEqual(1234)
  })

  it('toOptionalNumber', () => {
    expect(toOptionalNumber(undefined)).toEqual(undefined)
    expect(toOptionalNumber('fugaFuga')).toEqual(undefined)
    expect(toOptionalNumber('1234')).toEqual(1234)
    expect(toOptionalNumber(1234)).toEqual(1234)
  })

  it('toEnum', () => {
    expect(toEnum(Hoge, undefined)).toEqual(undefined)
    expect(toEnum(Hoge, 'fugaFuga')).toEqual('fuga_fuga')
  })
})