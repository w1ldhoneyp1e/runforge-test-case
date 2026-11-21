import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import react from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

const oneSpecifierPerLine = {
  meta: {type: 'layout', schema: [], messages: {separate: 'Place each specifier on its own indented line.'}},
  create(context) {
    return {
      'ImportDeclaration, ExportNamedDeclaration'(node) {
        if (!node.specifiers || node.specifiers.length < 2) return
        for (const specifier of node.specifiers) {
          if (specifier.loc.start.line === node.loc.start.line || specifier.loc.end.line === node.loc.end.line ||
              node.specifiers.some((other) => other !== specifier && other.loc.start.line === specifier.loc.start.line)) {
            context.report({node: specifier, messageId: 'separate'})
          }
        }
      },
    }
  },
}

const singleImportOnOneLine = {
  meta: {type: 'layout', schema: [], messages: {single: 'Keep a single named import on one line.'}},
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.specifiers.length === 1 && node.specifiers[0].type === 'ImportSpecifier' &&
          node.loc.start.line !== node.loc.end.line) {
          context.report({node, messageId: 'single'})
        }
      },
    }
  },
}

const nestedJsxOnNewLines = {
  meta: {type: 'layout', schema: [], messages: {nested: 'Place nested JSX elements on separate lines.'}},
  create(context) {
    return {
      JSXElement(node) {
        for (const child of node.children) {
          if (child.type === 'JSXElement' && (child.loc.start.line === node.openingElement.loc.end.line ||
            (node.closingElement && child.loc.end.line === node.closingElement.loc.start.line))) {
            context.report({node: child, messageId: 'nested'})
          }
        }
      },
    }
  },
}

const typeMembersOnNewLines = {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    schema: [],
    messages: {newline: 'Place each type member on its own line.'},
  },
  create(context) {
    const source = context.sourceCode
    return {
      'TSTypeLiteral, TSInterfaceBody'(node) {
        const members = node.type === 'TSInterfaceBody' ? node.body : node.members
        if (members.length < 2) return
        const baseIndent = source.lines[node.loc.start.line - 1].match(/^\s*/)[0]
        for (const member of members) {
          const previous = source.getTokenBefore(member)
          if (previous.loc.end.line !== member.loc.start.line) continue
          context.report({
            node: member,
            messageId: 'newline',
            fix(fixer) {
              const between = source.text.slice(previous.range[1], member.range[0])
              return /^\s*$/.test(between)
                ? fixer.replaceTextRange([previous.range[1], member.range[0]], `\n${baseIndent}\t`)
                : null
            },
          })
        }
        const last = members[members.length - 1]
        const closing = source.getLastToken(node)
        if (last.loc.end.line === closing.loc.start.line) {
          context.report({
            node: closing,
            messageId: 'newline',
            fix(fixer) {
              const between = source.text.slice(last.range[1], closing.range[0])
              return /^\s*$/.test(between)
                ? fixer.replaceTextRange([last.range[1], closing.range[0]], `\n${baseIndent}`)
                : null
            },
          })
        }
      },
    }
  },
}

export default [
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat['recommended-latest'],
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      import: importPlugin,
      react,
      '@stylistic': stylistic,
      formatting: {rules: {
        'one-specifier-per-line': oneSpecifierPerLine,
        'single-import-on-one-line': singleImportOnOneLine,
        'nested-jsx-on-new-lines': nestedJsxOnNewLines,
        'type-members-on-new-lines': typeMembersOnNewLines,
      }},
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactRefresh.configs.vite.rules,
      'array-element-newline': ['error', { minItems: 3, multiline: true }],
      'import/exports-last': 'error',
      'no-restricted-syntax': ['error', {
        selector: 'ExportNamedDeclaration[declaration]',
        message: 'Declare identifiers first and export them at the end of the file.',
      }],
      'formatting/one-specifier-per-line': 'error',
      'formatting/single-import-on-one-line': 'error',
      'formatting/nested-jsx-on-new-lines': 'error',
      'formatting/type-members-on-new-lines': 'error',
      'object-curly-newline': ['error', {
        ObjectExpression: { minProperties: 3, consistent: true, multiline: true },
        ObjectPattern: { minProperties: 3, consistent: true, multiline: true },
        ImportDeclaration: { minProperties: 2, consistent: true, multiline: true },
        ExportDeclaration: 'always',
      }],
      'object-curly-spacing': ['error', 'never'],
      'object-property-newline': ['error'],
      '@stylistic/indent': ['error', 'tab', { SwitchCase: 1, ignoredNodes: ['TemplateLiteral *', 'JSXElement *', 'JSXElement'] }],
      'react/jsx-indent': ['error', 'tab'],
      'react/jsx-indent-props': ['error', 'tab'],
      '@stylistic/jsx-first-prop-new-line': ['error', 'multiline'],
      '@stylistic/jsx-curly-brace-presence': ['error', { props: 'ignore', children: 'always' }],
      '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/semi': ['error', 'never'],
      'react-hooks/set-state-in-effect': 'off',
      'react-refresh/only-export-components': 'off',
      'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'always' }],
    },
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
  },
]
