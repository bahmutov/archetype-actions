# archetype-actions

> Create Redux actions with run time type checks via Archetype

[![NPM][npm-icon] ][npm-url]

[![Build status][ci-image] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![js-standard-style][standard-image]][standard-url]

## Goal

Add simple run time checks to the
[actions](http://redux.js.org/docs/basics/Actions.html)
created in Redux by using
[Archetype](https://github.com/vkarpov15/archetype-js#readme)

Action creators are usually simple functions, yet this is a good moment to do
the runtime type checks to avoid polluting the store with inconsistent state.

```js
// typical "add Todo" action
const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    text
  }
}
```

## How

This is a very simple wrapper around Archetype code that just hides some
details. See [src/archetype-actions-spec.js](src/archetype-actions-spec.js)
for the current examples.

```js
const archetypeAction = require('archetype-actions')
const addTodo = archetypeAction('ADD_TODO', {
  text: {
    $type: 'string',
    $required: true
  }
})
const add = addTodo({text: 'do something'})
```

The created objects can be nicely serialized

```js
console.log(add)
// ADD_TODO { text: 'do something', type: 'ADD_TODO' }
console.log(JSON.stringify(add, null, 2))
/*
{
  "text": "do something",
  "type": "ADD_TODO"
}
*/
```

A missing property causes a validation error

```js
const add = addTodo({what: 'do something'})
// Error: text: Path "text" is required
// at ADD_TODO (index.js:17:16)
```

## Additional fields

You might want create helper wrapper if an action requires additional
information. For example, if you want to include an id with each item

```js
// typical Redux
let nextTodoId = 0
const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}
// archetype-actions
const archetypeAction = require('archetype-actions')
const addTodo = archetypeAction('ADD_TODO', {
  id: {
    $type: 'number', // check both id
    $required: true
  },
  text: {
    $type: 'string', // and the text
    $required: true
  }
})
let nextTodoId = 0
// helper function
const AddTodo = (text) => addTodo({id: nextTodoId++, text})
const add = AddTodo('do something')
```

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2016

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog)


License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/archetype-actions/issues) on Github

## MIT License

Copyright (c) 2016 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/archetype-actions.svg?downloads=true
[npm-url]: https://npmjs.org/package/archetype-actions
[ci-image]: https://travis-ci.org/bahmutov/archetype-actions.svg?branch=master
[ci-url]: https://travis-ci.org/bahmutov/archetype-actions
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
