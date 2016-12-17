'use strict'

const Archetype = require('archetype-js')

module.exports = function archetypeAction (name, type) {
  if (typeof name !== 'string') {
    throw new Error('Missing action name string')
  }
  const actionCreator = new Archetype(type).compile(name)
  return (props) => {
    const o = actionCreator(props)
    o.type = name
    return o
  }
}
