const Todo = require('../../models/todos')
const router = express.Router()

const dataController = {
    // Index,
    index(req, res, next) {
        Todo.find({}, (err, foundTodos) => {
            if (err) {
                res.status(400).send({
                    msg: err.message
                })
            } else {
                res.locals.data.todos = foundTodos
                next()
            }
        })
    },
    // Destroy
    destroy(req, res, next) {
        Todo.findByIdAndDelete(req.params.id, (err, deletedTodo) => {
            if (err) {
                res.status(400).send({
                    msg: err.message
                })
            } else {
                res.locals.data.todo = deletedTodo
                next()
            }
        })
    },
    // Update
    update(req, res, next) {
        req.body.completed = req.body.completed === 'on'
        Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedTodo) => {
            if (err) {
                res.status(400).send({
                    msg: err.message
                })
            } else {
                res.locals.data.todo = updatedTodo
                next()
            }
        })
    },
    // Create
    create(req, res, next) {
        req.body.completed = req.body.completed === 'on'

        Todo.create(req.body, (err, createdTodo) => {
            if (err) {
                res.status(400).send({
                    msg: err.message
                })
            } else {
                res.locals.data.todo = createdTodo
                next()
            }
        })
    },
    // Edit
    // Show
    show(req, res, next) {
        Todo.findById(req.params.id, (err, foundTodo) => {
            if (err) {
                res.status(404).send({
                    msg: err.message,
                    output: 'Could not find a todo with that ID'
                })
            } else {
                res.locals.data.todo = foundTodo
                next()
            }
        })
    }
}

const apiController = {
    index(req, res, next) {
        res.json(res.locals.data.todos)
    },
    show(req, res, next) {
        res.json(res.locals.data.todo)
    }
}

const routeController = {
    // Index
    router.get('/api', dataController.index, apiController.index)
    // Delete
    router.delete('/api/:id', dataController.destroy, apiController.show)
    // Update
    router.put('/api/:id', dataController.update, apiController.show)
    // Create
    router.post('/api', dataController.create, apiController.show)
    // Show
    router.get('/api/:id', dataController.show, apiController.show)

    // Index
    router.get('/', dataController.index, viewController.index)
}

module.exports = { dataController, apiController, routeController }