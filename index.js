const _ = require('lodash')
const mobx = require('mobx')

const person = mobx.observable({
  firstName: 'foo',
  lastName: 'bar',
  age: 0
})

mobx.autorun(() => console.log(`${person.firstName} ${person.age}`))

// log 0 + 10 times random
_.times(10, () => person.age = _.random(40))

// log only 'bar'
_.times(10, () => person.lastName = _.random(40))

// WTF MAGIC?????!???!??!?!?!
