import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import {
  create_todo_handler,
  get_todos_handler,
  delete_todo_handler,
  get_todos_for_options_handler,
} from './handler'
import inquirer from 'inquirer'

yargs(hideBin(process.argv))
  .command('new', 'Add a new todo to the list', async () => {
    const { todo } = await inquirer.prompt([
      {
        name: 'todo',
        message: 'Enter a new todo',
      },
    ])
    create_todo_handler(todo)
  })

  .command('list', 'List all todos', () => get_todos_handler())

  .command('delete', 'Delete a todo from the list', async () => {
    const options = await get_todos_for_options_handler()
    const { selectedTodo } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedTodo',
        message: 'Select a todo to delete',
        choices: options,
      },
    ])
    const todo_id = parseInt(selectedTodo.split('id: ').pop() as string)
    delete_todo_handler(todo_id)
  })

  .parse()
