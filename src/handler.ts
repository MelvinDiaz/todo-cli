import {
  create_new_todo,
  get_all_todos,
  delete_todo,
  get_todos_for_options,
} from './db'

const create_todo_handler = (todo: string) => {
  try {
    create_new_todo(todo)
    console.log('Todo created successfully')
  } catch (e) {
    console.error(e)
    console.error('oops! something went wrong')
  }
}

const get_todos_handler = () => {
  try {
    const todos = get_all_todos()
    if (todos === '') console.log('No todos found')
    else console.log(todos)
  } catch (e) {
    console.error(e)
    console.error('oops! something went wrong')
  }
}

const delete_todo_handler = (todo_id: number) => {
  try {
    delete_todo(todo_id)
    console.log('Todo deleted successfully')
  } catch (e) {
    console.error(e)
    console.error('oops! something went wrong')
  }
}

const get_todos_for_options_handler = () => {
  try {
    const todos = get_todos_for_options()
    return todos
  } catch (e) {
    console.error(e)
    console.error('oops! something went wrong')
  }
}

export {
  create_todo_handler,
  get_todos_handler,
  delete_todo_handler,
  get_todos_for_options_handler,
}
