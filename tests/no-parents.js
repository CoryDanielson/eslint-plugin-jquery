'use strict'

const rule = require('../rules/no-parents')
const RuleTester = require('eslint').RuleTester

const error = 'Prefer closest to $.parents'

const ruleTester = new RuleTester()
ruleTester.run('no-parents', rule, {
  valid: [
    'parents()',
    '[].parents()',
    'div.parents()',
    'div.parents',
    {
      code: 'this.$div.parents()',
      errors: [{message: error, type: 'CallExpression'}],
      options: [{validateThis: false}]
    }
  ],
  invalid: [
    {
      code: '$("div").parents()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: '$div.parents()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: 'this.$div.parents()',
      errors: [{message: error, type: 'CallExpression'}],
      options: [{validateThis: true}]
    },
    {
      code: '$("div").first().parents()',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: '$("div").append($("input").parents())',
      errors: [{message: error, type: 'CallExpression'}]
    }
  ]
})
