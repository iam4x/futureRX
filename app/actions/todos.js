import { times, random } from 'lodash'
import debug from 'debug'

export const load = (store) => new Promise(resolve => {
  debug('dev')('start load todos')

  setTimeout(() => {
    store('todos').replace(
      times(
        random(9) + 1,
        (id) => ({ id, title: `todo #${id}`, finished: !!random(1) })
      )
    )

    resolve()
  }, 300)

  debug('dev')('end load todos')
})
