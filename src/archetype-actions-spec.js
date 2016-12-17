'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')

/* global describe, it */
describe('Archetype actions', () => {
  const archetypeAction = require('.')

  it('creates simple TODO action', () => {
    const addTodo = archetypeAction('ADD_TODO', {
      text: {
        $type: 'string',
        $required: true
      }
    })
    const add1 = addTodo({text: 'do something'})
    la(is.object(add1))
    la(add1.type === 'ADD_TODO')
    la(add1.text === 'do something')
  })

  it('creates TODO action with ID', () => {
    const addTodo = archetypeAction('ADD_TODO', {
      id: {
        $type: 'number',
        $required: true
      },
      text: {
        $type: 'string',
        $required: true
      }
    })
    let nextTodoId = 10
    const AddTodo = (text) => addTodo({id: nextTodoId++, text})

    const add1 = AddTodo('do something')
    la(is.object(add1))
    la(add1.type === 'ADD_TODO')
    la(add1.text === 'do something')
    la(add1.id === 10)
  })
})
