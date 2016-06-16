import MobxStore from 'mobx-store'

const defaultState = {
  todos: []
}

export default (state = defaultState) => new MobxStore(state)
