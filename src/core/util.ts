export class Util {
  static toEnum<T, E extends keyof T> (enumType: T, value: E | string | undefined): T[E] | undefined {
    if (value == null) {
      return
    }
    return enumType[value as E]
  }

  static upperCamelCase (str: string | undefined): string | undefined {
    if (str == null) {
      return
    }
    str = str.charAt(0).toUpperCase() + str.slice(1)
    return str.replace(/[-_](.)/g, function (match, group1) {
      return group1.toUpperCase()
    })
  }

  static lowerCamelCase (str: string | undefined): string | undefined {
    if (str == null) {
      return
    }
    str = str.charAt(0).toLowerCase() + str.slice(1)
    return str.replace(/[-_](.)/g, function (match, group1) {
      return group1.toUpperCase()
    })
  }

  static kebabCase (str: string | undefined): string | undefined {
    if (str == null) {
      return
    }
    str = str.charAt(0).toLowerCase() + str.slice(1)
    str = str.replace('_', '-')
    return str.replace(/([A-Z])/g, function (match) {
      return '-' + match.toLowerCase()
    })
  }

  static snakeCase (str: string | undefined): string | undefined {
    if (str == null) {
      return
    }
    str = str.charAt(0).toLowerCase() + str.slice(1)
    str = str.replace('-', '_')
    return str.replace(/([A-Z-])/g, function (match) {
      return '_' + match.toLowerCase()
    })
  }
}