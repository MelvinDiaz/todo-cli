#! /usr/bin/env bun
import './src/command.ts'
import { todo_table_query } from './src/db.ts'

todo_table_query.run()
