import { ServerError } from './error'

export function toBoolean (value: boolean | number | string | undefined): boolean {
  if (value == null) {
    throw new ServerError('value must be specified.')
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
    throw new ServerError('value must be specified.')
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

export function toEnum<T, E extends keyof T> (enumType: T, value: E | string | undefined): T[E] | undefined {
  if (value == null) {
    return
  }
  return enumType[value as E]
}