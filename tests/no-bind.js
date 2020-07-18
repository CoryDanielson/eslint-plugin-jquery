'use strict'

const rule = require('../rules/no-bind')
const RuleTester = require('eslint').RuleTester

const error = 'Prefer addEventListener to $.bind'

const ruleTester = new RuleTester()
ruleTester.run('no-bind', rule, {
  valid: [
    'bind()',
    '[].bind()',
    'div.bind()',
    'div.bind',
    {
      code: 'this.$div.bind()',
      errors: [{message: error, type: 'CallExpression'}],
      options: [{validateThis: false}]
    }
  ],
  invalid: [
    {
      code: '$("div").bind()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: '$div.bind()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: 'this.$div.bind()',
      errors: [{message: error, type: 'CallExpression'}],
      options: [{validateThis: true}]
    },
    {
      code: '$("div").first().bind()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: '$("div").append($("input").bind())',
      errors: [{message: error, type: 'CallExpression'}]
    }
  ]
})
