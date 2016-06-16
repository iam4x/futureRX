import { action, observable } from 'mobx'

class Todo {

  id = Math.random()

  @observable title = ''
  @observable finished = false

  constructor(todo) {
    Object.assign(this, todo)
  }

  @action toggleState = () => {
    this.finished = !this.finished
  }

}

export default Todo
