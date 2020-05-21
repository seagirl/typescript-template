import { ServerError } from './error'

export function toBoolean (value: boolean | number | string | undefined): boolean {
  if (value == null) {
    throw new ServerError('boolean value must be specified.')
  }

  const bool = Boolean(value)
  return bool
}

export function toOptionalBoolean (value: boolean | number | string | undefined): boolean | undefined {
  if (value == null) {
    return
  }

  const bool = Boolean(value)
  return bool
}

export function toNumber (value: number | string | undefined): number {
  if (value == null) {
    throw new ServerError('number value must be specified.')
  }

  const number = Number(value)
  // return undefined if value is NaN
  if (number !== number) {
    throw new ServerError(`${value} is not a number`)
  }

  return number
}

export function toOptionalNumber (value: number | string | undefined): number | undefined {
  if (value == null) {
    return
  }

  const number = Number(value)
  // return undefined if value is NaN
  if (number !== number) {
    return
  }

  return number
}

export function toEnum<T, E extends keyof T> (enumType: T, value: E | string | undefined): T[E] {
  if (value == null) {
    throw new ServerError('enum value must be specified.')
  }

  const aEnum = enumType[value as E]
  if (aEnum == null) {
    throw new ServerError(`${value} is not a enum value`)
  }

  return aEnum
}

export function toOptionalEnum<T, E extends keyof T> (enumType: T, value: E | string | undefined): T[E] | undefined {
  if (value == null) {
    return
  }
  return enumType[value as E]
}

export function toString (value: number | string | undefined): string {
  if (value == null) {
    throw new ServerError('string value must be specified.')
  }
  const string = String(value)
  return string
}

export function toObject (value: object | undefined): object {
  if (value == null) {
    throw new ServerError('object value must be specified.')
  }
  if (typeof value != 'object') {
    throw new ServerError('value is not a object')
  }
  return value
}