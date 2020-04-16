export function toNumber (value: number | string | undefined): number | undefined {
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