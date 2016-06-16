import times from 'lodash/times'
import random from 'lodash/random'

import debug from 'debug'
import { action, observable } from 'mobx'

import Todo from './models/todo'

class TodosStore {

  @observable collection = []

  @action rehydrate({ collection } = {}) {
    this.collection = collection.map(c => new Todo(c))
  }

  // fake xhr
  @action load() {
    return new Promise(resolve => {
      debug('dev')('start load todos')

      setTimeout(() => {
        const collection = times(random(9) + 1, (id) =>
          ({ id, title: `todo #${id}`, finished: !!random(1) }))

        this.rehydrate({ collection })

        debug('dev')('end load todos')
        resolve()
      }, 300)
    })
  }

}

export default TodosStore
