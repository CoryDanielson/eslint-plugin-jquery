'use strict'

const rule = require('../rules/no-has')
const RuleTester = require('eslint').RuleTester

const error = '$.has is not allowed'

const ruleTester = new RuleTester()
ruleTester.run('no-has', rule, {
  valid: [
    'has()',
    '[].has()',
    'div.has()',
    'div.has',
    {
      code: 'this.$div.has()',
      errors: [{message: error, type: 'CallExpression'}],
      options: [{validateThis: false}]
    }
  ],
  invalid: [
    {
      code: '$("div").has()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: '$div.has()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: 'this.$div.has()',
      errors: [{message: error, type: 'CallExpression'}],
      options: [{validateThis: true}]
    },
    {
      code: '$("div").first().has()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: '$("div").append($("input").has())',
      errors: [{message: error, type: 'CallExpression'}]
    }
  ]
})
