import { Util } from './util'

enum Hoge {
  fugaFuga = 'fuga_fuga'
}

describe('Util', () => {
  it('toEnum', () => {
    expect(Util.toEnum(Hoge, undefined)).toEqual(undefined)
    expect(Util.toEnum(Hoge, 'fugaFuga')).toEqual('fuga_fuga')
  })

  it('upperCamelCase', () => {
    expect(Util.upperCamelCase(undefined)).toEqual(undefined)
    expect(Util.upperCamelCase('get-users.usecase')).toEqual('GetUsers.usecase')
    expect(Util.upperCamelCase('get_users.usecase')).toEqual('GetUsers.usecase')
    expect(Util.upperCamelCase('GetUsers.usecase')).toEqual('GetUsers.usecase')
  })

  it('lowerCamelCase', () => {
    expect(Util.lowerCamelCase(undefined)).toEqual(undefined)
    expect(Util.lowerCamelCase('get-users.usecase')).toEqual('getUsers.usecase')
    expect(Util.lowerCamelCase('get_users.usecase')).toEqual('getUsers.usecase')
    expect(Util.lowerCamelCase('GetUsers.usecase')).toEqual('getUsers.usecase')
  })

  it('kebabCase', () => {
    expect(Util.kebabCase(undefined)).toEqual(undefined)
    expect(Util.kebabCase('get-users.usecase')).toEqual('get-users.usecase')
    expect(Util.kebabCase('get_users.usecase')).toEqual('get-users.usecase')
    expect(Util.kebabCase('GetUsers.usecase')).toEqual('get-users.usecase')
  })

  it('snakeCase', () => {
    expect(Util.snakeCase(undefined)).toEqual(undefined)
    expect(Util.snakeCase('get-users.usecase')).toEqual('get_users.usecase')
    expect(Util.snakeCase('get_users.usecase')).toEqual('get_users.usecase')
    expect(Util.snakeCase('GetUsers.usecase')).toEqual('get_users.usecase')
  })
})