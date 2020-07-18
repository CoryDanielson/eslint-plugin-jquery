'use strict'

const rule = require('../rules/no-load')
const RuleTester = require('eslint').RuleTester

const error = 'Prefer fetch to $.load'

const ruleTester = new RuleTester()
ruleTester.run('no-load', rule, {
  valid: [
    'load()',
    '[].load()',
    'div.load()',
    'div.load',
    {
      code: 'this.$div.load()',
      errors: [{message: error, type: 'CallExpression'}],
      options: [{validateThis: false}]
    }
  ],
  invalid: [
    {
      code: '$("div").load()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: '$div.load()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: 'this.$div.load()',
      errors: [{message: error, type: 'CallExpression'}],
      options: [{validateThis: true}]
    },
    {
      code: '$("div").first().load()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: '$("div").append($("input").load())',
      errors: [{message: error, type: 'CallExpression'}]
    }
  ]
})
