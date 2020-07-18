'use strict'

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
    // eslint-disable-next-line no-unused-vars
    const config = context.options[0] || {}
    function enforce(node) {
      if (node.callee.type !== 'MemberExpression') return
      if (node.callee.object.name !== '$') return
      if (node.callee.property.name !== 'Deferred') return

      context.report({
        node: node,
        message: 'Prefer Promise to $.Deferred'
      })
    }

    return {
      CallExpression: enforce,
      NewExpression: enforce
    }
  }
}
