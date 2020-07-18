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
        if (node.callee.property.name !== 'show') return

        if (utils.isjQuery(node, config)) {
          context.report({
            node: node,
            message: '$.show is not allowed'
          })
        }
      }
    }
  }
}
