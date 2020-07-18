'use strict'

const utils = require('./utils.js')

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
        if (node.callee.type !== 'MemberExpression') return
        if (node.callee.property.name !== 'attr') return

        if (utils.isjQuery(node, config)) {
          const getOrSet = node.arguments.length === 2 ? 'set' : 'get'
          context.report({
            node: node,
            message: `Prefer ${getOrSet}Attribute to $.attr`
          })
        }
      }
    }
  }
}
