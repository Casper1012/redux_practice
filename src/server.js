const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;
    
// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Sample tasks data
let tasks = [
  { id: 1, name: 'Task 1' },
  { id: 2, name: 'Task 2' },
  { id: 3, name: 'Task 3' },
];

app.use(express.json());

// Route to get tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  let { title } = req.body;
  let new_stuff = {};

  if (tasks.length == 0) {
    new_stuff = { id: 1, name: title };
  }
  else
    new_stuff = { id: tasks[tasks.length - 1].id + 1, name: title };

  console.log("new stuff", new_stuff);
  tasks.push(new_stuff);
  console.log("tasks", tasks);

  res.json(new_stuff);
});

app.delete('/tasks/:id', (req, res) => {
  let id = req.params.id; // Get the id from the URL

  tasks = tasks.filter(task => task.id != id); // Remove the task from the array

  console.log(id);
  console.log("deleted array", tasks);

  res.status(204).send(); // Send a No Content response
});

// PATCH route to update a task
app.patch('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  // Find the task by ID
  const task = tasks.find(t => t.id === parseInt(id));
  if (!task) {
    return res.status(404).send('Task not found');
  }

  // Update the task title
  task.name = title;

  // Respond with the updated task
  console.log(task);
  res.json(task);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});