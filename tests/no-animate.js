'use strict'

const rule = require('../rules/no-animate')
const RuleTester = require('eslint').RuleTester

const error = '$.animate is not allowed'

const ruleTester = new RuleTester()
ruleTester.run('no-animate', rule, {
  valid: [
    'animate()',
    '[].animate()',
    'div.animate()',
    'div.animate',
    {
      code: 'this.$div.animate()',
      errors: [{message: error, type: 'CallExpression'}],
      options: [{validateThis: false}]
    }
  ],
  invalid: [
    {
      code: '$("div").animate()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: '$div.animate()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: 'this.$div.animate()',
      errors: [{message: error, type: 'CallExpression'}],
      options: [{validateThis: true}]
    },
    {
      code: '$("div").first().animate()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: '$("div").append($("input").animate())',
      errors: [{message: error, type: 'CallExpression'}]
    }
  ]
})
