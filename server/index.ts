import express from 'express';
import fs from 'fs';
import path from 'path';

const tasksFilePath = path.join(__dirname, 'tasks.json');

const app = express();
const port = 3000;

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

// add a task
app.post('/tasks', (req, res) => {
    const task = new Task(nextTaskId, req.body.title);
    taskList.addTask(task);
    nextTaskId++; // Increment the next task ID for the next task
    taskList.saveTasksToFile(); // Save tasks to the file
    res.send(task);
});

// get all tasks
app.get('/tasks', (req, res) => {
    res.send(taskList.tasks);
});

// mark a task as done
app.put('/tasks/:id/done', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = taskList.tasks.find((task) => task.id === taskId);
    if (task) {
        task.done = true;
        taskList.saveTasksToFile(); // Save updated tasks to the file
        res.send(task);
    } else {
        res.status(404).send('Task not found');
    }
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
}
);
