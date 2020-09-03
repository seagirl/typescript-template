import { ServerError } from './error'

export function toBoolean (value: boolean | number | string | unknown | undefined): boolean {
  if (value == null) {
    throw new ServerError('boolean value must be specified.')
  }

  const bool = Boolean(value)
  return bool
}

export function toOptionalBoolean (value: boolean | number | string | unknown | undefined): boolean | undefined {
  if (value == null) {
    return
  }

  const bool = Boolean(value)
  return bool
}

export function toNumber (value: number | string | unknown | undefined): number {
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

export function toOptionalNumber (value: number | string | unknown | undefined): number | undefined {
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

export function toString (value: number | string | unknown | undefined): string {
  if (value == null) {
    throw new ServerError('string value must be specified.')
  }
  const string = String(value)
  return string
}

export function toOptionalString (value: number | string | unknown | undefined): string | undefined {
  if (value == null) {
    return
  }
  const string = String(value)
  return string
}

export function toEnum<T, E extends keyof T> (enumType: T, value: E | string | unknown | undefined): T[E] {
  if (value == null) {
    throw new ServerError('enum value must be specified.')
  }

  const aEnum = enumType[value as E]
  if (aEnum == null) {
    throw new ServerError(`${value} is not a enum value`)
  }

  return aEnum
}

export function toOptionalEnum<T, E extends keyof T> (enumType: T, value: E | string | unknown | undefined): T[E] | undefined {
  if (value == null) {
    return
  }
  return enumType[value as E]
}

export function toObject (value: object | unknown | undefined): object {
  if (value == null) {
    throw new ServerError('object value must be specified.')
  }
  if (typeof value != 'object') {
    throw new ServerError('value is not a object')
  }
  return value as object
}

export function toOptionalObject (value: object | unknown | undefined): object | undefined {
  if (value == null) {
    return
  }
  if (typeof value != 'object') {
    throw new ServerError('value is not a object')
  }
  return value as object
}

export function toBooleanArray (value: object | unknown | undefined): boolean[] {
  if (value == null) {
    throw new ServerError('array value must be specified.')
  }
  if (!Array.isArray(value)) {
    throw new ServerError('value is not a object')
  }
  return value.map(n => {
    return toBoolean(n)
  })
}

export function toNumberArray (value: object | unknown | undefined): number[] {
  if (value == null) {
    throw new ServerError('array value must be specified.')
  }
  if (!Array.isArray(value)) {
    throw new ServerError('value is not a object')
  }
  return value.map(n => {
    return toNumber(n)
  })
}

export function toStringArray (value: object | unknown | undefined): string[] {
  if (value == null) {
    throw new ServerError('array value must be specified.')
  }
  if (!Array.isArray(value)) {
    throw new ServerError('value is not a object')
  }
  return value.map(n => {
    return toString(n)
  })
}