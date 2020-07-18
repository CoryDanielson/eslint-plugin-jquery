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
        if (!utils.isjQuery(node, config)) return

        const name = node.callee.property.name
        switch (name) {
          case 'data':
          case 'removeData':
            context.report({
              node: node,
              message: 'Prefer WeakMap to $.' + name
            })
        }
      }
    }
  }
}
