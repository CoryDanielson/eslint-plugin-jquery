'use strict'

const rule = require('../rules/no-hide')
const RuleTester = require('eslint').RuleTester

const error = '$.hide is not allowed'

const ruleTester = new RuleTester()
ruleTester.run('no-hide', rule, {
  valid: [
    'hide()',
    '[].hide()',
    'div.hide()',
    'div.hide',
    {
      code: 'this.$div.hide()',
      errors: [{message: error, type: 'CallExpression'}],
      options: [{validateThis: false}]
    }
  ],
  invalid: [
    {
      code: '$("div").hide()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: '$div.hide()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: 'this.$div.hide()',
      errors: [{message: error, type: 'CallExpression'}],
      options: [{validateThis: true}]
    },
    {
      code: '$("div").first().hide()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: '$("div").append($("input").hide())',
      errors: [{message: error, type: 'CallExpression'}]
    }
  ]
})
