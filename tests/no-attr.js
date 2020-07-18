'use strict'

const rule = require('../rules/no-attr')
const RuleTester = require('eslint').RuleTester

const getError = 'Prefer getAttribute to $.attr'
const setError = 'Prefer setAttribute to $.attr'

const ruleTester = new RuleTester()
ruleTester.run('no-attr', rule, {
  valid: [
    'attr()',
    '[].attr()',
    'div.attr()',
    'div.attr',
    {
      code: 'this.$el.attr("name", "random")',
      errors: [{message: setError, type: 'CallExpression'}],
      options: [{validateThis: false}]
    }
  ],
  invalid: [
    {
      code: '$("div").attr()',
      errors: [{message: getError, type: 'CallExpression'}]
    },
    {
      code: '$div.attr()',
      errors: [{message: getError, type: 'CallExpression'}]
    },
    {
      code: '$("div").first().attr()',
      errors: [{message: getError, type: 'CallExpression'}]
    },
    {
      code: '$("div").append($("input").attr())',
      errors: [{message: getError, type: 'CallExpression'}]
    },
    {
      code: '$("div").attr("name")',
      errors: [{message: getError, type: 'CallExpression'}]
    },
    {
      code: '$("div").attr("name", "random")',
      errors: [{message: setError, type: 'CallExpression'}]
    },
    {
      code: 'this.$el.attr("name", "random")',
      errors: [{message: setError, type: 'CallExpression'}],
      options: [{validateThis: true}]
    }
  ]
})
