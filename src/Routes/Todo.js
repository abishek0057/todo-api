const express = require('express');
const router = express.Router();

const { getAllTask, getTaskById, createTask, updateTask, deleteTask } = require('../Controller/todoController')

router.route('/')
  .get(getAllTask)
  .post(createTask)

router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask)

module.exports = router;