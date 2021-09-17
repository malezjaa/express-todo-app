const Task = require('../db/models/task')

class TaskController {
	async showTasks(req, res) {
		const tasks = await Task.find({})

		res.render('pages/tasks/index', { tasks: tasks })
	}

	showCreateForm(req, res) {
		res.render('pages/tasks/create')
	}

	async create(req, res) {
		const newTask = new Task({
			title: req.body.title,
			description: req.body.description,
		})

		try {
			await newTask.save()
			res.redirect('/')
		} catch (e) {
			res.render('pages/tasks/create', { errors: e.errors, task: req.body })
		}
	}

	async showEditForm(req, res) {
		const { id } = req.params

		const task = await Task.findById({ _id: id })

		res.render('pages/tasks/edit', { task: task })
	}

	async edit(req, res) {
		const { id } = req.params

		const task = await Task.findById({ _id: id })
		task.title = req.body.title
		task.description = req.body.description

		try {
			await task.save()

			res.redirect('/')
		} catch (e) {
			res.render('pages/tasks/edit', { errors: e.errors })
		}
	}

	async delete(req, res) {
		const { id } = req.params

		try {
			await Task.deleteOne({ _id: id })
			res.redirect('/')
		} catch (e) {
			console.log(e.message)
		}
	}

	async toggleDone(req, res) {
		const { id } = req.params

		const task = await Task.findById({ _id: id })
		task.done = !task.done

		try {
			await task.save()
			res.redirect('/')
		} catch (err) {
			console.log(err.message)
		}
	}
}

module.exports = new TaskController()
