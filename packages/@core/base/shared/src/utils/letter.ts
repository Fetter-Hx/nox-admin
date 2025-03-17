/**
 * kebab-case 转 camelCase
 */
function kebabToCamelCase(str: string): string {
  return str
    .split('-')
    .filter(Boolean)
    .map((item, index) => {
      return index === 0 ? item : item.charAt(0).toUpperCase() + item.slice(1)
    })
    .join('')
}

export { kebabToCamelCase }
