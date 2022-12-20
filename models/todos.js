const {Schema, model} = require('mongoose')

const todosSchema = new Schema({
    todo: String,
    completed: Boolean,
})

const Todo = model('Todo', todosSchema)

module.exports = Todo;