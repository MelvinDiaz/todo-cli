import { Database } from 'bun:sqlite'

const db = new Database('tododb.sqlite', { create: true })
db.exec('PRAGMA journal_mode = WAL;')

interface todos {
  todo_id: number
  content: string
}
const todo_table_query = db.prepare(`
CREATE TABLE IF NOT EXISTS todo (
  todo_id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL
)`)

const create_new_todo = (todo: string): void => {
  const query = db.query(`INSERT INTO todo (content) VALUES (?)`)
  query.run(todo)
  query.finalize()
}

const get_all_todos = (): string => {
  const query = db.query(`SELECT * FROM todo`)
  const todos = query.all() as todos[]
  const todoList = `${todos.map((todo) => todo.content).join('\ntodo: ')}`
  query.finalize()
  if (todoList === '') {
    return 'No todos found'
  } else return `todo: ${todoList}`
}

const get_todos_for_options = (): string[] => {
  const query = db.query(`SELECT * FROM todo`)
  const todos = query.all() as todos[]
  query.finalize()
  return todos.map((todo) => `${todo.content} (id: ${todo.todo_id})`)
}

const delete_todo = (todo_id: number): void => {
  const query = db.query(`DELETE FROM todo WHERE todo_id = (?)`)
  query.run(todo_id)
  query.finalize()
}

const delete_all_todos = (): void => {
  const query = db.query(`DELETE  FROM todo`)
  query.run()
  query.finalize()
}
export {
  delete_all_todos,
  create_new_todo,
  get_all_todos,
  todo_table_query,
  delete_todo,
  get_todos_for_options,
}
