'use strict'

const utils = require('./utils.js')

// $(function(){})
function isDirect(node, config) {
  return (
    node.callee.type === 'Identifier' &&
    node.callee.name === '$' &&
    node.arguments[0] &&
    (node.arguments[0].type === 'FunctionExpression' ||
      node.arguments[0].type === 'ArrowFunctionExpression')
  )
}

// $(document).ready()
function isChained(node, config) {
  return (
    node.callee.type === 'MemberExpression' &&
    node.callee.property.name === 'ready' &&
    utils.isjQuery(node, config)
  )
}

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
        if (isDirect(node, config) || isChained(node, config)) {
          context.report({
            node: node,
            message: '$.ready is not allowed'
          })
        }
      }
    }
  }
}
