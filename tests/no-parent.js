'use strict'

const rule = require('../rules/no-parent')
const RuleTester = require('eslint').RuleTester

const error = 'Prefer parentElement to $.parent'

const ruleTester = new RuleTester()
ruleTester.run('no-parent', rule, {
  valid: [
    'parent()',
    '[].parent()',
    'div.parent()',
    'div.parent',
    {
      code: 'this.$div.parent()',
      errors: [{message: error, type: 'CallExpression'}],
      options: [{validateThis: false}]
    }
  ],
  invalid: [
    {
      code: '$("div").parent()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: '$div.parent()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: 'this.$div.parent()',
      errors: [{message: error, type: 'CallExpression'}],
      options: [{validateThis: true}]
    },
    {
      code: '$("div").first().parent()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: '$("div").append($("input").parent())',
      errors: [{message: error, type: 'CallExpression'}]
    }
  ]
})
