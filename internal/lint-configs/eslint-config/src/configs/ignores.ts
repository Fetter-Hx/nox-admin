// ignores eslint
import type { Linter } from 'eslint'

export function ignores(): Linter.Config[] {
  return [
    {
      ignores: ['**/node_modules', '**/dist']
    }
  ]
}
