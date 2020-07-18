'use strict'

function traverse(node, config) {
  while (node) {
    switch (node.type) {
      case 'CallExpression':
        node = node.callee
        break
      case 'MemberExpression':
        if (config.validateThis && node.object.type === 'ThisExpression') {
          return node.property
        }
        node = node.object
        break
      case 'Identifier':
        return node
      default:
        return null
    }
  }
}

// Traverses from a node up to its root parent to determine if it
// originated from a jQuery `$()` function.
//
// node - The CallExpression node to start the traversal.
//
// Examples
//
//   // $('div').find('p').first()
//   isjQuery(firstNode, options) // => true
//
// Returns true if the function call node is attached to a jQuery element set.
function isjQuery(node, config) {
  const id = traverse(node, config)
  return id && id.name.startsWith('$')
}

module.exports = {
  traverse: traverse,
  isjQuery: isjQuery
}
