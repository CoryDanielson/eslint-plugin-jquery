'use strict'

const rule = require('../rules/no-show')
const RuleTester = require('eslint').RuleTester

const error = '$.show is not allowed'

const ruleTester = new RuleTester()
ruleTester.run('no-show', rule, {
  valid: [
    'show()',
    '[].show()',
    'div.show()',
    'div.show',
    {
      code: 'this.$div.show()',
      errors: [{message: error, type: 'CallExpression'}],
      options: [{validateThis: false}]
    }
  ],
  invalid: [
    {
      code: '$("div").show()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: '$div.show()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: 'this.$div.show()',
      errors: [{message: error, type: 'CallExpression'}],
      options: [{validateThis: true}]
    },
    {
      code: '$("div").first().show()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: '$("div").append($("input").show())',
      errors: [{message: error, type: 'CallExpression'}]
    }
  ]
})
