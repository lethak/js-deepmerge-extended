module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: [
    'internal-rules',
  ],
  extends: [
    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',
  ],
  // @see https://eslint.org/docs/rules/
  rules: {
    /* FIXABLE RULES (Only rules with "error" level will be automatically fixed) */
    'no-unused-labels': 'off',
    'no-extra-parens': 'warn',
    'prefer-const': 'warn',
    'internal-rules/multiline-comment-style': ['error', 'starred-block'],
    'spaced-comment': ['error', 'always', {
      'block': { 'balanced': true },
    }],
    'computed-property-spacing': ['error', 'never'],
    'curly': ['error', 'all'],
    'eqeqeq': ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    'no-multi-spaces': ['error', { 'ignoreEOLComments': true, 'exceptions': { 'Property': false } }],
    'keyword-spacing': ['error', { 'overrides': { /* write here some keyword override rules */ } }],
    'function-paren-newline': ['error', 'multiline'],
    'object-shorthand': ['error', 'properties'],
    'padded-blocks': ['error', {
      'blocks': 'never',
      'classes': 'always',
      'switches': 'never',
    }],
    'no-multiple-empty-lines': ['error', {
      'max': 3,
      'maxEOF': 1,
      'maxBOF': 0,
    }],
    'space-infix-ops': ['error', { 'int32Hint': true }],
    'space-unary-ops': ['error', {
      'words': true,
      'nonwords': false,
    }],
    'eol-last': ['error', 'always'],
    'lines-between-class-members': ['error', 'always', { 'exceptAfterSingleLine': true }],
    'space-before-blocks': ['error'],
    'space-before-function-paren': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 3 }],
    'wrap-iife': ['error', 'inside', { 'functionPrototypeMethods': true }],
    'semi': ['error', 'never'],
    'semi-spacing': ['error', { 'before': false, 'after': true }],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-style': ['error'],
    'no-var': 'error',
    'no-confusing-arrow': 'error',
    'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
    'generator-star-spacing': ['error', { 'before': false, 'after': true }],
    // Allow paren-less arrow functions
    'arrow-parens': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'object-curly-newline': ['error', {
      'multiline': true,
      'consistent': true,
    }],
    'indent': ['warn', 4, {
      'SwitchCase': 1,
      // "FunctionExpression": {"parameters": "first"},
      // "CallExpression": {"arguments": "first"},
    }],
    'brace-style': ['error', 'stroustrup', { 'allowSingleLine': true }],
    'linebreak-style': 'error',
    /* OTHER RULES */
    'prettier/prettier': 'never',
    // Allow unused vars, but display console warnings about them
    'no-unused-vars': ['warn', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
    // Allow tab, but display console warnings about them
    'no-tabs': 'warn',
    // Allow debugger during development
    'no-console': 'off', // process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-alert': 'warn',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2019,
    sourceType: 'module',
  },
}
