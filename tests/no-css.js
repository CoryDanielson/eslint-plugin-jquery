'use strict'

const rule = require('../rules/no-css')
const RuleTester = require('eslint').RuleTester

const error = 'Prefer getComputedStyle to $.css'

const ruleTester = new RuleTester()
ruleTester.run('no-css', rule, {
  valid: [
    {
      code: 'this.$el.css()',
      errors: [{message: error, type: 'CallExpression'}],
      options: [{validateThis: false}]
    }
  ],
  invalid: [
    {
      code: '$("div").css()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: '$div.css()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: '$("div").first().css()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: '$("div").append($("input").css())',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: 'this.$el.css()',
      errors: [{message: error, type: 'CallExpression'}],
      options: [{validateThis: true}]
    }
  ]
})
