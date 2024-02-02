import { Database } from 'bun:sqlite'

const db = new Database('../db.sqlite')
db.exec('PRAGMA journal_mode = WAL;')

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
  const todos = query.all()
  const todo_list = `todo: ${todos
    .map((todo) => todo.content)
    .join('\ntodo: ')}`
  query.finalize()
  return todo_list
}

const get_todos_for_options = (): string[] => {
  const query = db.query(`SELECT * FROM todo`)
  const todos = query.all()
  query.finalize()
  return todos.map((todo) => `${todo.content} (id: ${todo.todo_id})`)
}

const delete_todo = (todo_id: number): void => {
  const query = db.query(`DELETE FROM todo WHERE todo_id = (?)`)
  query.run(todo_id)
  query.finalize()
}
export {
  create_new_todo,
  get_all_todos,
  todo_table_query,
  delete_todo,
  get_todos_for_options,
}
