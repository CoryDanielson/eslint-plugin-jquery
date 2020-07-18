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
    const forbidden = ['serialize', 'serializeArray']

    return {
      CallExpression: function (node) {
        if (node.callee.type !== 'MemberExpression') return
        if (forbidden.indexOf(node.callee.property.name) === -1) return

        if (utils.isjQuery(node, config)) {
          context.report({
            node: node,
            message:
              'Prefer FormData or URLSearchParams to $.' +
              node.callee.property.name
          })
        }
      }
    }
  }
}
