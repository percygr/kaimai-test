import express from 'express';
import fs from 'fs';
import path from 'path';
var cors = require('cors')

const tasksFilePath = path.join(__dirname, 'tasks.json');

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());


class Task {
    id: number;
    title: string;
    done: boolean;
    constructor(id: number, title: string) {
        this.id = id;
        this.title = title;
        this.done = false;
    }
}
class TaskList {
    tasks: Task[];
    constructor() {
        this.tasks = readTasksFromFile();
    }
    addTask(task: Task) {
        this.tasks.push(task);
    }
    saveTasksToFile() {
        writeTasksToFile(this.tasks);
    }
    getLastAddedTaskId(): number {
        return this.tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0);
      }
}
function readTasksFromFile() {
    try {
            const data = fs.readFileSync(tasksFilePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            return [];
        }
}

function writeTasksToFile(tasks: Task[]) {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');
}

const taskList = new TaskList();
let nextTaskId = 1;
//we need to get the last task id from the file so we can increment it for the next task
try {
    const data = fs.readFileSync(tasksFilePath, 'utf8');
    const tasks: Task[] = JSON.parse(data);
    nextTaskId = tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;
} catch (err) {
    nextTaskId = 1; // Default value if file doesn't exist or there's an error
}

// add a task
app.post('/tasks', (req, res) => {
    const task = new Task(nextTaskId, req.body.title);
    taskList.addTask(task);
    taskList.saveTasksToFile(); // Save tasks to the file
    nextTaskId = task.id + 1; // Update nextTaskId
    res.send(task);
});

// get all tasks
app.get('/tasks', (req, res) => {
    res.status(200).send(taskList.tasks);
});

// mark a task as done
app.put('/tasks/:id/done', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = taskList.tasks.find((task) => task.id === taskId);
    if (task) {
        task.done = !task.done;
        taskList.saveTasksToFile(); // Save updated tasks to the file
        res.send(task);
    } else {
        res.status(404).send('Task not found');
    }
});

// delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = taskList.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
        taskList.tasks.splice(taskIndex, 1);
        taskList.saveTasksToFile(); // Save updated tasks to the file
        res.status(204).send(`Task ${taskId} deleted`); // 204 No Content
    } else {
        res.status(404).send('Task not found');
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening at http://localhost:${port}`);
}
);

export { app, taskList }; 