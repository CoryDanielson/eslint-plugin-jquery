'use strict'

const rule = require('../rules/no-toggle')
const RuleTester = require('eslint').RuleTester

const error = '$.toggle is not allowed'

const ruleTester = new RuleTester()
ruleTester.run('no-toggle', rule, {
  valid: [
    'toggle()',
    '[].toggle()',
    'div.toggle()',
    'div.toggle',
    {
      code: 'this.$div.toggle()',
      errors: [{message: error, type: 'CallExpression'}],
      options: [{validateThis: false}]
    }
  ],
  invalid: [
    {
      code: '$("div").toggle()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: '$div.toggle()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: 'this.$div.toggle()',
      errors: [{message: error, type: 'CallExpression'}],
      options: [{validateThis: true}]
    },
    {
      code: '$("div").first().toggle()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: '$("div").append($("input").toggle())',
      errors: [{message: error, type: 'CallExpression'}]
    }
  ]
})
