'use strict'

const utils = require('./utils.js')

const methodName = 'on'
const disallowedEvents = {
  ajaxStart: true,
  ajaxSend: true,
  ajaxSuccess: true,
  ajaxError: true,
  ajaxComplete: true,
  ajaxStop: true
}

const MemberExpression = 'MemberExpression'
const Literal = 'Literal'

module.exports = {
  meta: {
    docs: {},
    schema: [
      {
        type: 'object',
        properties: {
          validateThis: {
            default: false,
            type: 'boolean'
          }
        }
      }
    ]
  },

  create: function (context) {
    const config = context.options[0] || {}
    return {
      CallExpression: function (node) {
        if (
          node.callee.type === MemberExpression &&
          node.callee.property.name === methodName &&
          node.arguments.length >= 1
        ) {
          const arg = node.arguments[0]
          if (
            arg.type === Literal &&
            arg.value in disallowedEvents &&
            utils.isjQuery(node, config)
          ) {
            context.report({
              node: node,
              message: `Prefer remoteForm to ${arg.value}`
            })
          }
        }
      }
    }
  }
}
